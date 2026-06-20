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

    this.getNetwork = async () => {
        const [lines, stations, segments] = await Promise.all([
            dbAll('SELECT id, name, color FROM lines'),
            dbAll('SELECT id, name, is_interchange AS isInterchange FROM stations'),
            dbAll(`
                SELECT s.id,
                       s.line_id AS lineId,
                       s.from_station AS fromStation,
                       s.to_station   AS toStation,
                       l.name  AS lineName,
                       l.color AS lineColor,
                       st1.name AS fromName,
                       st2.name AS toName
                FROM segments s
                JOIN lines    l   ON l.id   = s.line_id
                JOIN stations st1 ON st1.id = s.from_station
                JOIN stations st2 ON st2.id = s.to_station
            `),
        ]);
        return { lines, stations, segments };
    };

    this.getAllStations = () =>
        dbAll('SELECT id, name, is_interchange AS isInterchange FROM stations');

    this.getAllSegments = () =>
        dbAll('SELECT id, line_id, from_station, to_station FROM segments');

    this.getAllEvents = () =>
        dbAll('SELECT id, description, coin_change FROM events');

    

}

export default GameDao;
