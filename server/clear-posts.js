require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');
const Category = require('./models/Category');
const Comment = require('./models/Comment');

async function clearData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const postsDeleted = await Post.deleteMany({});
        console.log(`Deleted ${postsDeleted.deletedCount} posts.`);
        
        const categoriesDeleted = await Category.deleteMany({});
        console.log(`Deleted ${categoriesDeleted.deletedCount} categories.`);
        
        const commentsDeleted = await Comment.deleteMany({});
        console.log(`Deleted ${commentsDeleted.deletedCount} comments.`);
        
        process.exit(0);
    } catch (err) {
        console.error('Error clearing data:', err);
        process.exit(1);
    }
}

clearData();
