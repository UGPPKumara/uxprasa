const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const Subscriber = require('../models/Subscriber');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary Configuration
cloudinary.config({
    cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || '').trim(),
    api_key: (process.env.CLOUDINARY_API_KEY || '').trim(),
    api_secret: (process.env.CLOUDINARY_API_SECRET || '').trim()
});

// Configure Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uxprasa_blog',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
        transformation: [{ width: 1200, height: 630, crop: 'limit' }]
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Get All Posts (with search & pagination)
router.get('/', async (req, res) => {
    try {
        const { search, category, page = 1, limit = 4 } = req.query;
        let query = {};
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (category && category !== 'ALL') {
            query.category = category;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalPosts = await Post.countDocuments(query);
        
        const posts = await Post.aggregate([
            { $match: query },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'post',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    commentCount: { $size: '$comments' }
                }
            },
            {
                $project: {
                    comments: 0 // Remove the actual comments array to save bandwidth
                }
            }
        ]);

        res.json({
            posts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalPosts / parseInt(limit)),
            totalPosts
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get Trending Posts
router.get('/trending', async (req, res) => {
    try {
        const posts = await Post.aggregate([
            { $sort: { views: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'post',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    commentCount: { $size: '$comments' }
                }
            },
            {
                $project: { comments: 0 }
            }
        ]);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get Single Post
router.get('/:slug', async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create Post (Protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { title, excerpt, content, category, author, readTime, tags, featured, slug } = req.body;
        const image = req.file ? req.file.path : (req.body.image || '');

        const newPost = new Post({
            title,
            slug,
            excerpt,
            content,
            category,
            author,
            readTime,
            image,
            tags: tags ? tags.split(',') : [],
            featured: featured === 'true'
        });

        await newPost.save();

        // --- Newsletter Notification System ---
        try {
            const subscribers = await Subscriber.find({ status: { $ne: 'blocked' } }, 'email');
            
            if (subscribers.length > 0) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const postUrl = `https://uxprasa.com/post/${newPost.slug}`;
                
                // Send emails to all subscribers
                const emailPromises = subscribers.map(sub => {
                    return transporter.sendMail({
                        from: `"UXPRASA" <${process.env.EMAIL_USER}>`,
                        to: sub.email,
                        subject: `New Post: ${newPost.title}`,
                        html: `
                            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                                <div style="background: #5A81FA; padding: 30px; text-align: center;">
                                    <h1 style="color: white; margin: 0;">UXPRASA</h1>
                                </div>
                                <div style="padding: 30px;">
                                    <h2 style="color: #1F1F1F; margin-top: 0;">නවතම ලිපිය: ${newPost.title}</h2>
                                    <p>${newPost.excerpt || 'වෙබ් තාක්ෂණය සහ UI/UX පිළිබඳ නවතම දැනුම දැන් කියවන්න.'}</p>
                                    <div style="text-align: center; margin: 40px 0;">
                                        <a href="${postUrl}" style="background: #5A81FA; color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold;">දැන් කියවන්න (Read Now)</a>
                                    </div>
                                    <hr style="border: 0; border-top: 1px solid #eee;">
                                    <p style="font-size: 12px; color: #777; text-align: center;">
                                        ඔබ මෙම පණිවිඩය ලබා ගන්නේ UXPRASA Newsletter එකට ලියාපදිංචි වී ඇති බැවිනි.
                                    </p>
                                </div>
                            </div>
                        `
                    });
                });

                // Wait for all emails (or at least attempt them)
                Promise.all(emailPromises).catch(err => console.error('Error sending newsletter:', err));
            }
        } catch (emailErr) {
            console.error('Newsletter processing error:', emailErr);
            // We don't fail the post creation if email fails
        }
        // --------------------------------------

        res.status(201).json(newPost);
    } catch (err) {
        console.error('CREATE POST ERROR:', err);
        res.status(500).json({ message: 'Failed to create post', error: err.message });
    }
});

// Update Post (Protected)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const { title, excerpt, content, category, author, readTime, tags, featured, slug } = req.body;
        
        post.title = title || post.title;
        post.slug = slug || post.slug;
        post.excerpt = excerpt || post.excerpt;
        post.content = content || post.content;
        post.category = category || post.category;
        post.author = author || post.author;
        post.readTime = readTime || post.readTime;
        post.featured = featured === 'true';
        
        if (tags) post.tags = tags.split(',').map(tag => tag.trim());
        
        // Handle Image: If new file uploaded, use its path (Cloudinary URL). Otherwise keep old or use existing.
        if (req.file) {
            post.image = req.file.path;
        } else if (req.body.image) {
            post.image = req.body.image;
        }

        await post.save();
        res.json(post);
    } catch (err) {
        console.error('SERVER UPDATE ERROR:', err);
        res.status(500).json({ 
            message: 'Failed to update post', 
            error: err.message 
        });
    }
});

// Delete Post (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Delete image from Cloudinary if it exists
        if (post.image && post.image.includes('cloudinary.com')) {
            try {
                const urlParts = post.image.split('/');
                const fileName = urlParts[urlParts.length - 1]; // e.g. "abc.jpg"
                const publicId = `uxprasa_blog/${fileName.split('.')[0]}`;
                await cloudinary.uploader.destroy(publicId);
            } catch (cloudErr) {
                console.error('Cloudinary delete error:', cloudErr);
            }
        }

        await Post.findByIdAndDelete(req.params.id);
        
        // Also delete associated comments
        const Comment = require('../models/Comment');
        await Comment.deleteMany({ post: req.params.id });

        res.json({ message: 'Post and its comments deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
