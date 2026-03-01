import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, LogIn, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/admin');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
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
                    <p>Enter your credentials to access the Admin Portal dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label><User size={18} /> Username</label>
                        <div className="input-field">
                            <input 
                                type="text" 
                                placeholder="Admin username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label><Lock size={18} /> Password</label>
                            <Link to="/forgot-password" title="Click to reset your password" style={{ textDecoration: 'none' }}>
                                <span className="forgot-link">Forgot password?</span>
                            </Link>
                        </div>
                        <div className="input-field password-field">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Admin password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    
                    {error && <p className="login-error">{error}</p>}
                    
                    <button type="submit" className="login-btn">
                        Sign In <ArrowRight size={20} />
                    </button>
                    
                    <p className="login-footer">
                        Note: This dashboard is for authorized administrators only.
                    </p>
                </form>
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
                    margin-bottom: 3.5rem;
                }
                .login-logo {
                    height: 35px;
                    margin-bottom: 2rem;
                    object-fit: contain;
                }
                .login-header h1 {
                    font-size: 2.2rem;
                    font-weight: 800;
                    margin-bottom: 0.8rem;
                    color: #1e293b;
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
                .password-field {
                    position: relative;
                }
                .toggle-password {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    padding: 0;
                }
                .toggle-password:hover {
                    color: #5a81fa;
                }
                .forgot-link {
                    font-size: 0.85rem;
                    color: #5a81fa;
                    font-weight: 700;
                    cursor: pointer;
                }
                .forgot-link:hover {
                    text-decoration: underline;
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
                .login-footer {
                    text-align: center;
                    color: #94a3b8;
                    font-size: 0.85rem;
                    margin-top: 1rem;
                    line-height: 1.5;
                }

                @media (max-width: 768px) {
                    .login-page { padding: 1.5rem; }
                    .login-card { padding: 3rem 2.5rem; }
                    .back-to-site { top: 1.5rem; left: 1.5rem; font-size: 0.9rem; padding: 8px 16px; }
                }

                @media (max-width: 480px) {
                    .login-page { padding: 1rem; align-items: flex-start; padding-top: 6rem; }
                    .login-card { padding: 2.5rem 1.5rem; border-radius: 20px; }
                    .login-header { margin-bottom: 2.5rem; }
                    .login-logo { height: 30px; margin-bottom: 1.5rem; }
                    .login-header p { font-size: 0.95rem; line-height: 1.5; }
                    .login-form { gap: 1.5rem; }
                    .login-btn { font-size: 1rem; padding: 14px; }
                    .back-to-site { top: 1rem; left: 1rem; font-size: 0.85rem; padding: 6px 12px; background: white; border-color: #e2e8f0; }
                }
            `}</style>
        </div>
    );
};

export default Login;
