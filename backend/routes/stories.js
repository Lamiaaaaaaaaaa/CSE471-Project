// routes/stories.js
const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const Story = require('../models/storyModel');

const router = express.Router();

// Require authentication for all story routes
router.use(requireAuth);

// POST a new story
router.post('/', async (req, res) => {
  const { topicName, description, category, tags, language, chapters } = req.body;

  // Validate input
  if (!topicName || !description || !category || !tags || !language || !chapters) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new story
    const story = await Story.create({
      userId: req.user._id, // Get the user ID from the token
      topicName,
      description,
      category,
      tags,
      language,
      chapter: chapters
    });

    // Send a success response
    res.status(201).json(story);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

module.exports = router;
