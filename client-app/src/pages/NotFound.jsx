import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <main style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '2rem',
            background: 'transparent',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '650px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 style={{ 
                        fontSize: '10rem', 
                        fontWeight: '900', 
                        lineHeight: '1', 
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #2C3D8F 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-5px'
                    }}>
                        404
                    </h1>
                    
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Oops! Page Not Found.
                    </h2>
                    
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '3.5rem' }}>
                        ඔබ සොයන පිටුව ඉවත් කර ඇත, එහි නම වෙනස් කර ඇත හෝ තාවකාලිකව ලබා ගත නොහැක. 
                        කරුණාකර නිවැරදි ලිපිනය පරීක්ෂා කරන්න හෝ මුල් පිටුවට යන්න.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/" className="btn-404-primary">
                            <Home size={20} /> Back to Home
                        </Link>
                        <button onClick={() => window.history.back()} className="btn-404-outline">
                            <ArrowLeft size={20} /> Go Back
                        </button>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .btn-404-primary {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 35px;
                    background: var(--primary);
                    color: white;
                    border-radius: 50px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.3s;
                    box-shadow: 0 10px 20px rgba(90, 129, 250, 0.2);
                }
                .btn-404-primary:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(90, 129, 250, 0.3);
                }
                .btn-404-outline {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 35px;
                    background: transparent;
                    color: var(--text-main);
                    border: 2px solid var(--border-color);
                    border-radius: 50px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-404-outline:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                    transform: translateY(-5px);
                }
            `}</style>
        </main>
    );
};

export default NotFound;
