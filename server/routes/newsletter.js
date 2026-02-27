const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const auth = require('../middleware/auth');

// Subscribe to newsletter (Public)
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            if (existingSubscriber.status === 'blocked') {
                return res.status(403).json({ message: 'This email has been blocked from the newsletter.' });
            }
            return res.status(400).json({ message: 'You are already subscribed!' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Get all subscribers (Admin Only)
router.get('/all', auth, async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
        res.json(subscribers);
    } catch (error) {
        console.error('Fetch subscribers error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a subscriber (Admin Only)
router.delete('/:id', auth, async (req, res) => {
    try {
        await Subscriber.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subscriber removed' });
    } catch (error) {
        console.error('Delete subscriber error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Toggle block subscriber (Admin Only)
router.put('/:id/toggle-block', auth, async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) return res.status(404).json({ message: 'Subscriber not found' });

        subscriber.status = subscriber.status === 'blocked' ? 'active' : 'blocked';
        await subscriber.save();

        res.json({ message: `Subscriber ${subscriber.status === 'blocked' ? 'blocked' : 'unblocked'} successfully`, subscriber });
    } catch (error) {
        console.error('Toggle block error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
