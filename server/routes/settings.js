const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// GET settings (public - so the frontend can read social links etc.)
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            // Create default settings if none exist
            settings = await Settings.create({});
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// PUT settings (protected - only admin can update)
router.put('/', auth, async (req, res) => {
    try {
        const { blogName, blogTagline, adminEmail, whatsappLink, facebookLink, youtubeLink, instagramLink, linkedinLink } = req.body;

        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({});
        }

        if (blogName !== undefined) settings.blogName = blogName;
        if (blogTagline !== undefined) settings.blogTagline = blogTagline;
        if (adminEmail !== undefined) settings.adminEmail = adminEmail;
        if (whatsappLink !== undefined) settings.whatsappLink = whatsappLink;
        if (facebookLink !== undefined) settings.facebookLink = facebookLink;
        if (youtubeLink !== undefined) settings.youtubeLink = youtubeLink;
        if (instagramLink !== undefined) settings.instagramLink = instagramLink;
        if (linkedinLink !== undefined) settings.linkedinLink = linkedinLink;

        await settings.save();
        res.json({ message: 'Settings updated successfully', settings });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
