const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    blogName: { type: String, default: 'UXprasa' },
    blogTagline: { type: String, default: 'Learn. Build. Grow.' },
    adminEmail: { type: String, default: '' },
    whatsappLink: { type: String, default: '' },
    facebookLink: { type: String, default: '' },
    youtubeLink: { type: String, default: '' },
    instagramLink: { type: String, default: '' },
    linkedinLink: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
