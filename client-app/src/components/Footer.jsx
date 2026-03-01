import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, ArrowUp, Mail, Phone } from 'lucide-react';
import logoLight from '../assets/logo.png';
import logoDark from '../assets/logo-dark.png';
import { useState, useEffect } from 'react';
import api from '../api';

const Footer = () => {
    const [isDark, setIsDark] = useState(false);
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [status, setStatus] = useState({ loading: false, type: '', msg: '' });
    const [categories, setCategories] = useState([]);
    const [topicSearch, setTopicSearch] = useState('');

    useEffect(() => {
        api.get('/api/categories').then(res => setCategories(res.data)).catch(() => {});
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, type: '', msg: '' });
        try {
            await api.post('/api/newsletter/subscribe', { email: subscribeEmail });
            setStatus({ loading: false, type: 'success', msg: 'ස්තූතියි! ඔබේ ලියාපදිංචිය සාර්ථකයි.' });
            setSubscribeEmail('');
        } catch (err) {
            setStatus({ 
                loading: false, 
                type: 'error', 
                msg: err.response?.data?.message || 'ගැටලුවක් මතු වුණා. පසුව උත්සාහ කරන්න.' 
            });
        }
    };

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        };
        
        checkTheme();
        
        // Listen for theme changes (since Footer doesn't have the toggle)
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        
        return () => observer.disconnect();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{ 
            marginTop: '4rem', 
            background: isDark ? 'var(--bg-card)' : 'var(--light-2)', 
            borderTop: '1px solid var(--border-color)', 
            padding: '4rem 0 4rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decorative Element */}
            <div style={{
                position: 'absolute',
                top: '-150px',
                right: '-150px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                opacity: 0.05,
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Newsletter Section */}
                <div className="footer-newsletter-box" style={{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'var(--white)', 
                    padding: '4rem', 
                    borderRadius: '24px', 
                    marginBottom: '6rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    gap: '2.5rem', 
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
                }}>
                    <div className="newsletter-text" style={{ flex: '1', minWidth: '300px' }}>
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: '800' }}>Stay updated!</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>අපගේ නවතම ලිපි සහ පුවත් සෘජුවම ඔබගේ email ලිපිනයට ලබා ගන්න.</p>
                        {status.msg && (
                            <p style={{ 
                                color: status.type === 'success' ? '#10B981' : '#EF4444',
                                fontWeight: '600',
                                marginTop: '1rem',
                                fontSize: '0.9rem'
                            }}>{status.msg}</p>
                        )}
                    </div>
                    <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                        <input 
                            type="email" 
                            required
                            placeholder="Email Address..." 
                            value={subscribeEmail}
                            onChange={(e) => setSubscribeEmail(e.target.value)}
                            className="footer-news-input"
                        />
                        <button type="submit" disabled={status.loading} className="btn-primary footer-news-btn">
                            {status.loading ? '...' : 'Subscribe'}
                        </button>
                    </form>
                </div>

                {/* Footer Links - 4 Column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
                    {/* Column 1: Brand */}
                    <div style={{ gridColumn: 'span 1.2' }}>
                        <div className="logo" style={{ marginBottom: '2rem' }}>
                            <img src={isDark ? logoDark : logoLight} alt="uxprasa" style={{ height: '40px', objectFit: 'contain' }} />
                        </div>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '350px', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.8' }}>
                            Welcome to UXPRASA! Your go-to place for Web Development, UI/UX Design, and WordPress tutorials and insights.
                        </p>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', opacity: 0.7, maxWidth: '300px' }}>
                            <p>All content is provided for educational purposes only.</p>
                        </div>
                    </div>

                    {/* Column 2: Explore Topics */}
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Explore Topics</h3>
                        {/* Search */}
                        <div style={{ position: 'relative', marginBottom: '1.2rem' }}>
                            <input
                                type="text"
                                value={topicSearch}
                                onChange={e => setTopicSearch(e.target.value)}
                                placeholder="Search topics..."
                                style={{
                                    width: '100%',
                                    padding: '10px 16px 10px 36px',
                                    borderRadius: '10px',
                                    border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.1)',
                                    background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)',
                                    color: isDark ? '#cbd5e1' : '#334155',
                                    fontSize: '0.88rem',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    caretColor: isDark ? '#cbd5e1' : '#334155',
                                }}
                            />
                            <svg style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', opacity: 0.45, color: isDark ? '#cbd5e1' : '#64748b' }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </div>
                        <ul className="footer-links">
                            {(categories.length > 0 ? categories : [
                                { _id: '1', name: 'Web Development' },
                                { _id: '2', name: 'UI/UX Design' },
                                { _id: '3', name: 'WordPress' },
                                { _id: '4', name: 'Tips & Tricks' },
                            ])
                            .filter(cat => cat.name.toLowerCase().includes(topicSearch.toLowerCase()))
                                .map(cat => (
                                <li key={cat._id}><Link to={`/?category=${cat.name}`}>{cat.name}</Link></li>
                            ))}
                            {categories.length > 0 && categories.filter(cat => cat.name.toLowerCase().includes(topicSearch.toLowerCase())).length === 0 && (
                                <li style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontStyle: 'italic' }}>No topics found.</li>
                            )}
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Social & Contact */}
                    <div>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>Social</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            Follow us for daily tech updates, tips, and tutorials.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2.5rem' }}>
                            {[
                                { icon: <Facebook size={20} />, url: 'https://www.facebook.com/people/UX-prasa/61587203784505/' },
                                { icon: <Youtube size={20} />, url: 'https://youtube.com' },
                                { icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                ), url: 'https://tiktok.com/@uxprasa' },
                                { icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 2l-2.6 7.4Z" />
                                    </svg>
                                ), url: 'https://whatsapp.com/channel/0029Vb8JBr06LwHec2lewr43' }
                            ].map((social, i) => (
                                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="social-pill">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © 2026 — UXPRASA. Crafted with ❤️ in Sri Lanka.
                    </p>
                    <button onClick={scrollToTop} className="scroll-top-btn">
                        <ArrowUp size={20} />
                    </button>
                </div>
            </div>

            <style>{`
                .footer-links { list-style: none; }
                .footer-links li { margin-bottom: 1.2rem; }
                .footer-links a { color: var(--text-muted); font-size: 1rem; font-weight: 500; transition: all 0.3s; text-transform: capitalize; }
                .footer-links a:hover { color: var(--primary); padding-left: 8px; }

                .social-pill {
                    width: 45px;
                    height: 45px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: ${isDark ? 'rgba(255,255,255,0.05)' : 'var(--white)'};
                    color: var(--text-main);
                    border: 1px solid var(--border-color);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .social-pill:hover {
                    background: var(--primary);
                    color: white;
                    transform: translateY(-5px) rotate(8deg);
                    border-color: var(--primary);
                    box-shadow: 0 10px 20px rgba(90, 129, 250, 0.3);
                }

                .scroll-top-btn {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    width: 50px;
                    height: 50px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    color: var(--text-main);
                }
                .scroll-top-btn:hover {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(90, 129, 250, 0.2);
                }

                .footer-email:hover { color: var(--primary) !important; }

                @media (max-width: 1024px) {
                    .footer-newsletter-box { flex-direction: column !important; text-align: center; gap: 2rem !important; padding: 3rem 2rem !important; }
                    .footer-newsletter-form { width: 100% !important; max-width: 100% !important; flex-direction: column !important; }
                    .footer-news-input, .footer-news-btn { width: 100% !important; text-align: center; }
                }

                @media (max-width: 768px) {
                    footer { padding: 4rem 0 3rem !important; }
                    .footer-newsletter-box { padding: 3rem 1.5rem !important; margin-bottom: 4rem !important; }
                    .newsletter-text h2 { font-size: 1.8rem !important; margin-bottom: 0.5rem !important; }
                    .newsletter-text p { font-size: 0.95rem !important; line-height: 1.6 !important; margin-bottom: 0 !important; }
                    .footer-newsletter-form { gap: 1.2rem !important; margin-top: 1rem !important; display: flex !important; flex-direction: column !important; }
                    .footer-news-input { padding: 12px 20px !important; font-size: 0.9rem !important; }
                    .footer-news-btn { height: 50px !important; font-size: 0.95rem !important; padding: 0 !important; }
                    .container > div:nth-child(2) { grid-template-columns: 1fr 1fr !important; gap: 2.5rem 1.5rem !important; }
                }

                @media (max-width: 480px) {
                    .container > div:nth-child(2) { grid-template-columns: 1fr 1fr !important; gap: 2rem 1rem !important; }
                    .container > div:nth-child(2) > div:first-child,
                    .container > div:nth-child(2) > div:last-child {
                        grid-column: span 2 !important;
                    }
                    .footer-newsletter-box { padding: 2rem 1.25rem !important; border-radius: 20px !important; }
                    .newsletter-text h2 { font-size: 1.5rem !important; }
                    .newsletter-text p { font-size: 0.88rem !important; }
                }
                .footer-news-input { 
                    flex: 1;
                    border-radius: 100px; 
                    padding: 16px 28px; 
                    background: ${isDark ? 'var(--bg-light)' : 'var(--light-1)'}; 
                    border: 1.5px solid var(--border-color); 
                    font-size: 1rem; 
                    outline: none;
                    transition: all 0.3s;
                }
                .footer-news-input:focus { border-color: var(--primary); }
                .footer-news-btn { 
                    padding: 0 45px; 
                    height: 58px;
                    border-radius: 100px; 
                    font-size: 1.05rem; 
                    transition: all 0.3s;
                    white-space: nowrap;
                }

                .footer-bottom {
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding-top: 3rem; 
                    border-top: 1px solid var(--border-color);
                }
                .footer-copyright {
                    color: var(--text-muted); 
                    fontSize: 0.95rem; 
                    fontWeight: 500;
                    margin: 0;
                }

                @media (max-width: 600px) {
                    .footer-bottom {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        gap: 1rem;
                        padding-top: 2rem;
                    }
                    .footer-copyright {
                        font-size: 0.82rem;
                        line-height: 1.5;
                        flex: 1;
                        margin-right: 10px;
                        text-align: left;
                    }
                    .scroll-top-btn {
                        width: 42px;
                        height: 42px;
                        flex-shrink: 0;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
