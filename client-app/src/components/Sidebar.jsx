import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, ArrowRight, TrendingUp } from 'lucide-react';

import profileImg from '../assets/profile.png';
import ConfirmModal from './ConfirmModal';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [status, setStatus] = useState({ loading: false, type: '', msg: '' });
    const [confirmState, setConfirmState] = useState({ isOpen: false, title: '', message: '', type: 'success', isAlert: true });

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, type: '', msg: '' });
        try {
            await axios.post('/api/newsletter/subscribe', { email: subscribeEmail });
            setConfirmState({
                isOpen: true,
                title: 'ලියාපදිංචිය සාර්ථකයි!',
                message: 'ස්තූතියි! ඔබ අපගේ Newsletter එකට සාර්ථකව සම්බන්ධ වුණා.',
                type: 'success',
                isAlert: true
            });
            setStatus({ loading: false, type: 'success', msg: '' });
            setSubscribeEmail('');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'ගැටලුවක් මතු වුණා. පසුව උත්සාහ කරන්න.';
            setConfirmState({
                isOpen: true,
                title: 'ගැටලුවක් මතු වුණා',
                message: errorMsg,
                type: 'danger',
                isAlert: true
            });
            setStatus({ loading: false, type: 'error', msg: '' });
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/categories');
                setCategories(res.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        const fetchTrendingPosts = async () => {
            try {
                const res = await axios.get('/api/posts/trending');
                setTrendingPosts(res.data);
            } catch (err) {
                console.error('Error fetching trending posts:', err);
            }
        };
        fetchCategories();
        fetchTrendingPosts();
    }, []);

    return (
        <aside className="sidebar-container">
            {/* About Profile */}
            <div className="sidebar-widget about-widget">
                <div className="profile-header">
                    <div className="profile-img-wrapper">
                        <img src={profileImg} 
                            alt="UXPRASA Author" className="profile-img" />
                    </div>
                    <div className="profile-info">
                        <h4>UXPRASA</h4>
                        <span>Web & UI/UX Designer</span>
                    </div>
                </div>
                <p className="about-text">
                    Hi, I'm Prasanna. I am a Software Engineering student and the founder of Nuvoora IT Solutions. My goal is to explain technology simply in Sinhala.
                </p>
                <div className="social-row">
                    <a href="https://www.facebook.com/people/UX-prasa/61587203784505/" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={16} /></a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Youtube size={16} /></a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                    </a>
                    <a href="https://whatsapp.com/channel/0029Vb8JBr06LwHec2lewr43" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 2l-2.6 7.4Z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Trending / Featured Posts */}
            <div className="sidebar-widget">
                <h3 className="widget-title"><TrendingUp size={18} /> Trending Posts</h3>
                <div className="featured-list">
                    {trendingPosts.length > 0 ? (
                        trendingPosts.map((post) => (
                            <Link key={post._id} to={`/post/${post.slug}`} className="small-post">
                                <img src={post.image} alt={post.title} className="small-post-img" />
                                <div className="small-post-info">
                                    <h5>{post.title}</h5>
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No trending posts yet.</p>
                    )}
                </div>
            </div>

            {/* Newsletter */}
            <div className="sidebar-widget newsletter-widget">
                <h3 className="widget-title">Get Latest Updates</h3>
                <p>අපගේ නවතම ලිපි සහ පුවත් සෘජුවම ඔබගේ email ලිපිනයට ලබා ගැනීමට ලියාපදිංචි වන්න.</p>
                {status.msg && (
                    <p style={{ 
                        color: status.type === 'success' ? '#10B981' : '#EF4444',
                        fontWeight: '600',
                        marginBottom: '1rem',
                        fontSize: '0.85rem'
                    }}>{status.msg}</p>
                )}
                <form onSubmit={handleSubscribe} className="newsletter-form-minimal">
                    <input 
                        type="email" 
                        required
                        placeholder="Email Address" 
                        value={subscribeEmail}
                        onChange={(e) => setSubscribeEmail(e.target.value)}
                    />
                    <button type="submit" disabled={status.loading} className="btn-small">
                        {status.loading ? '...' : 'Subscribe'}
                    </button>
                </form>
            </div>

            {/* Hire Me / Services CTA Widget */}
            <div className="sidebar-widget hire-widget" style={{ 
                background: 'linear-gradient(135deg, var(--primary) 0%, #3B5BDB 100%)',
                color: 'white',
                border: 'none'
            }}>
                <h3 className="widget-title" style={{ color: 'white' }}>ඔබට වෙබ් අඩවියක් අවශ්‍යද?</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    ඔබේ ව්‍යාපාරයට ගැලපෙනම වෙබ් අඩවියක් හෝ සිස්ටම් එකක් සියලුම graphics, hosting සහ domain සියල්ල සමඟින් සාධාරණ මිලට අපෙන් සාදාගන්න.
                </p>
                <a href="https://api.whatsapp.com/send/?phone=94755111360&text&type=phone_number&app_absent=0" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-small" 
                    style={{ 
                        background: 'white', 
                        color: 'var(--primary)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        textDecoration: 'none'
                    }}>
                    මිල ගණන් විමසන්න <ArrowRight size={16} />
                </a>
            </div>

            {/* Keywords/Topics List */}
            <div className="sidebar-widget">
                <h3 className="widget-title" style={{ color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2rem' }}>Explore Topics</h3>
                <div className="category-list-vertical">
                    {categories.map(cat => (
                        <Link key={cat._id} to={`/?category=${cat.name}`} className="category-link-item">
                            <span className="cat-name">{cat.name}</span>
                            <ArrowRight size={14} className="cat-arrow" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Popup Modal */}
            <ConfirmModal 
                isOpen={confirmState.isOpen}
                onClose={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
                title={confirmState.title}
                message={confirmState.message}
                type={confirmState.type}
                isAlert={confirmState.isAlert}
                confirmText="Okay"
            />

            <style>{`
                .sidebar-container { display: flex; flex-direction: column; gap: 2.5rem; }
                .sidebar-widget { 
                    background: var(--white); 
                    padding: 2rem; 
                    border-radius: 20px; 
                    border: 1px solid #EEF2F6;
                    box-shadow: 0 2px 15px rgba(0,0,0,0.02);
                }
                .widget-title { 
                    display: flex; 
                    align-items: center; 
                    gap: 10px; 
                    font-size: 1.1rem; 
                    font-weight: 800; 
                    margin-bottom: 1.5rem; 
                    color: var(--black); 
                }
                
                /* About Profile */
                .profile-header { display: flex; align-items: center; gap: 15px; margin-bottom: 1.2rem; }
                .profile-img-wrapper { width: 60px; height: 60px; border-radius: 50%; padding: 3px; border: 2px solid var(--primary); }
                .profile-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
                .profile-info h4 { font-size: 1.1rem; font-weight: 800; color: var(--black); margin: 0; }
                .profile-info span { font-size: 0.75rem; color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
                .about-text { font-size: 0.9rem; color: var(--grey-1); line-height: 1.6; margin-bottom: 1.5rem; }
                .social-row { display: flex; gap: 12px; }
                .social-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--light-2); color: var(--black); transition: all 0.3s; }
                .social-icon:hover { background: var(--primary); color: white; transform: translateY(-3px); }

                /* Small Posts List */
                .featured-list { display: flex; flex-direction: column; gap: 1.2rem; }
                .small-post { display: flex; gap: 12px; align-items: center; cursor: pointer; transition: transform 0.3s; }
                .small-post:hover { transform: translateX(5px); }
                .small-post-img { width: 70px; height: 70px; border-radius: 12px; object-fit: cover; }
                .small-post-info h5 { font-size: 0.9rem; font-weight: 700; line-height: 1.4; color: var(--black); margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .small-post-info span { font-size: 0.75rem; color: var(--grey-2); font-weight: 500; }

                /* Newsletter */
                .newsletter-widget p { font-size: 0.85rem; color: var(--grey-1); margin-bottom: 1.5rem; }
                .newsletter-form-minimal { display: flex; flex-direction: column; gap: 10px; }
                .newsletter-form-minimal input { padding: 12px 15px; border-radius: 10px; border: 1px solid #EEF2F6; font-size: 0.85rem; }
                .btn-small { background: var(--black); color: white; padding: 10px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; }
                .btn-small:hover { background: var(--primary); }

                /* Category Vertical List */
                .category-list-vertical { display: flex; flex-direction: column; gap: 8px; }
                .category-link-item { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 12px 0; 
                    color: var(--grey-1); 
                    text-decoration: none; 
                    font-size: 1.05rem; 
                    font-weight: 500; 
                    transition: all 0.3s;
                    border-bottom: 1px solid #F1F5F9;
                }
                .category-link-item:last-child { border-bottom: none; }
                .category-link-item:hover { color: var(--primary); transform: translateX(5px); }
                .cat-arrow { opacity: 0; transition: all 0.3s; transform: translateX(-10px); }
                .category-link-item:hover .cat-arrow { opacity: 1; transform: translateX(0); }
            `}</style>
        </aside>
    );
};

export default Sidebar;
