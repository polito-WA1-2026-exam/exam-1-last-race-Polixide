import db from "../db/database.js";

function GameDao() {

    this.getRanking = () => {
        return new Promise((resolve,reject) => {
            const query = 'SELECT id,username,best_score FROM users ORDER BY best_score DESC';
            db.all(query,[],(err,rows) => {
                if(err) reject(err);
                else resolve(rows);
            })
        });
    };


}

export default GameDao;