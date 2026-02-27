const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Contact Form Submission
router.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        // Create Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email Configuration
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
            subject: `New Contact Message from ${name}`,
            text: `You have a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully' });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Error sending message. Please try again later.' });
    }
});

module.exports = router;
