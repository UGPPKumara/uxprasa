import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';

const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = "Okay", 
    cancelText = "Cancel", 
    type = "danger", // danger, success, info
    isAlert = false 
}) => {
    const getIcon = () => {
        switch(type) {
            case 'success': return <CheckCircle size={32} />;
            case 'info': return <Info size={32} />;
            default: return <AlertTriangle size={32} />;
        }
    };

    const getColors = () => {
        switch(type) {
            case 'success': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', shadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4)' };
            case 'info': return { bg: 'rgba(90, 129, 250, 0.1)', text: 'var(--primary)', shadow: '0 10px 15px -3px rgba(90, 129, 250, 0.4)' };
            default: return { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', shadow: '0 10px 15px -3px rgba(239, 68, 68, 0.4)' };
        }
    };

    const colors = getColors();

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}
                    />
                    
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{ 
                            position: 'relative', 
                            background: 'white', 
                            padding: '3rem 2.5rem', 
                            borderRadius: '28px', 
                            width: '100%', 
                            maxWidth: '420px', 
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                            textAlign: 'center'
                        }}
                    >
                        <button 
                            onClick={onClose}
                            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '5px' }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ 
                            width: '72px', 
                            height: '72px', 
                            borderRadius: '50%', 
                            background: colors.bg, 
                            color: colors.text, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            margin: '0 auto 2rem',
                            boxShadow: `0 0 20px ${colors.bg}`
                        }}>
                            {getIcon()}
                        </div>

                        <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1rem', color: '#0F172A', letterSpacing: '-0.5px' }}>{title}</h3>
                        <p style={{ color: '#64748B', lineHeight: '1.7', marginBottom: '2.5rem', fontSize: '1.05rem', fontWeight: '500' }}>{message}</p>

                        <div style={{ display: 'grid', gridTemplateColumns: isAlert ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                            {!isAlert && (
                                <button 
                                    onClick={onClose}
                                    style={{ 
                                        padding: '14px', 
                                        borderRadius: '14px', 
                                        background: '#F1F5F9', 
                                        color: '#475569', 
                                        fontWeight: '700', 
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        fontSize: '0.95rem'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = '#E2E8F0'}
                                    onMouseOut={(e) => e.currentTarget.style.background = '#F1F5F9'}
                                >
                                    {cancelText}
                                </button>
                            )}
                            <button 
                                onClick={onConfirm || onClose}
                                style={{ 
                                    padding: '14px', 
                                    borderRadius: '14px', 
                                    background: colors.text, 
                                    color: 'white', 
                                    fontWeight: '700', 
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: colors.shadow,
                                    transition: 'all 0.2s',
                                    fontSize: '0.95rem'
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 20px -3px ${colors.bg}`; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = colors.shadow; }}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
