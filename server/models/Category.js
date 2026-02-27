const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String, // e.g., "💻", "🎨", or a Lucide icon name
        default: '📁'
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
