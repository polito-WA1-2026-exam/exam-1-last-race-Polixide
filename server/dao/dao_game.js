import { dbGet, dbAll, dbRun } from '../db/database.js';

function GameDao() {

    this.getRanking = () =>
        dbAll('SELECT id, username, best_score FROM users ORDER BY best_score DESC');

    this.getUserStats = (userId) =>
        dbGet(
            `SELECT
                COUNT(*) AS games_played,
                MAX(score) AS best_score,
                COALESCE(AVG(score), 0) AS avg_score,
                MAX(date_played) AS last_played
             FROM games
             WHERE user_id = ? AND score IS NOT NULL`,
            [userId]
        );

    
}

export default GameDao;
