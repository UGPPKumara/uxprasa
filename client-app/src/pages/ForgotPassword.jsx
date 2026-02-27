import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import api from '../api';
import logo from '../assets/logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/api/auth/forgot-password', { email });
            setSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <Link to="/" className="back-to-site">
                <ArrowLeft size={18} /> Back to Website
            </Link>
            <div className="login-card">
                <div className="login-header">
                    <img src={logo} alt="uxprasa" className="login-logo" />
                    {!submitted ? (
                        <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
                            Enter your email and we'll send you instructions to Reset your Password.
                        </p>
                    ) : (
                        <div style={{ marginTop: '1.5rem' }}>
                            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
                                <span style={{ color: '#10b981', fontWeight: '800' }}>Check Your Email.</span> We've sent a password reset link to
                                <br />
                                <strong style={{ color: '#1e293b', display: 'inline-block', marginTop: '0.5rem' }}>{email}</strong>
                            </p>
                        </div>
                    )}
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label><Mail size={18} /> Email Address</label>
                            <div className="input-field">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        
                        {error && <p className="login-error">{error}</p>}
                        
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Sending...' : <><span>Send Reset Link</span> <ArrowRight size={20} /></>}
                        </button>

                        <Link to="/login" className="back-to-login">
                            <ArrowLeft size={16} /> Back to Login
                        </Link>
                    </form>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <p style={{ color: '#64748b', marginBottom: '3rem', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            Didn't receive the email? Check your spam folder or try again with a different email address.
                        </p>
                        <button 
                            onClick={() => setSubmitted(false)} 
                            className="login-btn"
                            style={{ width: 'fit-content', margin: '1rem auto 0', paddingLeft: '40px', paddingRight: '40px' }}
                        >
                            Try Another Email
                        </button>
                        <Link to="/login" className="back-to-login" style={{ marginTop: '2.5rem' }}>
                            <ArrowLeft size={18} /> Back to Login
                        </Link>
                    </div>
                )}
            </div>

            <style>{`
                .login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f8fafc;
                    background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
                    background-size: 30px 30px;
                    padding: 2rem;
                    position: relative;
                }
                .back-to-site {
                    position: absolute;
                    top: 2rem;
                    left: 2.5rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #64748b;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1rem;
                    transition: all 0.2s;
                    padding: 10px 20px;
                    border-radius: 50px;
                    border: 1px solid transparent;
                }
                .back-to-site:hover {
                    color: #1e293b;
                    background: white;
                    border-color: #e2e8f0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }
                .login-card {
                    max-width: 480px;
                    width: 100%;
                    background: white;
                    padding: 4rem;
                    border-radius: 24px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
                    border: 1px solid #e2e8f0;
                }
                .login-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                .login-logo {
                    height: 35px;
                    margin-bottom: 1rem;
                    object-fit: contain;
                }
                .login-header p {
                    color: #64748b;
                    font-size: 1.05rem;
                }
                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.8rem;
                }
                .input-group label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 700;
                    margin-bottom: 0.8rem;
                    color: #334155;
                    font-size: 0.95rem;
                }
                .input-field input {
                    width: 100%;
                    padding: 14px 20px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    background: #f8fafc;
                    font-size: 1rem;
                    transition: all 0.2s;
                    color: #1e293b;
                }
                .input-field input:focus {
                    border-color: #5a81fa;
                    background: white;
                    box-shadow: 0 0 0 4px rgba(90, 129, 250, 0.1);
                    outline: none;
                }
                .login-error {
                    color: #ef4444;
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-align: center;
                }
                .login-btn {
                    margin-top: 1rem;
                    background: #5a81fa;
                    color: white;
                    padding: 16px;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 15px -3px rgba(90, 129, 250, 0.4);
                }
                .login-btn:hover {
                    background: #4a6ee0;
                    transform: translateY(-2px);
                    box-shadow: 0 15px 20px -5px rgba(90, 129, 250, 0.5);
                }
                .back-to-login {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    color: #64748b;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.95rem;
                    transition: color 0.2s;
                    margin-top: 1rem;
                }
                .back-to-login:hover {
                    color: #1e293b;
                }
            `}</style>
        </div>
    );
};

export default ForgotPassword;
