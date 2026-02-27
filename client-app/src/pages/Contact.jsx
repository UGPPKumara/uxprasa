import { Mail, Phone, MapPin, Facebook, Twitter, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import api from '../api';
import bannerContact from '../assets/banner-contact.jpeg';
import ConfirmModal from '../components/ConfirmModal';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ loading: false, type: '', msg: '' });
    const [confirmState, setConfirmState] = useState({ isOpen: false, title: '', message: '', type: 'success', isAlert: true });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, type: '', msg: '' });

        try {
            const response = await api.post('/api/contact/send', formData);
            setStatus({ 
                loading: false, 
                type: 'success', 
                msg: '' 
            });
            setConfirmState({
                isOpen: true,
                title: 'පණිවිඩය ලැබුණා!',
                message: 'ඔබේ පණිවිඩය සාර්ථකව ලැබුණා. ඉක්මනින් මම ඔබව සම්බන්ධ කරගන්නම්.',
                type: 'success',
                isAlert: true
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Contact error:', error);
            setStatus({ 
                loading: false, 
                type: 'error', 
                msg: '' 
            });
            setConfirmState({
                isOpen: true,
                title: 'ගැටලුවක් මතු වුණා',
                message: 'පණිවිඩය යැවීමේදී ගැටලුවක් මතු වුණා. කරුණාකර නැවත උත්සාහ කරන්න.',
                type: 'danger',
                isAlert: true
            });
        }
    };

    return (
        <main className="container contact-page">
            <section style={{ paddingTop: '8rem', paddingBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontWeight: '800' }}>Drop Us <span style={{ color: 'var(--primary)' }}>a Line</span></h1>
                
                <img src={bannerContact} 
                    alt="Contact Banner" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: '3rem' }} />

                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem', textAlign: 'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <div>
                            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>EMAIL ADDRESS</h3>
                            <a href="mailto:uxprasa@gmail.com" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)' }}>uxprasa@gmail.com</a>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PHONE NUMBER</h3>
                            <a href="tel:+94755111360" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)' }}>+94 75 511 1360</a>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>HOW TO FIND US</h3>
                            <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)' }}>Kandy, Sri Lanka</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SOCIAL</h3>
                            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1rem' }}>
                                <a href="https://whatsapp.com/channel/0029Vb8JBr06LwHec2lewr43" target="_blank" rel="noreferrer" className="social-icon-btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 2l-2.6 7.4Z" />
                                    </svg>
                                </a>
                                <a href="https://tiktok.com/@uxprasa" target="_blank" rel="noreferrer" className="social-icon-btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-card" style={{ background: 'var(--bg-card)', padding: '4rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Drop Us a Line</h2>
                        
                        {status.msg && (
                            <div style={{ 
                                padding: '15px 20px', 
                                borderRadius: '12px', 
                                marginBottom: '2rem',
                                background: status.type === 'success' ? '#D1FAE5' : '#FEE2E2',
                                color: status.type === 'success' ? '#065F46' : '#991B1B',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                border: `1px solid ${status.type === 'success' ? '#A7F3D0' : '#FECACA'}`
                            }}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div style={{ gridColumn: 'span 1' }}>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Name*</label>
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 1' }}>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>E-mail*</label>
                                <input 
                                    type="email" 
                                    placeholder="Your Email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Message*</label>
                                <textarea 
                                    placeholder="How can we help?" 
                                    rows="6" 
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <button 
                                    type="submit" 
                                    disabled={status.loading}
                                    className="btn-primary" 
                                    style={{ padding: '15px 40px', opacity: status.loading ? 0.7 : 1 }}
                                >
                                    {status.loading ? (
                                        <>Sending... <Loader2 size={18} className="animate-spin" style={{ marginLeft: '10px' }} /></>
                                    ) : (
                                        <>Submit Request <Send size={18} style={{ marginLeft: '10px' }} /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

             <style>{`
                .social-icon-btn { 
                    color: var(--text-muted); 
                    transition: all 0.3s ease; 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .social-icon-btn:hover { 
                    color: var(--primary); 
                    transform: translateY(-3px);
                }
                .contact-form-card { box-shadow: var(--shadow-sm); }

                @media (max-width: 768px) {
                    .contact-page section {
                        padding-top: 5.5rem !important;
                        padding-bottom: 2rem !important;
                    }
                    .contact-page h1 {
                        font-size: 2.2rem !important;
                    }
                    .contact-page img {
                        height: 200px !important;
                        border-radius: 16px !important;
                    }
                    .contact-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .contact-form-card {
                        padding: 2rem !important;
                        border-radius: 20px !important;
                    }
                    .contact-form {
                        grid-template-columns: 1fr !important;
                    }
                    .contact-form > div[style*="span 2"],
                    .contact-form > div {
                        grid-column: span 1 !important;
                    }
                }
                @media (max-width: 480px) {
                    .contact-page section {
                        padding-top: 5rem !important;
                    }
                    .contact-page h1 {
                        font-size: 1.8rem !important;
                    }
                    .contact-form-card {
                        padding: 1.5rem !important;
                    }
                }
            `}</style>
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
        </main>
    );
};

export default Contact;
