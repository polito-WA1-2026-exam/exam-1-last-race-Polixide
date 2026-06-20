import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import GameDao from '../dao/dao_game.js';
import { buildAdjacency, findValidPairs, validateRoute, executeRoute } from '../game_logic.js';

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



export default router;
