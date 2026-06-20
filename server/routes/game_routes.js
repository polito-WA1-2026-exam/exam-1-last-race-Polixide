import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { buildAdjacency,findValidPairs } from '../game_logic.js';
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
        const { startID, destID } = validPairs[Math.floor(Math.random() * validPairs.length)];
        //we initialize a new game by creating a record in the games table with the score = NULL
        const { lastID: gameId } = await gameDao.createGameRecord(req.user.id, start, dest);


        const startStation = stations.find(s => s.id === startID);
        const destStation  = stations.find(s => s.id === destID);

        res.status(201).json({
            gameId,
            startStation: { id: startStation.id, name: startStation.name },
            destStation:  { id: destStation.id,  name: destStation.name  },
        });
    } catch {
        res.status(500).json({ error: 'Error while creating the game.' });
    }
});


export default router;
