import express from 'express';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import GameDao from '../dao/dao_game.js';

const router = express.Router();
const gameDao = new GameDao();

router.get('/users/ranking', isLoggedIn, (req, res) => {
  gameDao.getRanking()
    .then((ranking) => res.json(ranking))
    .catch((err) => res.status(500).json({ error: 'Error while retrieving the ranking.'}));
});

router.get('/games/stats', isLoggedIn, (req, res) => {
  gameDao.getUserStats(req.user.id) // user id from the session
    .then((stats) => res.json(stats))
    .catch(() => res.status(500).json({ error: 'Error while retrieving your stats.' }));
});

export default router;