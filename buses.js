const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to database
const db = new sqlite3.Database(
    path.join(__dirname, '../database/bus.db'),
    (err) => {
        if (err) {
            console.error("Database connection error:", err.message);
        } else {
            console.log("Connected to SQLite database");
        }
    }
);

// Get all buses
router.get('/', (req, res) => {

    const query = `
        SELECT 
            buses.plate,
            buses.capacity,
            buses.type,
            buses.route,
            GROUP_CONCAT(seat_reservations.seat_number) as bookedSeats
        FROM buses
        LEFT JOIN trips
        ON buses.id = trips.bus_id
        LEFT JOIN seat_reservations
        ON trips.id = seat_reservations.trip_id
        GROUP BY buses.id
    `;

    db.all(query, [], (err, rows) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        const buses = rows.map(bus => ({
            plate: bus.plate,
            capacity: bus.capacity,
            type: bus.type,
            route: bus.route,
            bookedSeats: bus.bookedSeats
                ? bus.bookedSeats.split(',').map(Number)
                : []
        }));

        res.json(buses);

    });

});


// Get bus by plate
router.get('/:plate', (req, res) => {

    const plate = req.params.plate;

    const query = `
      SELECT 
         buses.plate,
         buses.capacity,
         buses.type,
         buses.route,
         GROUP_CONCAT(seat_reservations.seat_number) as bookedSeats
      FROM buses
      LEFT JOIN trips
      ON buses.id = trips.bus_id
      LEFT JOIN seat_reservations
      ON trips.id = seat_reservations.trip_id
      GROUP BY buses.id
`;
    

    db.get(query, [plate], (err, row) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        if (!row) {
            return res.status(404).json({ error: "Bus not found" });
        }

        const bus = {
            plate: row.plate,
            capacity: row.capacity,
            type: row.type,
            route: row.route,
            bookedSeats: row.bookedSeats
                ? row.bookedSeats.split(',').map(Number)
                : []
        };

        res.json(bus);

    });

});

module.exports = router;