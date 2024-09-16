const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const Story = require('../models/storyModel');

const router = express.Router();

// Require authentication for all story routes
router.use(requireAuth);

// POST a new story (Draft or Publish)
router.post('/', async (req, res) => {
  const { topicName, description, category, tags, language, chapters, status, _id } = req.body;

  if (!topicName || !description || !category || !tags || !language || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const storyData = {
      userId: req.user._id,
      topicName,
      description,
      category,
      tags,
      language,
      chapters: chapters || '',  // Use chapters field
      status,
      author: req.user._id
    };

    let story;
    if (_id) {
      // Update existing story
      story = await Story.findByIdAndUpdate(_id, storyData, { new: true, runValidators: true });
    } else {
      // Create new story
      story = await Story.create(storyData);
    }

    res.status(200).json({ message: _id ? 'Story updated successfully' : 'Story created successfully', story });
  } catch (error) {
    console.error('Error creating or updating story:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

// GET published stories for homepage
router.get('/published', async (req, res) => {
  try {
    const stories = await Story.find({ status: 'published' }).populate('userId', 'name');
    res.status(200).json(stories);
  } catch (error) {
    console.error('Error fetching published stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// GET drafts for a specific user (Profile page)
router.get('/drafts', async (req, res) => {
  try {
    const drafts = await Story.find({ userId: req.user._id, status: 'draft' });
    res.status(200).json(drafts);
  } catch (error) {
    console.error('Error fetching drafts:', error);
    res.status(500).json({ error: 'Failed to fetch drafts' });
  }
});

// GET a specific story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// DELETE a draft
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStory = await Story.findByIdAndDelete(id);
    if (!deletedStory) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json({ message: 'Draft deleted successfully' });
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ error: 'Failed to delete draft' });
  }
});

module.exports = router;
