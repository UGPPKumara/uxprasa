import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageModal = ({ isOpen, onClose }) => {
    const { language, setLanguage, t } = useLanguage();

    const languages = [
        { code: 'en', name: 'English', native: 'English', icon: '🇺🇸' },
        { code: 'si', name: 'Sinhala', native: 'සිංහල', icon: '🇱🇰' }
    ];

    const handleSelect = (code) => {
        setLanguage(code);
        setTimeout(onClose, 300); // Close after a short delay for feedback
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="language-modal-overlay">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="backdrop"
                        onClick={onClose}
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="lang-modal-content"
                    >
                        <div className="lang-modal-header">
                            <div className="title-section">
                                <Globe size={24} className="globe-icon" />
                                <div>
                                    <h3>{t('select_language')}</h3>
                                    <p>Choose your preferred language</p>
                                </div>
                            </div>
                            <button className="close-btn" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="lang-options">
                            {languages.map((lang) => (
                                <button 
                                    key={lang.code}
                                    className={`lang-option ${language === lang.code ? 'active' : ''}`}
                                    onClick={() => handleSelect(lang.code)}
                                >
                                    <span className="lang-flag">{lang.icon}</span>
                                    <div className="lang-info">
                                        <span className="lang-native">{lang.native}</span>
                                        <span className="lang-name">{lang.name}</span>
                                    </div>
                                    {language === lang.code && (
                                        <div className="check-icon">
                                            <Check size={18} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <p className="lang-footer">
                            Language changes will apply to all UI elements.
                        </p>
                    </motion.div>

                    <style>{`
                        .language-modal-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            z-index: 10000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 20px;
                        }
                        .backdrop {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(15, 23, 42, 0.6);
                            backdrop-filter: blur(8px);
                        }
                        .lang-modal-content {
                            position: relative;
                            width: 100%;
                            max-width: 400px;
                            background: var(--bg-card);
                            border-radius: 28px;
                            padding: 2rem;
                            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
                            border: 1px solid var(--border-color);
                        }
                        .lang-modal-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-start;
                            margin-bottom: 1.5rem;
                        }
                        .title-section {
                            display: flex;
                            gap: 15px;
                        }
                        .globe-icon {
                            color: var(--primary);
                            margin-top: 2px;
                        }
                        .title-section h3 {
                            font-size: 1.25rem;
                            font-weight: 800;
                            margin: 0;
                        }
                        .title-section p {
                            font-size: 0.85rem;
                            color: var(--text-muted);
                            margin: 2px 0 0 0;
                        }
                        .lang-options {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                        }
                        .lang-option {
                            display: flex;
                            align-items: center;
                            gap: 15px;
                            padding: 1rem;
                            border-radius: 16px;
                            background: var(--bg-light);
                            border: 2px solid transparent;
                            transition: all 0.2s;
                            text-align: left;
                            width: 100%;
                            cursor: pointer;
                        }
                        .lang-option:hover {
                            background: var(--light-2);
                            border-color: var(--primary);
                        }
                        .lang-option.active {
                            background: rgba(90, 129, 250, 0.1);
                            border-color: var(--primary);
                        }
                        .lang-flag {
                            font-size: 1.5rem;
                        }
                        .lang-info {
                            display: flex;
                            flex-direction: column;
                            flex: 1;
                        }
                        .lang-native {
                            font-weight: 700;
                            font-size: 1rem;
                            color: var(--text-main);
                        }
                        .lang-name {
                            font-size: 0.75rem;
                            color: var(--text-muted);
                            font-weight: 500;
                        }
                        .check-icon {
                            color: var(--primary);
                        }
                        .lang-footer {
                            text-align: center;
                            font-size: 0.75rem;
                            color: var(--text-muted);
                            margin-top: 1.5rem;
                            opacity: 0.8;
                        }
                        .close-btn {
                            background: var(--light-2);
                            border: none;
                            width: 36px;
                            height: 36px;
                            border-radius: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: var(--text-muted);
                            cursor: pointer;
                        }
                    `}</style>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LanguageModal;
