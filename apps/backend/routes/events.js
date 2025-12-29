const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, title, description, event_date, event_time, location, status, attendees, created_at
      FROM events 
      ORDER BY event_date DESC
    `);

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('EVENTS ERROR:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/events - Create new event
router.post('/', async (req, res) => {
  try {
    const { title, description, event_date, event_time, location } = req.body;

    if (!title || !event_date) {
      return res.status(400).json({
        success: false,
        message: 'Title and event date are required'
      });
    }

    const result = await pool.query(`
      INSERT INTO events (title, description, event_date, event_time, location, status, attendees)
      VALUES ($1, $2, $3, $4, $5, 'upcoming', 0)
      RETURNING *
    `, [title, description || null, event_date, event_time || null, location || null]);

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Event created successfully'
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event'
    });
  }
});

// GET /api/events/:id - Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    });
  }
});

// PUT /api/events/:id - Update event
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date, event_time, location, status, attendees } = req.body;

    const result = await pool.query(`
      UPDATE events 
      SET title = $1, description = $2, event_date = $3, event_time = $4, 
          location = $5, status = $6, attendees = $7, updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
    `, [title, description, event_date, event_time, location, status, attendees, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update event'
    });
  }
});

// DELETE /api/events/:id - Delete event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event'
    });
  }
});

module.exports = router;