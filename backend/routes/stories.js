const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require auth for all story routes
router.use(requireAuth);

router.get('/', (req, res) => {
  res.json({ mssg: 'GET all stories' });
});

router.get('/:id', (req, res) => {
  res.json({ mssg: 'GET single story' });
});

router.post('/', (req, res) => {
  res.json({ mssg: 'POST a new story' });
});

router.delete('/:id', (req, res) => {
  res.json({ mssg: 'DELETE a story' });
});

router.patch('/:id', (req, res) => {
  res.json({ mssg: 'UPDATE a story' });
});

module.exports = router;
