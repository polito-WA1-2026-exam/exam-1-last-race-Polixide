import crypto from 'crypto';
import db from './database.js';
import { initSchema } from './init.js';

// scrypt hashing with a random salt for each user.
function hashPassword(password) {

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 32).toString('hex');

    return { hash, salt };

}

// Pre-compute the three users' credentials so we can inline them in the INSERTs.
const dani = hashPassword('password!');
const user1 = hashPassword('password!');
const user2 = hashPassword('password!');

db.serialize(() => {
    // Reset for idempotent re-runs (drop in reverse dependency order).
    db.run('DROP TABLE IF EXISTS games');
    db.run('DROP TABLE IF EXISTS segments');
    db.run('DROP TABLE IF EXISTS events');
    db.run('DROP TABLE IF EXISTS stations');
    db.run('DROP TABLE IF EXISTS lines');
    db.run('DROP TABLE IF EXISTS users');
});

// Recreate the schema (from init.js).
initSchema();

db.serialize(() => {
    // ---- Users (best_score inlined: the seeded results are known) ----
    db.run('INSERT INTO users (username,email, hash, salt, best_score) VALUES (?, ?, ?, ?, ?)',
        ['user.1', 'user.1@polito.it' , user1.hash, user1.salt, 23]);
    db.run('INSERT INTO users (username,email, hash, salt, best_score) VALUES (?, ?, ?, ?, ?)',
        ['dani.c', 'dani.c@polito.it', dani.hash, dani.salt, 27]);
    db.run('INSERT INTO users (username,email, hash, salt, best_score) VALUES (?, ?, ?, ?, ?)',
        ['user.2','user.2@polito.it' , user2.hash, user2.salt, 0]);

    // ---- Lines ----
    db.run("INSERT INTO lines (name, color) VALUES ('Mars', '#f43f5e')");
    db.run("INSERT INTO lines (name, color) VALUES ('Jupiter', '#facc15')");
    db.run("INSERT INTO lines (name, color) VALUES ('Earth', '#10b981')");
    db.run("INSERT INTO lines (name, color) VALUES ('Neptune', '#3b82f6')");

    // ---- Stations ----
    const stations = [
        'Vega', 'Orion', 'Helios', 'Polaris', 'Aurora', 'Solaris', 'Andromeda', 'Titan',
        'Lyra', 'Nova', 'Eclipse', 'Zenith', 'Halcyon', 'Meridian', 'Apex', 'Calypso',
    ];
    for (const name of stations) {
        db.run('INSERT INTO stations (name) VALUES (?)', [name]);
    }

    // Station id lookup (matches insertion order, ids start at 1).
    const sid = {};
    stations.forEach((name, i) => { sid[name] = i + 1; });

    // ---- Segments. Each line is an ordered list; consecutive pairs are edges.
    // Interchanges: Orion, Helios, Solaris, Nova .
    const lineId = { Mars: 1, Jupiter: 2, Earth: 3, Neptune: 4 };
    const lineStations = {
        Mars: ['Vega', 'Orion', 'Helios', 'Polaris', 'Aurora'],
        Neptune: ['Andromeda', 'Orion', 'Nova', 'Titan', 'Lyra'],
        Earth: ['Helios', 'Solaris', 'Eclipse', 'Zenith', 'Halcyon'],
        Jupiter: ['Solaris', 'Nova', 'Meridian', 'Apex', 'Calypso'],
    };
    for (const [line, names] of Object.entries(lineStations)) {
        for (let i = 0; i < names.length - 1; i++) {
            let a = sid[names[i]];
            let b = sid[names[i + 1]];
            if (a > b) [a, b] = [b, a]; // store once, undirected edge
            db.run('INSERT INTO segments (line_id, from_station, to_station) VALUES (?, ?, ?)',
                [lineId[line], a, b]);
        }
    }

    // ---- Events ----
    const events = [
        ['Quiet journey', 0],
        ['A busker played your favourite song', 1],
        ['Gave up your seat to a pregnant woman', 2],
        ['Found spare change on the seat', 2],
        ['Roadworks at the station slowed you down', -2],
        ['A pigeon snuck onboard and caused chaos', -3],
        ['The braking system stopped working', -4],
        ['You won the metro raffle of the day', 4],
    ];
    for (const [description, coin_change] of events) {
        db.run('INSERT INTO events (description, coin_change) VALUES (?, ?)', [description, coin_change]);
    }

    /*
    // ---- Games: a few past games for dani.c and user.1 ----
    
    db.run('INSERT INTO games (user_id, start_station, dest_station, score) VALUES (1, ?, ?, 18)', [sid['Vega'], sid['Polaris']]);
    db.run('INSERT INTO games (user_id, start_station, dest_station, score) VALUES (1, ?, ?, 23)', [sid['Andromeda'], sid['Lyra']]);
    db.run('INSERT INTO games (user_id, start_station, dest_station, score) VALUES (2, ?, ?, 15)', [sid['Helios'], sid['Halcyon']]);
    db.run('INSERT INTO games (user_id, start_station, dest_station, score) VALUES (2, ?, ?, 27)', [sid['Solaris'], sid['Calypso']]);
    */
    console.log('Database seeded successfully.');
});

db.close();