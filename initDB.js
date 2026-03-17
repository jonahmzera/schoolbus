const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'bus.db');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {

    // Buses table
    db.run(`
        CREATE TABLE IF NOT EXISTS buses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            plate TEXT UNIQUE,
            capacity INTEGER,
            type TEXT,
            route TEXT
        )
    `);

    // Bookings table
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bus_plate TEXT,
            seat_number INTEGER,
            passenger_name TEXT
        )
    `);

    console.log("Database tables created successfully.");
});

db.close();