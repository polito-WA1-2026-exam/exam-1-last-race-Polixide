import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { buildAdjacency, findValidPairs } from '../game_logic.js';
import GameDao from '../dao/dao_game.js';


const router = express.Router();
const gameDao = new GameDao();


//obtain all the user best scores
router.get('/users/ranking', isLoggedIn, async (req, res) => {
    try {
        const ranking = await gameDao.getRanking();
        res.json(ranking);
    } catch {
        res.status(500).json({ error: 'Error while retrieving the ranking.' });
    }
});
// obtain user statistics
router.get('/games/stats', isLoggedIn, async (req, res) => {
    try {
        const stats = await gameDao.getUserStats(req.user.id);
        res.json(stats);
    } catch {
        res.status(500).json({ error: 'Error while retrieving your stats.' });
    }
});

// Returns lines, stations (with interchange flag) and segments for the client map
router.get('/network', isLoggedIn, async (req, res) => {
    try {
        const network = await gameDao.getNetwork();
        res.json(network);
    } catch {
        res.status(500).json({ error: 'Error while retrieving the network.' });
    }
});

// Creates a new game: BFS to pick a valid (start, dest) pair, stores it in DB
router.post('/games', isLoggedIn, async (req, res) => {

    try {

        //we need the list of all stations and segments
        const [stations, segments] = await Promise.all([
            gameDao.getAllStations(),
            gameDao.getAllSegments(),
        ]);

        const stationIds = stations.map(s => s.id);
        //we build the adjacency list for all the station ids using the list of segments
        const adj = buildAdjacency(stationIds, segments);
        //we obtain the list of valid (start,dest) ids (i.e stations that has the minimum shortest path of 3 stations using BFS)
        const validPairs = findValidPairs(stationIds, adj);

        if (validPairs.length === 0) {
            return res.status(500).json({ error: 'No valid station pairs found in the network.' });
        }

        //we randomly select one valid pair randomly
        const { start, dest } = validPairs[Math.floor(Math.random() * validPairs.length)];
        //we initialize a new game by creating a record in the games table with the score = NULL
        const { lastID: gameId } = await gameDao.createGameRecord(req.user.id, start, dest);


        const startStation = stations.find(s => s.id === start);
        const destStation = stations.find(s => s.id === dest);

        res.status(201).json({
            gameId,
            startStation: { id: startStation.id, name: startStation.name },
            destStation: { id: destStation.id, name: destStation.name },
        });
    } catch {
        res.status(500).json({ error: 'Error while creating the game.' });
    }
});

// Validates and executes the route submitted by the player
router.post(
    '/games/:gameId/route',
    isLoggedIn,
    param('gameId').isInt({ min: 1 }),
    body('route').isArray(),
    body('route.*').isInt({ min: 1 }),
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: 'Invalid request data.' });
        }

        try {
            const gameId = parseInt(req.params.gameId, 10);
            const { route } = req.body;

            const game = await gameDao.getGameById(gameId, req.user.id);
            if (!game) {
                return res.status(404).json({ error: 'Game not found or already completed.' });
            }

            const [segments, events, stations] = await Promise.all([
                gameDao.getAllSegments(),
                gameDao.getAllEvents(),
                gameDao.getAllStations(),
            ]);

            const interchangeIds = new Set(
                stations.filter(s => s.isInterchange).map(s => s.id)
            );

            const { valid, invalidReason } = validateRoute(
                route, game.start_station, game.dest_station, segments, interchangeIds
            );

            const stationNames = Object.fromEntries(stations.map(s => [s.id, s.name]));

            const { steps, coins } = valid ? executeRoute(route, game.start_station, segments, events, stationNames) : { steps: [], coins: 0 };

            const finalScore = valid ? Math.max(0, coins) : 0;

            await gameDao.saveGameResult(gameId, req.user.id, finalScore);

            res.json({ valid, invalidReason: valid ? null : invalidReason, steps, finalScore });
        } catch {
            res.status(500).json({ error: 'Error while processing the route.' });
        }
    }
);

export default router;
