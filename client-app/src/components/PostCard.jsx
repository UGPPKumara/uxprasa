import { Link } from 'react-router-dom';
import { Calendar, Clock, MessageSquare, ArrowRight } from 'lucide-react';

const PostCard = ({ post }) => {
    return (
        <article className="post-card">
            <div className="post-image-box">
                <img src={post.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                    alt={post.title} className="post-img" />
                <Link to={`/?category=${post.category}`} className="post-category-tag" style={{ textDecoration: 'none' }}>
                   {post.category || 'INNOVATION'}
                </Link>
            </div>

            <div className="post-info">
                <div className="post-meta-line">
                    <span className="meta-item">
                        <Calendar size={14} />
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Sep 7, 2023'}
                    </span>
                    <span className="meta-item">
                        <Clock size={14} />
                        {post.readTime || '5 min'}
                    </span>
                    <span className="meta-item">
                        <MessageSquare size={14} />
                        {post.commentCount || 0} {post.commentCount === 1 ? 'Comment' : 'Comments'}
                    </span>
                </div>

                <Link to={`/post/${post.slug || post._id}`}>
                    <h2 className="post-title-text">{post.title}</h2>
                </Link>

                <p className="post-summary">
                    {post.excerpt || 'In the heart of a bustling city, where innovation meets opportunity, the story of our digital journeys begins...'}
                </p>

                <Link to={`/post/${post.slug || post._id}`} className="post-link">
                    Read More <ArrowRight size={16} />
                </Link>
            </div>

            <style>{`
                .post-card { 
                    display: grid; 
                    grid-template-columns: 400px 1fr; 
                    gap: 0; 
                    background: var(--bg-card); 
                    border-radius: 24px; 
                    overflow: hidden; 
                    margin-bottom: 3rem; 
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); 
                    border: 1px solid var(--border-color);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                    position: relative;
                }
                .post-card:hover { 
                    transform: translateY(-10px); 
                    box-shadow: 0 20px 40px rgba(90, 129, 250, 0.1); 
                    border-color: rgba(90, 129, 250, 0.3);
                }
                .post-image-box { 
                    position: relative; 
                    height: 100%; 
                    min-height: 320px;
                    overflow: hidden;
                }
                .post-img { 
                    width: 100%; 
                    height: 100%; 
                    object-fit: cover; 
                    transition: transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
                }
                .post-card:hover .post-img { 
                    transform: scale(1.1); 
                }
                .post-category-tag { 
                    position: absolute; 
                    top: 24px; 
                    left: 24px; 
                    background: var(--primary); 
                    color: white; 
                    padding: 8px 18px; 
                    border-radius: 50px; 
                    font-size: 0.75rem; 
                    font-weight: 800; 
                    letter-spacing: 0.5px;
                    box-shadow: 0 8px 16px rgba(90, 129, 250, 0.4);
                    z-index: 10;
                    backdrop-filter: blur(4px);
                }
                .post-info { 
                    padding: 3.5rem; 
                    display: flex; 
                    flex-direction: column; 
                    justify-content: center;
                    background: linear-gradient(to right, rgba(255,255,255,0.02), transparent);
                }
                .post-meta-line { 
                    display: flex; 
                    align-items: center; 
                    gap: 1.8rem; 
                    color: var(--text-muted); 
                    font-size: 0.85rem; 
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .post-title-text { 
                    font-size: 2.2rem; 
                    margin-bottom: 1.5rem; 
                    line-height: 1.3; 
                    color: var(--text-main); 
                    font-weight: 800;
                    transition: all 0.3s;
                    letter-spacing: -0.5px;
                }
                .post-title-text:hover { 
                    color: var(--primary); 
                }
                .post-summary { 
                    color: var(--text-muted); 
                    margin-bottom: 2.5rem; 
                    font-size: 1rem;
                    line-height: 1.8;
                    display: -webkit-box; 
                    -webkit-line-clamp: 2; 
                    -webkit-box-orient: vertical; 
                    overflow: hidden; 
                    font-weight: 500;
                }
                .post-link { 
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    color: var(--primary); 
                    font-size: 1rem; 
                    font-weight: 800; 
                    transition: all 0.3s;
                    padding: 4px 0;
                    position: relative;
                }
                .post-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 30px;
                    height: 2px;
                    background: var(--primary);
                    transition: width 0.3s;
                }
                .post-link:hover { 
                    gap: 16px;
                    color: var(--secondary);
                }
                .post-link:hover::after {
                    width: 100%;
                    background: var(--secondary);
                }

                @media (max-width: 1200px) {
                    .post-card { grid-template-columns: 350px 1fr; }
                    .post-info { padding: 2.5rem; }
                    .post-title-text { font-size: 1.8rem; }
                }

                @media (max-width: 900px) {
                    .post-card { display: block; }
                    .post-image-box { height: 300px; min-height: auto; }
                    .post-info { padding: 2.5rem; }
                }
            `}</style>
        </article>
    );
};

export default PostCard;
