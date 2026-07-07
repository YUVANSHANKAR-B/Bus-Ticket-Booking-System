const express = require('express');
const router = express.Router();
const Bus = require('../models/bus');
const { adminAuth } = require('../middleware/auth');

// Add a new bus (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all buses or search
router.get('/', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    let query = {};

    if (from) query.from = new RegExp(from, 'i');
    if (to) query.to = new RegExp(to, 'i');
    if (date) {
      // Parse date string (YYYY-MM-DD format) and create UTC date range
      const [year, month, day] = date.split('-').map(Number);
      const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
      const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
      query.departureTime = {
        $gte: startDate,
        $lte: endDate
      };
    }

    const buses = await Bus.find(query);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bus by ID
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
