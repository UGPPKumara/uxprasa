const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get comments for a post
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Sanitize helper
const sanitize = (text) => text.replace(/<[^>]*>?/gm, '');

// Add a comment
router.post('/', async (req, res) => {
    try {
        const { postId, name, email, content } = req.body;
        
        const newComment = new Comment({
            post: postId,
            name: sanitize(name),
            email,
            content: sanitize(content)
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get all comments (Admin)
router.get('/', auth, async (req, res) => {
    try {
        const comments = await Comment.find().populate('post', 'title').sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete a comment (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
