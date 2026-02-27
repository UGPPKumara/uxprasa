require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

async function checkPosts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await Post.countDocuments({});
        console.log('--- DATABASE CHECK ---');
        console.log('Total posts in DB:', count);
        if (count > 0) {
            const posts = await Post.find({}, 'title');
            console.log('Post titles:', posts.map(p => p.title));
        }
        process.exit(0);
    } catch (err) {
        console.error('Error checking posts:', err);
        process.exit(1);
    }
}

checkPosts();
