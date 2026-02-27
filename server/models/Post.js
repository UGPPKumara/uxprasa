const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'uxprasa'
    },
    image: {
        type: String,
        required: false
    },
    readTime: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    featured: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
