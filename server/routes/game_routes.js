import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import GameDao from '../dao/dao_game.js';


const router = express.Router();
const gameDao = new GameDao();

router.get('/users/ranking', isLoggedIn, async (req, res) => {
    try {
        const ranking = await gameDao.getRanking();
        res.json(ranking);
    } catch {
        res.status(500).json({ error: 'Error while retrieving the ranking.' });
    }
});

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


export default router;
