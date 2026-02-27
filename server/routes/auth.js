const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Basic Rate Limiting for Login
const loginAttempts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

// Login
router.post('/login', async (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    // Check rate limit
    if (loginAttempts.has(ip)) {
        const attempts = loginAttempts.get(ip);
        if (attempts.count >= MAX_ATTEMPTS && (now - attempts.lastAttempt < RATE_LIMIT_WINDOW)) {
            return res.status(429).json({ message: 'Too many login attempts. Please try again in 15 minutes.' });
        }
        if (now - attempts.lastAttempt > RATE_LIMIT_WINDOW) {
            loginAttempts.set(ip, { count: 1, lastAttempt: now });
        } else {
            attempts.count += 1;
            attempts.lastAttempt = now;
        }
    } else {
        loginAttempts.set(ip, { count: 1, lastAttempt: now });
    }

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { username: user.username } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Forgot Password - send reset email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        // Find user by email field OR treat email as username match for flexibility
        let user = await User.findOne({ email });
        if (!user) {
            // Try matching by username too (in case email wasn't saved)
            user = await User.findOne({ username: email });
        }
        if (!user) {
            // Don't reveal if user exists or not for security
            return res.json({ message: 'If that email is registered, a reset link has been sent.' });
        }

        // Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
        await user.save();

        // Reset link (frontend URL)
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

        // Send email
        await transporter.sendMail({
            from: `"UXprasa Admin" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'UXprasa - Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8fafc;">
                    <div style="background: white; padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0;">
                        <h1 style="color: #1e293b; font-size: 24px; margin-bottom: 8px;">Password Reset Request</h1>
                        <p style="color: #64748b; margin-bottom: 30px;">You requested to reset your UXprasa Admin password. Click the button below to set a new password.</p>
                        <a href="${resetUrl}" style="display: inline-block; background: #5a81fa; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 16px;">Reset Password</a>
                        <p style="color: #94a3b8; font-size: 13px; margin-top: 30px;">This link expires in <strong>1 hour</strong>. If you did not request this, please ignore this email.</p>
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                        <p style="color: #cbd5e1; font-size: 12px;">UXprasa Admin &bull; This is an automated message, please do not reply.</p>
                    </div>
                </div>
            `
        });

        res.json({ message: 'If that email is registered, a reset link has been sent.' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Failed to send reset email. Please try again.', error: err.message });
    }
});

// Reset Password - validate token + set new password
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { password } = req.body;
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters.' });
        }

        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Reset link is invalid or has expired.' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: 'Password reset successfully. You can now log in.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update admin email (for reset to work) - Protected
router.post('/update-email', auth, async (req, res) => {
    try {
        const { username, email } = req.body;
        await User.findOneAndUpdate({ username }, { email });
        res.json({ message: 'Email updated.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Setup (only use once)
router.post('/setup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Admin user created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
