import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Facebook, Twitter, Youtube, MessageSquare, Clock, Calendar, Linkedin, Instagram } from 'lucide-react';
import profileImg from '../assets/profile.png';

const PostDetails = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPostAndComments = async () => {
            try {
                const postRes = await axios.get(`/api/posts/${slug}`);
                setPost(postRes.data);
                
                // Fetch comments for this post
                const commentRes = await axios.get(`/api/comments/post/${postRes.data._id}`);
                setComments(commentRes.data);
            } catch (err) {
                console.error('Error fetching post data:', err);
                // Fallback for dummy if not found
                setPost({ 
                    _id: 'dummy',
                    title: 'AI-Driven Lighting in Modern Interior Design', 
                    category: 'BUSINESS', 
                    excerpt: 'In the heart of a bustling city...', 
                    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 
                    readTime: '5 min', 
                    slug: 'ai-driven-lighting',
                    content: `<p>In the heart of a bustling city...</p>`
                });
            } finally {
                setLoading(false);
            }
        };
        fetchPostAndComments();
    }, [slug]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!post || post._id === 'dummy') return;
        
        setIsSubmitting(true);
        try {
            const res = await axios.post('/api/comments', {
                postId: post._id,
                ...commentForm
            });
            setComments([res.data, ...comments]);
            setCommentForm({ name: '', email: '', content: '' });
        } catch (err) {
            console.error('Error posting comment:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

    return (
        <main className="container">
            <div className="main-layout" style={{ paddingTop: '8rem' }}>
                <div className="content-area">
                    <article className="post-detail-content" style={{ 
                        background: '#FFFFFF', 
                        padding: '4rem', 
                        borderRadius: '32px', 
                        boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
                        border: '1px solid #E2E8F0',
                        marginBottom: '4rem'
                    }}>
                        <div className="post-header" style={{ marginBottom: '3rem' }}>
                            <div className="post-meta" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', color: '#64748B', fontSize: '0.9rem' }}>
                                <Link to={`/?category=${post.category}`} className="cat-badge" style={{ padding: '6px 15px', background: 'rgba(90, 129, 250, 0.1)', color: 'var(--primary)', fontWeight: '700', borderRadius: '4px', textTransform: 'uppercase', textDecoration: 'none' }}>{post.category}</Link>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {post.readTime} read</span>
                                {post.createdAt && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString()}</span>}
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={16} /> {comments.length} Comments</span>
                            </div>
                            <h1 style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '2rem', fontWeight: '800', color: '#0F172A' }}>{post.title}</h1>
                            <div className="author-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '1rem 0' }}>
                                  <img src={profileImg} 
                                     alt="Author" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
                                     <span>By <strong style={{ color: '#0F172A', fontWeight: '700' }}>{post.author || 'uxprasa'}</strong></span>
                                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.2rem' }}>
                                        <a href="https://www.facebook.com/people/UX-prasa/61587203784505/" target="_blank" rel="noreferrer"><Facebook size={18} className="icon-link" style={{ color: '#0F172A' }} /></a>
                                        <a href="https://youtube.com" target="_blank" rel="noreferrer"><Youtube size={18} className="icon-link" style={{ color: '#0F172A' }} /></a>
                                        <a href="https://tiktok.com/@uxprasa" target="_blank" rel="noreferrer">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-link" style={{ color: '#0F172A' }}>
                                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                            </svg>
                                        </a>
                                    </div>
                            </div>
                        </div>

                        <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: '24px', marginBottom: '4rem', maxHeight: '700px', objectFit: 'cover', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }} />

                        <div className="post-body" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.9' }} dangerouslySetInnerHTML={{ __html: post.content }}>
                        </div>

                        {/* Social Share Bottom */}
                        <div style={{ padding: '4rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', marginTop: '5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {(post.tags || ['WebDesign', 'Tech', 'Uxprasa']).map(tag => (
                                    <Link key={tag} to={`/?search=${tag}`} style={{ padding: '8px 22px', background: 'var(--light-2)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>#{tag}</Link>
                                ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <span style={{ fontSize: '0.95rem', fontWeight: '800' }}>Share this story:</span>
                                <Facebook size={22} className="icon-link" />
                                <Twitter size={22} className="icon-link" />
                                <Linkedin size={22} className="icon-link" />
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div id="comments" style={{ marginTop: '6rem' }}>
                            <h3 style={{ fontSize: '2.2rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <MessageSquare size={32} color="var(--primary)" /> {comments.length} Comments
                            </h3>

                            {/* Comment Form */}
                            <div style={{ background: 'var(--bg-light)', padding: '3.5rem', borderRadius: '24px', marginBottom: '5rem', border: '1px solid var(--border-color)' }}>
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: '800' }}>Leave a comment</h4>
                                <form onSubmit={handleCommentSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div style={{ gridColumn: 'span 1' }}>
                                        <input 
                                            type="text" 
                                            placeholder="Your Name*" 
                                            required 
                                            value={commentForm.name}
                                            onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                            style={{ background: 'white', padding: '18px 25px' }}
                                        />
                                    </div>
                                    <div style={{ gridColumn: 'span 1' }}>
                                        <input 
                                            type="email" 
                                            placeholder="Your Email*" 
                                            required 
                                            value={commentForm.email}
                                            onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                            style={{ background: 'white', padding: '18px 25px' }}
                                        />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <textarea 
                                            placeholder="Write your comment here..." 
                                            required 
                                            rows="6"
                                            value={commentForm.content}
                                            onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                                            style={{ background: 'white', padding: '20px 25px', width: '100%', borderRadius: '16px', border: '1px solid var(--border-color)', fontFamily: 'inherit' }}
                                        ></textarea>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <button 
                                            type="submit" 
                                            className="btn-primary" 
                                            disabled={isSubmitting}
                                            style={{ padding: '18px 50px', fontSize: '1.1rem' }}
                                        >
                                            {isSubmitting ? 'Posting...' : 'Post Comment Now'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Comments List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {comments.length > 0 ? (
                                    comments.map(comment => (
                                        <div key={comment._id} style={{ display: 'flex', gap: '2rem' }}>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', flexShrink: 0 }}>
                                                {comment.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                                    <h5 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{comment.name}</h5>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>{comment.content}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem', background: 'var(--bg-light)', borderRadius: '16px' }}>No comments yet. Be the first to share your thoughts!</p>
                                )}
                            </div>
                        </div>
                    </article>
                </div>
                <Sidebar />
            </div>

            <style>{`
                .post-behavior { max-width: 100%; overflow-x: hidden; }
                .post-body { white-space: pre-wrap; word-wrap: break-word; color: #333; }
                .post-body h2 { font-size: 2.2rem; margin: 3.5rem 0 1.5rem; color: var(--text-main); font-weight: 800; }
                .post-body h3 { font-size: 1.8rem; margin: 3rem 0 1.2rem; color: var(--text-main); font-weight: 800; }
                .post-body p { margin-bottom: 2rem; line-height: 2; font-size: 1.15rem; }
                .post-body b, .post-body strong { color: #000; font-weight: 850 !important; }
                .post-body img { max-width: 100%; height: auto; borderRadius: 24px; margin: 2rem 0; display: block; }
                .post-body ul, .post-body ol { margin-bottom: 2.5rem; padding-left: 2rem; }
                .post-body li { margin-bottom: 1rem; }
                .icon-link { color: var(--text-main); cursor: pointer; transition: all 0.3s; }
                .icon-link:hover { color: var(--primary); transform: translateY(-3px); }
                input:focus, textarea:focus { border-color: var(--primary) !important; outline: none; }

                @media (max-width: 768px) {
                    .post-detail-content { padding: 2rem !important; border-radius: 20px !important; }
                    .post-title-text { font-size: 2.5rem !important; }
                }
            `}</style>
        </main>
    );
};

export default PostDetails;
