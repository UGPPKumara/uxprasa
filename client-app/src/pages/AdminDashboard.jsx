import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash, Edit, PlusCircle, LayoutDashboard, LogOut, Search, Settings, FileText, BarChart, ChevronDown, CheckCircle, Clock, MessageSquare, Mail, Ban } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-dark.png';
import ConfirmModal from '../components/ConfirmModal';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [comments, setComments] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showCatModal, setShowCatModal] = useState(false);
    const [catName, setCatName] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [activeTab, setActiveTab] = useState('posts');
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [settingsData, setSettingsData] = useState({
        blogName: 'UXprasa',
        blogTagline: 'Learn. Build. Grow.',
        adminEmail: '',
        whatsappLink: '',
        facebookLink: '',
        youtubeLink: '',
        instagramLink: '',
        linkedinLink: '',
    });
    const [settingsSaved, setSettingsSaved] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Modal states
    const [confirmState, setConfirmState] = useState({ 
        isOpen: false, 
        title: '', 
        message: '', 
        type: 'danger', 
        isAlert: false, 
        confirmText: 'Confirm',
        onConfirm: () => {} 
    });

    // Form states
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        readTime: '5 min',
        slug: '',
        tags: '',
        featured: false
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
        fetchComments();
        fetchSubscribers();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await axios.get('/api/settings');
            setSettingsData({
                blogName: res.data.blogName || 'UXprasa',
                blogTagline: res.data.blogTagline || 'Learn. Build. Grow.',
                adminEmail: res.data.adminEmail || '',
                whatsappLink: res.data.whatsappLink || '',
                facebookLink: res.data.facebookLink || '',
                youtubeLink: res.data.youtubeLink || '',
                instagramLink: res.data.instagramLink || '',
                linkedinLink: res.data.linkedinLink || '',
            });
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/api/posts', {
                params: { page: 1, limit: 100 }
            });
            setPosts(res.data.posts || []);
        } catch (err) {
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/categories');
            setCategories(res.data);
            if (res.data.length > 0 && !formData.category) {
                setFormData(prev => ({ ...prev, category: res.data[0].name }));
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get('/api/comments');
            setComments(res.data);
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    };

    const fetchSubscribers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/newsletter/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubscribers(res.data);
        } catch (err) {
            console.error('Error fetching subscribers:', err);
        }
    };

    const handleSaveSettings = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/settings', settingsData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSettingsSaved(true);
            setTimeout(() => setSettingsSaved(false), 3000);
        } catch (err) {
            console.error('Error saving settings:', err);
            setConfirmState({
                isOpen: true,
                title: 'Save Failed',
                message: err.response?.data?.message || 'Settings could not be saved. Please try again.',
                type: 'danger',
                isAlert: true,
                confirmText: 'OK'
            });
        }
    };

    const handleDelete = (id) => {
        setConfirmState({
            isOpen: true,
            title: 'Delete Post?',
            message: 'Are you sure you want to delete this blog post? This action cannot be undone.',
            onConfirm: async () => {
                try {
                    await axios.delete(`/api/posts/${id}`);
                    fetchPosts();
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                } catch (err) {
                    console.error('Error deleting post:', err);
                }
            }
        });
    };

    const handleDeleteCategory = (id) => {
        setConfirmState({
            isOpen: true,
            title: 'Delete Category?',
            message: 'Are you sure you want to delete this category?',
            onConfirm: async () => {
                try {
                    await axios.delete(`/api/categories/${id}`);
                    fetchCategories();
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                } catch (err) {
                    console.error('Error deleting category:', err);
                }
            }
        });
    };

    const handleDeleteComment = (id) => {
        setConfirmState({
            isOpen: true,
            title: 'Delete Comment?',
            message: 'Are you sure you want to delete this comment?',
            onConfirm: async () => {
                try {
                    await axios.delete(`/api/comments/${id}`);
                    fetchComments();
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                } catch (err) {
                    console.error('Error deleting comment:', err);
                }
            }
        });
    };

    const handleDeleteSubscriber = (id) => {
        setConfirmState({
            isOpen: true,
            title: 'Remove Subscriber?',
            message: 'Are you sure you want to remove this email from the newsletter list?',
            onConfirm: async () => {
                try {
                    await axios.delete(`/api/newsletter/${id}`);
                    fetchSubscribers();
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                } catch (err) {
                    console.error('Error deleting subscriber:', err);
                }
            }
        });
    };

    const handleToggleBlockSubscriber = async (id) => {
        try {
            const res = await axios.put(`/api/newsletter/${id}/toggle-block`);
            setSubscribers(subscribers.map(sub => sub._id === id ? res.data.subscriber : sub));
            setConfirmState({
                isOpen: true,
                title: 'Status Updated',
                message: res.data.message,
                type: 'success',
                isAlert: true,
                confirmText: 'Great'
            });
        } catch (err) {
            console.error('Error toggling block status:', err);
            setConfirmState({
                isOpen: true,
                title: 'Update Failed',
                message: 'Failed to update user status. Please try again.',
                type: 'danger',
                isAlert: true,
                confirmText: 'Close'
            });
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/categories', { name: catName });
            setCatName('');
            fetchCategories();
        } catch (err) {
            console.error('Error adding category:', err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        console.log('SUBMITTING POST', { isEditing, formData });
        
        if (image) {
            data.append('image', image);
        }

        try {
            if (isEditing) {
                await axios.put(`/api/posts/${isEditing}`, data);
            } else {
                await axios.post('/api/posts', data);
            }
            fetchPosts();
            setShowForm(false);
            resetForm();
            setConfirmState({
                isOpen: true,
                title: isEditing ? 'Post Updated' : 'Post Published',
                message: isEditing ? 'The blog post has been successfully updated.' : 'Your new blog post is now live on the website!',
                type: 'success',
                isAlert: true,
                confirmText: 'Done'
            });
        } catch (err) {
            console.error('Error saving post:', err);
            const errMsg = err.response?.data?.error || err.response?.data?.message || err.message;
            setConfirmState({
                isOpen: true,
                title: 'Publishing Error',
                message: 'We couldn\'t save your post: ' + errMsg,
                type: 'danger',
                isAlert: true,
                confirmText: 'I understand'
            });
        }
    };

    const handleEdit = (post) => {
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            readTime: post.readTime,
            slug: post.slug,
            tags: post.tags?.join(','),
            featured: post.featured
        });
        setIsEditing(post._id);
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: categories.length > 0 ? categories[0].name : '',
            readTime: '5 min',
            slug: '',
            tags: '',
            featured: false
        });
        setImage(null);
        setIsEditing(null);
    };

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Admin Panel...</div>;

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-light)' }}>
            {/* Admin Sidebar */}
            <aside style={{ width: '280px', background: '#1E293B', color: 'white', padding: '2rem', display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto', flexShrink: 0 }}>
                <div style={{ marginBottom: '3.5rem', padding: '0.5rem 0' }}>
                    <img src={logo} alt="uxprasa" style={{ height: '35px', objectFit: 'contain' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <div onClick={() => setActiveTab('posts')} className={`admin-nav-item ${activeTab === 'posts' ? 'active' : ''}`}><LayoutDashboard size={20} /> Posts</div>
                    <div onClick={() => setActiveTab('categories')} className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}><Plus size={20} /> Categories</div>
                    <div onClick={() => { setActiveTab('comments'); setSelectedPostId(null); }} className={`admin-nav-item ${activeTab === 'comments' ? 'active' : ''}`}><MessageSquare size={20} /> Comments</div>
                    <div onClick={() => setActiveTab('newsletter')} className={`admin-nav-item ${activeTab === 'newsletter' ? 'active' : ''}`}><Mail size={20} /> Newsletter</div>
                    <div onClick={() => setActiveTab('analytics')} className={`admin-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}><BarChart size={20} /> Analytics</div>
                    <div onClick={() => setActiveTab('settings')} className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}><Settings size={20} /> Settings</div>
                </div>

                <button
                    onClick={() => setConfirmState({
                        isOpen: true,
                        title: 'Log Out?',
                        message: 'Are you sure you want to sign out of the Admin Dashboard?',
                        type: 'danger',
                        confirmText: 'Yes, Log Out',
                        onConfirm: handleLogout
                    })}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#94A3B8', padding: '14px 20px', marginTop: 'auto', background: 'none', borderRadius: '12px', width: '100%', transition: 'all 0.3s', cursor: 'pointer', border: 'none', fontWeight: '600', fontSize: '1rem', marginBottom: '4px' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#EF4444'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94A3B8'; }}
                >
                    <LogOut size={20} /> Log Out
                </button>
            </aside>

            {/* Admin Content Area */}
            <main style={{ flex: 1, padding: '3rem', overflowY: 'auto', height: '100vh' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome, Admin!</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Manage your blog content and see your stats.</p>
                    </div>
                    {activeTab === 'posts' && (
                        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary">
                            <PlusCircle size={20} /> Create New Post
                        </button>
                    )}
                </header>

                {activeTab === 'posts' ? (
                    <>
                        {/* Stats row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                            {[
                                { label: 'Total Posts', value: posts.length, icon: <FileText color="#FF5A5F" />, trend: 'Actual' },
                                { label: 'Subscribers', value: subscribers.length, icon: <Mail color="#FF5A5F" />, trend: 'Newsletter' },
                                { label: 'Comments', value: comments.length, icon: <MessageSquare color="#FF5A5F" />, trend: 'Total' },
                                { label: 'Categories', value: categories.length, icon: <Plus color="#FF5A5F" />, trend: 'Active' }
                            ].map(stat => (
                                <div key={stat.label} style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>{stat.label}</span>
                                        {stat.icon}
                                    </div>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.value}</h2>
                                    <p style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700' }}>{stat.trend}</p>
                                </div>
                            ))}
                        </div>

                        {/* Per-Post Views Chart */}
                        {posts.length > 0 && (
                            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem 2.5rem', border: '1px solid var(--border-color)', marginBottom: '3rem' }}>
                                <h3 style={{ marginBottom: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800' }}>
                                    <BarChart size={18} color="var(--primary)" /> Post Views Overview
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {[...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).map((post, i) => {
                                        const maxViews = Math.max(...posts.map(p => p.views || 0), 1);
                                        const pct = Math.max(((post.views || 0) / maxViews) * 100, 2);
                                        const colors = ['#5A81FA', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
                                        const col = colors[i % colors.length];
                                        return (
                                            <div key={post._id} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <span style={{ width: '22px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', flexShrink: 0, textAlign: 'right' }}>{i + 1}</span>
                                                <p style={{ width: '200px', fontWeight: '600', fontSize: '0.88rem', flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</p>
                                                <div style={{ flex: 1, height: '10px', borderRadius: '10px', background: 'var(--bg-light)', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${pct}%`, background: col, borderRadius: '10px', transition: 'width 0.8s ease' }} />
                                                </div>
                                                <span style={{ width: '50px', textAlign: 'right', fontWeight: '800', fontSize: '0.9rem', color: col, flexShrink: 0 }}>{post.views || 0}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Posts Table */}
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><FileText size={20} color="var(--primary)" /> Manage Blog Posts</h3>
                            
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--bg-light)', textAlign: 'left' }}>
                                        <th style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>POST TITLE</th>
                                        <th style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>CATEGORY</th>
                                        <th style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>VIEWS</th>
                                        <th style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>DATE</th>
                                        <th style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>STATUS</th>
                                        <th style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>No posts found. Get started by creating one!</td>
                                        </tr>
                                    ) : (
                                        posts.map(post => (
                                            <tr key={post._id} style={{ borderBottom: '1px solid var(--bg-light)' }}>
                                                <td style={{ padding: '15px', fontWeight: '600', fontSize: '1rem' }}>{post.title}</td>
                                                <td style={{ padding: '15px' }}><span className="cat-badge-small">{post.category}</span></td>
                                                <td style={{ padding: '15px', fontWeight: '700', color: 'var(--primary)' }}>{post.views || 0}</td>
                                                <td style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{new Date(post.createdAt).toLocaleDateString()}</td>
                                                <td style={{ padding: '15px' }}><span style={{ color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>PUBLISHED</span></td>
                                                <td style={{ padding: '15px', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                                        <button onClick={() => handleEdit(post)} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', width: '35px', height: '35px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => handleDelete(post._id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', width: '35px', height: '35px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : activeTab === 'categories' ? (
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ marginBottom: '2rem' }}>Manage Categories</h3>
                        <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                            <input type="text" placeholder="Category Name" value={catName} onChange={(e) => setCatName(e.target.value)} required style={{ flex: 1 }} />
                            <button type="submit" className="btn-primary" style={{ padding: '0 25px' }}>Add Category</button>
                        </form>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {categories.map(cat => (
                                <div key={cat._id} style={{ padding: '1.5rem', borderRadius: '12px', background: 'var(--bg-light)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontWeight: '700' }}>{cat.name}</span>
                                    </div>
                                    <button onClick={() => handleDeleteCategory(cat._id)} style={{ color: '#EF4444', background: 'none' }}><Trash size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'comments' ? (
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MessageSquare size={20} color="var(--primary)" /> 
                                {selectedPostId ? 'Comments for Post' : 'Manage Comments'}
                            </h3>
                            {selectedPostId && (
                                <button onClick={() => setSelectedPostId(null)} className="btn-small" style={{ background: 'var(--bg-light)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
                                    ← Back to Post List
                                </button>
                            )}
                        </div>

                        {!selectedPostId ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {posts.map(post => {
                                    const postComments = comments.filter(c => c.post?._id === post._id || c.post === post._id);
                                    if (postComments.length === 0) return null;
                                    return (
                                        <div key={post._id}
                                            onClick={() => setSelectedPostId(post._id)}
                                            style={{ padding: '1.5rem', borderRadius: '12px', background: 'var(--bg-light)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: '800' }}>
                                                    {postComments.length}
                                                </div>
                                                <div>
                                                    <h5 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '2px' }}>{post.title}</h5>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.category}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                                                View Comments <ChevronDown size={16} />
                                            </div>
                                        </div>
                                    );
                                })}
                                {comments.length === 0 && (
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No comments found in the system.</p>
                                )}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(90, 129, 250, 0.05)', borderRadius: '12px', marginBottom: '1rem', border: '1px solid rgba(90, 129, 250, 0.1)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '800', textTransform: 'uppercase' }}>Selected Post:</span>
                                    <h4 style={{ margin: '5px 0 0', color: 'var(--text-main)' }}>{posts.find(p => p._id === selectedPostId)?.title}</h4>
                                </div>
                                {comments.filter(c => c.post?._id === selectedPostId || c.post === selectedPostId).map(comment => (
                                    <div key={comment._id} style={{ padding: '1.5rem', borderRadius: '12px', background: 'var(--bg-light)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1, marginRight: '2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800' }}>
                                                    {(comment.name || 'A').charAt(0).toUpperCase()}
                                                </div>
                                                <strong style={{ fontSize: '1rem' }}>{comment.name}</strong>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{comment.email}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {new Date(comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p style={{ color: 'var(--text-main)', marginBottom: '0', lineHeight: '1.6' }}>{comment.content}</p>
                                        </div>
                                        <button onClick={() => handleDeleteComment(comment._id)}
                                            title="Delete Comment"
                                            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', width: '35px', height: '35px', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s' }}
                                            onMouseOver={(e) => { e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.color = 'white'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#EF4444'; }}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : activeTab === 'newsletter' ? (
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={20} color="var(--primary)" /> Newsletter Subscribers</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--bg-light)', textAlign: 'left' }}>
                                    <th style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>EMAIL ADDRESS</th>
                                    <th style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>SUBSCRIBED DATE</th>
                                    <th style={{ padding: '15px', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscribers.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>No subscribers yet.</td>
                                    </tr>
                                ) : (
                                    subscribers.map(sub => (
                                        <tr key={sub._id} style={{ borderBottom: '1px solid var(--bg-light)', background: sub.status === 'blocked' ? 'rgba(239, 68, 68, 0.02)' : 'transparent' }}>
                                            <td style={{ padding: '15px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{ fontWeight: '600', color: sub.status === 'blocked' ? 'var(--text-muted)' : 'var(--text-main)' }}>{sub.email}</span>
                                                    {sub.status === 'blocked' && (
                                                        <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>Blocked</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td style={{ padding: '15px', color: 'var(--text-muted)' }}>{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                                            <td style={{ padding: '15px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                <button 
                                                    onClick={() => handleToggleBlockSubscriber(sub._id)} 
                                                    title={sub.status === 'blocked' ? 'Unblock User' : 'Block User'}
                                                    style={{ background: sub.status === 'blocked' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: sub.status === 'blocked' ? '#10B981' : '#F59E0B', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                                    <Ban size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteSubscriber(sub._id)} title="Delete Subscriber" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
                                                    <Trash size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : null}
                {activeTab === 'analytics' && (
                    <div style={{ padding: '0' }}>
                        {/* Key Metric Cards - same style as Posts tab stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                            {[
                                { label: 'Total Views', value: posts.reduce((a, p) => a + (p.views || 0), 0), icon: <BarChart color="#FF5A5F" />, trend: 'All Posts' },
                                { label: 'Total Posts', value: posts.length, icon: <FileText color="#FF5A5F" />, trend: 'Published' },
                                { label: 'Subscribers', value: subscribers.filter(s => s.status !== 'blocked').length, icon: <Mail color="#FF5A5F" />, trend: 'Active' },
                                { label: 'Comments', value: comments.length, icon: <MessageSquare color="#FF5A5F" />, trend: 'Total' },
                            ].map(stat => (
                                <div key={stat.label} style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>{stat.label}</span>
                                        {stat.icon}
                                    </div>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.value}</h2>
                                    <p style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700' }}>{stat.trend}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            {/* Top Posts Table */}
                            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                                <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <BarChart size={20} color="var(--primary)" /> Top Posts by Views
                                </h3>
                                {posts.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No posts yet.</p>
                                ) : (
                                    [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 6).map((post, i) => {
                                        const maxViews = Math.max(...posts.map(p => p.views || 0), 1);
                                        return (
                                            <div key={post._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--bg-light)' }}>
                                                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: i < 3 ? 'var(--primary)' : 'var(--bg-light)', color: i < 3 ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800', flexShrink: 0 }}>{i + 1}</span>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</p>
                                                    <div style={{ height: '6px', borderRadius: '10px', background: 'var(--bg-light)', overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', width: `${((post.views || 0) / maxViews) * 100}%`, background: 'var(--primary)', borderRadius: '10px' }} />
                                                    </div>
                                                </div>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)', flexShrink: 0 }}>{(post.views || 0).toLocaleString()}</span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Posts by Category */}
                            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                                <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Plus size={20} color="var(--primary)" /> Posts by Category
                                </h3>
                                {categories.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No categories yet.</p>
                                ) : (
                                    categories.map((cat, i) => {
                                        const count = posts.filter(p => p.category === cat.name).length;
                                        const pct = posts.length > 0 ? Math.round((count / posts.length) * 100) : 0;
                                        const colors = ['#5A81FA','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899'];
                                        const col = colors[i % colors.length];
                                        return (
                                            <div key={cat._id} style={{ marginBottom: '1.4rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{cat.name}</span>
                                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: col }}>{count} posts ({pct}%)</span>
                                                </div>
                                                <div style={{ height: '8px', borderRadius: '10px', background: 'var(--bg-light)', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${pct}%`, background: col, borderRadius: '10px' }} />
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Clock size={20} color="var(--primary)" /> Recent Activity
                            </h3>
                            <div>
                                {[
                                    ...posts.slice(0, 4).map(p => ({ label: `Post published: "${p.title}"`, date: p.createdAt, color: '#5A81FA', icon: 'post' })),
                                    ...comments.slice(0, 4).map(c => ({ label: `Comment from ${c.name || 'Anonymous'}`, date: c.createdAt, color: '#10B981', icon: 'comment' })),
                                    ...subscribers.slice(0, 4).map(s => ({ label: `New subscriber: ${s.email}`, date: s.subscribedAt, color: '#F59E0B', icon: 'sub' }))
                                ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '14px 0', borderBottom: '1px solid var(--bg-light)' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {item.icon === 'post' && <FileText size={15} color={item.color} />}
                                            {item.icon === 'comment' && <MessageSquare size={15} color={item.color} />}
                                            {item.icon === 'sub' && <Mail size={15} color={item.color} />}
                                        </div>
                                        <p style={{ fontWeight: '600', fontSize: '0.9rem', flex: 1, color: 'var(--text-main)' }}>{item.label}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flexShrink: 0 }}>{new Date(item.date).toLocaleString()}</p>
                                    </div>
                                ))}
                                {posts.length === 0 && comments.length === 0 && subscribers.length === 0 && (
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No activity yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Blog Info */}
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FileText size={20} color="var(--primary)" /> Blog Information
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Blog Name</label>
                                    <input type="text" value={settingsData.blogName} onChange={e => setSettingsData({...settingsData, blogName: e.target.value})} placeholder="Your blog name" style={{ width: '100%' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tagline</label>
                                    <input type="text" value={settingsData.blogTagline} onChange={e => setSettingsData({...settingsData, blogTagline: e.target.value})} placeholder="Short tagline" style={{ width: '100%' }} />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Admin Contact Email</label>
                                    <input type="email" value={settingsData.adminEmail} onChange={e => setSettingsData({...settingsData, adminEmail: e.target.value})} placeholder="admin@example.com" style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CheckCircle size={20} color="var(--primary)" /> Social Media Links
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                {[
                                    { key: 'whatsappLink', label: 'WhatsApp', placeholder: 'https://wa.me/...' },
                                    { key: 'facebookLink', label: 'Facebook', placeholder: 'https://facebook.com/...' },
                                    { key: 'youtubeLink', label: 'YouTube', placeholder: 'https://youtube.com/...' },
                                    { key: 'instagramLink', label: 'Instagram', placeholder: 'https://instagram.com/...' },
                                    { key: 'linkedinLink', label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
                                ].map(({ key, label, placeholder }) => (
                                    <div key={key}>
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</label>
                                        <input type="url" value={settingsData[key]} onChange={e => setSettingsData({...settingsData, [key]: e.target.value})} placeholder={placeholder} style={{ width: '100%' }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button
                            onClick={handleSaveSettings}
                                className="btn-primary"
                                style={{ padding: '14px 40px', fontSize: '0.95rem' }}
                            >
                                Save Settings
                            </button>
                            {settingsSaved && (
                                <span style={{ color: '#10B981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle size={18} /> Settings saved!
                                </span>
                            )}
                        </div>

                        {/* Danger Zone */}
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid rgba(239,68,68,0.3)' }}>
                            <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#EF4444' }}>
                                <Trash size={20} /> Danger Zone
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>These actions are irreversible. Please be careful.</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setConfirmState({
                                        isOpen: true,
                                        title: 'Clear All Comments?',
                                        message: 'This will permanently delete ALL comments from the database. This action cannot be undone.',
                                        type: 'danger',
                                        confirmText: 'Yes, Delete All',
                                        onConfirm: async () => {
                                            try {
                                                const token = localStorage.getItem('token');
                                                const commentIds = comments.map(c => c._id);
                                                await Promise.all(commentIds.map(id =>
                                                    axios.delete(`/api/comments/${id}`, {
                                                        headers: { Authorization: `Bearer ${token}` }
                                                    })
                                                ));
                                                fetchComments();
                                                setConfirmState(prev => ({
                                                    ...prev,
                                                    isOpen: true,
                                                    title: 'All Comments Deleted',
                                                    message: 'All comments have been permanently removed.',
                                                    type: 'success',
                                                    isAlert: true,
                                                    confirmText: 'OK',
                                                    onConfirm: () => setConfirmState(p => ({ ...p, isOpen: false }))
                                                }));
                                            } catch (err) {
                                                console.error('Error clearing comments:', err);
                                                setConfirmState(prev => ({ ...prev, isOpen: false }));
                                            }
                                        }
                                    })}
                                    style={{ padding: '12px 24px', background: 'rgba(239,68,68,0.08)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}
                                >
                                    Clear All Comments
                                </button>
                                <button
                                    onClick={() => setConfirmState({ isOpen: true, title: 'Log Out?', message: 'You will be signed out of the admin dashboard.', type: 'danger', confirmText: 'Log Out', onConfirm: handleLogout })}
                                    style={{ padding: '12px 24px', background: 'rgba(239,68,68,0.08)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Modal */}
                {showForm && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                        <div style={{ background: 'white', padding: '3.5rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                            <h2 style={{ fontSize: '2.2rem', marginBottom: '2.5rem', color: 'var(--text-main)', fontWeight: '800' }}>{isEditing ? 'Edit Blog Post' : 'Create New Post'}</h2>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }}>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>POST TITLE*</label>
                                        <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="Enter post title..." />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>CATEGORY*</label>
                                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                                            style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-light)', fontWeight: '600' }}>
                                            {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>SLUG*</label>
                                        <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required placeholder="e.g. how-to-design" />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>EXCERPT* (Short summary)</label>
                                        <textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} required rows="2" placeholder="Write a catchy summary..."></textarea>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>CONTENT* (Formatted text or HTML)</label>
                                        <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required rows="10" placeholder="Start writing your story..."></textarea>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>FEATURED IMAGE*</label>
                                        <div style={{ position: 'relative', border: '2px dashed var(--border-color)', borderRadius: '16px', padding: '40px', textAlign: 'center', background: 'var(--bg-light)', transition: 'all 0.3s' }}>
                                            <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer' }} />
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                                <PlusCircle size={32} color="var(--text-muted)" />
                                                <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '600' }}>
                                                    {image ? image.name : 'Click or Drag to Upload Post Image'}
                                                </span>
                                            </div>
                                        </div>

                                        {(image || (isEditing && posts.find(p => p._id === isEditing)?.image)) && (
                                            <div style={{ marginTop: '2rem' }}>
                                                <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>Image Preview:</p>
                                                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid var(--border-color)' }}>
                                                    <img 
                                                        src={image ? URL.createObjectURL(image) : posts.find(p => p._id === isEditing)?.image} 
                                                        alt="Preview" 
                                                        style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', display: 'block' }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} style={{ width: '20px', height: '20px', cursor: 'pointer' }} id="featured-check" />
                                        <label htmlFor="featured-check" style={{ fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}>MARK AS FEATURED</label>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
                                    <button type="submit" className="btn-primary" style={{ padding: '16px 50px', fontSize: '1rem' }}>{isEditing ? 'Update Post Now' : 'Publish Blog Post'}</button>
                                    <button type="button" onClick={() => setShowForm(false)} style={{ padding: '16px 50px', background: 'var(--bg-light)', border: '1px solid var(--border-color)', borderRadius: '30px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Go Back</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Confirm Modal */}
                <ConfirmModal 
                    isOpen={confirmState.isOpen}
                    onClose={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
                    onConfirm={confirmState.onConfirm}
                    title={confirmState.title}
                    message={confirmState.message}
                    type={confirmState.type}
                    isAlert={confirmState.isAlert}
                    confirmText={confirmState.confirmText}
                />
            </main>

            <style>{`
                .admin-nav-item { display: flex; align-items: center; gap: 15px; padding: 14px 20px; border-radius: 12px; cursor: pointer; color: #94A3B8; font-weight: 600; transition: all 0.3s; margin-bottom: 4px; }
                .admin-nav-item:hover { background: rgba(255, 255, 255, 0.05); color: white; }
                .admin-nav-item.active { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(90, 129, 250, 0.3); }
                .cat-badge-small { font-size: 0.75rem; padding: 6px 12px; background: rgba(90, 129, 250, 0.1); borderRadius: 30px; color: var(--primary); font-weight: 800; text-transform: uppercase; }
                input, textarea, select { padding: 14px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-light); font-family: inherit; font-size: 0.95rem; font-weight: 500; }
                input:focus, textarea:focus, select:focus { border-color: var(--primary); outline: none; background: white; box-shadow: 0 0 0 4px rgba(90, 129, 250, 0.1); }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
