const express = require('express');
const router = express.Router();

// Get all bookings
router.get('/', (req, res) => {
    try {
        const bookings = [];
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new booking
router.post('/', (req, res) => {
    try {
        const { busPlate, seats, destination, farePerSeat } = req.body;
        
        // Validation
        if (!busPlate || !seats || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ error: 'Invalid booking data' });
        }

        // Generate booking ID
        const bookingId = 'BUS' + Math.floor(Math.random() * 100000);
        const total = seats.length * farePerSeat;

        const booking = {
            bookingId,
            busPlate,
            seats,
            destination,
            farePerSeat,
            total,
            timestamp: new Date().toISOString()
        };

        res.json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get booking by ID
router.get('/:bookingId', (req, res) => {
    try {
        const booking = { bookingId: req.params.bookingId };
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
