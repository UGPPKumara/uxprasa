import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import logo from '../assets/logo.png';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            return setError('Password must be at least 6 characters.');
        }
        if (password !== confirmPassword) {
            return setError('Passwords do not match.');
        }

        setLoading(true);
        try {
            await axios.post(`/api/auth/reset-password/${token}`, { password });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Reset link is invalid or has expired.');
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
                    {!success ? (
                        <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
                            Enter your <strong>new password</strong> below to reset your account access.
                        </p>
                    ) : (
                        <div style={{ marginTop: '1.5rem' }}>
                            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
                                <span style={{ color: '#10b981', fontWeight: '800' }}>Password Reset!</span> Your password has been updated successfully.
                                <br />
                                <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Redirecting to login...</span>
                            </p>
                        </div>
                    )}
                </div>

                {!success ? (
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label><Lock size={18} /> New Password</label>
                            <div className="input-field" style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ paddingRight: '48px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label><Lock size={18} /> Confirm Password</label>
                            <div className="input-field">
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="login-error">{error}</p>}

                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Resetting...' : <><span>Reset Password</span> <ArrowRight size={20} /></>}
                        </button>

                        <Link to="/login" className="back-to-login">
                            <ArrowLeft size={16} /> Back to Login
                        </Link>
                    </form>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <svg width="28" height="28" fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <Link to="/login" className="back-to-login" style={{ marginTop: '1rem' }}>
                            <ArrowLeft size={18} /> Go to Login
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
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }
                .login-card {
                    max-width: 480px;
                    width: 100%;
                    background: white;
                    padding: 4rem;
                    border-radius: 24px;
                    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02);
                    border: 1px solid #e2e8f0;
                }
                .login-header { text-align: center; margin-bottom: 3rem; }
                .login-logo { height: 35px; margin-bottom: 1rem; object-fit: contain; }
                .login-form { display: flex; flex-direction: column; gap: 1.8rem; }
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
                    box-sizing: border-box;
                }
                .input-field input:focus {
                    border-color: #5a81fa;
                    background: white;
                    box-shadow: 0 0 0 4px rgba(90,129,250,0.1);
                    outline: none;
                }
                .login-error { color: #ef4444; font-weight: 700; font-size: 0.9rem; text-align: center; }
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
                    box-shadow: 0 10px 15px -3px rgba(90,129,250,0.4);
                    width: 100%;
                }
                .login-btn:hover:not(:disabled) {
                    background: #4a6ee0;
                    transform: translateY(-2px);
                    box-shadow: 0 15px 20px -5px rgba(90,129,250,0.5);
                }
                .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
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
                .back-to-login:hover { color: #1e293b; }
            `}</style>
        </div>
    );
};

export default ResetPassword;
