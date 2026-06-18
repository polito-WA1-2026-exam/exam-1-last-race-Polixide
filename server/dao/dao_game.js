import db from "../db/database.js";

function GameDao() {

    this.getRanking = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id,username,best_score FROM users ORDER BY best_score DESC';
            db.all(query, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        });
    };

    this.getUserStats = (userId) => {
        return new Promise((resolve, reject) => {
            
            const query = `SELECT
                            COUNT(*) AS games_played,
                            MAX(score) AS best_score,
                            COALESCE(AVG(score), 0) AS avg_score,
                            MAX(date_played) AS last_played
                            FROM games WHERE user_id = ?`;
            db.get(query, [userId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    };

}

export default GameDao;