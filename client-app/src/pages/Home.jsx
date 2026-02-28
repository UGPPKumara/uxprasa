import { useState, useEffect, useRef } from 'react';
import api from '../api';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import { ChevronLeft, ChevronRight, Search as SearchIcon, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const resultsRef = useRef(null);

    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get('page')) || 1;

    useEffect(() => {
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        if ((search || category) && resultsRef.current) {
            setTimeout(() => {
                resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [location.search]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/api/categories', { timeout: 8000 });
                setCategories(res.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        const params = new URLSearchParams(location.search);
        params.set('page', newPage);
        navigate(`?${params.toString()}`);
        const postsElement = document.getElementById('blog-posts');
        if (postsElement) postsElement.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const search = searchParams.get('search') || '';
                const category = searchParams.get('category') || '';
                const page = searchParams.get('page') || 1;
                
                const res = await api.get(`/api/posts`, {
                    params: { search, category, page, limit: 4 },
                    timeout: 8000
                });
                
                setPosts(res.data.posts || []);
                setTotalPages(res.data.totalPages || 1);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();

        const timer = setTimeout(() => {
            setLoading(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, [location.search]);

    const displayPosts = posts;

    return (
        <main className="container">
            {/* Hero Section - Hide if searching or filtering category */}
            {location.pathname === '/' && !searchParams.get('search') && !searchParams.get('category') && (
                <section className="hero" style={{ padding: '12rem 0 6rem', textAlign: 'center', position: 'relative' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="animate-reveal">
                        <div style={{ display: 'inline-block', padding: '8px 20px', borderRadius: '40px', background: 'var(--light-2)', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '800', marginBottom: '2rem', letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid var(--border-color)' }}>
                            🚀 Learn Web Design & Development
                        </div>
                        <h1 style={{ fontSize: '5.2rem', fontWeight: '800', lineHeight: '1', marginBottom: '2rem', letterSpacing: '-2px' }}>
                            තාක්ෂණය සහ නිර්මාණකරණය <br />
                            <span style={{ 
                                background: 'linear-gradient(90deg, var(--primary) 0%, #87A3FF 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block'
                            }}>සිංහලෙන්ම ඉගෙන ගන්න.</span>
                        </h1>
                        <p className="animate-reveal delay-1" style={{ fontSize: '1.4rem', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto 3rem', fontWeight: '500' }}>
                            Web Development, UI/UX Design සහ WordPress මූලධර්ම ඔබේම භාෂාවෙන් සරලව. 
                            ඩිජිටල් නිර්මාණකරුවෙකු වීමට අවශ්‍ය සියලු දැනුම එකම තැනකින්.
                        </p>
                        <div className="hero-buttons animate-reveal delay-2" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '4rem' }}>
                            <button className="btn-primary" style={{ padding: '15px 35px', fontSize: '1.1rem' }} onClick={() => navigate('/blog')}>Start Learning</button>
                            <button className="btn-secondary" style={{ padding: '15px 35px', fontSize: '1.1rem' }} onClick={() => navigate('/about')}>About Us</button>
                        </div>
                    </div>

                    <div className="featured-cards-grid animate-reveal delay-3">
                        <div className="cta-card" onClick={() => window.open('https://tiktok.com/@uxprasa', '_blank')}>
                            <div className="cta-header">
                                <h3>Follow on TikTok</h3>
                                <div className="cta-icon-circle accent"><ArrowUpRight size={20} /></div>
                            </div>
                            <p>UXPRASA TikTok පිටුව හරහා නවතම තාක්ෂණික තොරතුරු සහ කෙටි පාඩම් ඉතා ඉක්මනින් නරඹන්න.</p>
                        </div>
                        <div className="cta-card" onClick={() => window.open('https://whatsapp.com', '_blank')}>
                            <div className="cta-header">
                                <h3>Join WhatsApp</h3>
                                <div className="cta-icon-circle outline"><ArrowUpRight size={20} /></div>
                            </div>
                            <p>අලුත්ම තාක්ෂණික තොරතුරු සහ වැදගත් updates ඉක්මනින් දැනගන්න අපගේ WhatsApp Channel එකට එකතු වෙන්න.</p>
                        </div>
                        <div className="cta-card" onClick={() => navigate('/services')}>
                            <div className="cta-header">
                                <h3>Our Services</h3>
                                <div className="cta-icon-circle outline"><ArrowUpRight size={20} /></div>
                            </div>
                            <p>Web Development, UI/UX Design සහ Academic Projects සඳහා වඩාත් විශ්වාසනීය සහ වෘත්තීය මට්ටමේ සේවාවන් ලබන්න.</p>
                        </div>
                    </div>
                </section>
            )}

            {location.pathname === '/blog' && !searchParams.get('search') && !searchParams.get('category') && (
                <div style={{ paddingTop: '12rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem' }}>Our Blog</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>සියලුම තාක්ෂණික ලිපි සහ නිර්මාණ පාඩම් මෙතැනින් කියවන්න.</p>
                </div>
            )}

            {(searchParams.get('search') || searchParams.get('category')) && (
                <div ref={resultsRef} style={{ 
                    paddingTop: '10rem', // Add padding since hero is hidden
                    marginBottom: '3rem', 
                    scrollMarginTop: '100px', 
                    animation: 'fadeIn 0.5s ease-out'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '20px', 
                        background: 'var(--light-2)', 
                        padding: '2rem 2.5rem', 
                        borderRadius: '24px', 
                        border: '1px solid var(--border-color)' 
                    }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(90, 129, 250, 0.2)' }}>
                            <SearchIcon size={28} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {searchParams.get('search') ? 'Search Phrase' : 'Category Filter'}
                            </p>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                                "{searchParams.get('search') || searchParams.get('category')}"
                            </h2>
                        </div>
                        <button 
                            onClick={() => navigate(location.pathname === '/blog' ? '/blog' : '/')} 
                            className="btn-clear" 
                            style={{ 
                                background: 'white', 
                                border: '1px solid var(--border-color)', 
                                padding: '12px 25px', 
                                borderRadius: '12px', 
                                fontWeight: '700', 
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                        >
                            Clear Results
                        </button>
                    </div>
                </div>
            )}

            <div className="main-layout scroll-reveal" id="blog-posts">
                <div className="posts-column animate-fade delay-1">
                    {loading ? (
                        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                            <div className="loader" style={{ width: '40px', height: '40px', border: '3px solid var(--light-2)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
                            <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Loading posts...</p>
                        </div>
                    ) : displayPosts.length === 0 ? (
                        <div style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '32px', border: '1px dashed var(--border-color)' }}>
                            <div style={{ width: '80px', height: '80px', background: 'var(--light-2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                <ArrowRight size={32} color="var(--primary)" style={{ transform: 'rotate(-45deg)' }} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>අලුත් ලිපි ඉතා ඉක්මනින්...</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                                දැනට මෙම කොටසෙහි පෝස්ට් කිසිවක් නොමැත. අලුත්ම තාක්ෂණික ලිපි සඳහා අප සමඟ රැඳී සිටින්න.
                            </p>
                        </div>
                    ) : (
                        <>
                            {displayPosts.map((post, index) => (
                                <div key={post._id} className="scroll-reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                                    <PostCard post={post} />
                                </div>
                            ))}
                            {totalPages > 1 && (
                                <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '4rem' }}>
                                    <button className="page-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}><ChevronLeft size={20} /></button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button key={index + 1} className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                                    ))}
                                    <button className="page-btn" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}><ChevronRight size={20} /></button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <Sidebar />
            </div>

            <style>{`
                .featured-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; max-width: 1200px; margin: 4rem auto 0; padding: 0 20px; }
                .cta-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 2.5rem; text-align: left; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; box-shadow: var(--shadow-sm); cursor: pointer; }
                .cta-card:hover { transform: translateY(-8px); border-color: var(--primary); box-shadow: 0 20px 40px rgba(90, 129, 250, 0.1); }
                .cta-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
                .cta-card h3 { color: var(--text-main); font-size: 1.4rem; font-weight: 700; margin: 0; }
                .cta-icon-circle { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
                .cta-icon-circle.accent { background: var(--primary); color: white; }
                .cta-icon-circle.outline { border: 1.5px solid var(--border-color); color: var(--text-muted); }
                .cta-card p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .page-btn { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-muted); cursor: pointer; transition: all 0.3s; }
                .page-btn.active { background: var(--primary); color: white; border-color: var(--primary); font-weight: 700; box-shadow: 0 4px 10px rgba(90, 129, 250, 0.3); }

                /* Hero responsive */
                .hero h1 { font-size: 5.2rem; }
                .hero p { font-size: 1.4rem; }
                .hero-buttons { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; }

                @media (max-width: 992px) {
                    .featured-cards-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 768px) {
                    .hero { padding: 9rem 0 4rem !important; }
                    .hero h1 { font-size: 2.6rem !important; letter-spacing: -1px !important; }
                    .hero p { font-size: 1rem !important; }
                    .featured-cards-grid { grid-template-columns: 1fr; gap: 16px; padding: 0; }
                    .cta-card { padding: 1.8rem; }
                    .hero-buttons { gap: 1rem; }
                    .hero-buttons button { width: 100%; justify-content: center; }
                }
                @media (max-width: 480px) {
                    .hero h1 { font-size: 2rem !important; }
                    .hero p { font-size: 0.95rem !important; }
                }
            `}</style>
        </main>
    );
};

export default Home;
