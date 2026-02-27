import { X, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="search-modal-overlay">
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
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="modal-content"
          >
            <div className="modal-header">
              <div className="header-text">
                <h2>Search Articles</h2>
                <p>What are you looking for today?</p>
              </div>
              <button className="close-btn" onClick={onClose} aria-label="Close">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="search-form">
              <div className="input-wrapper">
                <Search className="search-icon" size={24} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your search here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              
              <div className="search-hints">
                <span>Popular Searches</span>
                <div className="hint-btns">
                  <button type="button" onClick={() => setQuery('Web Design')}>Web Design</button>
                  <button type="button" onClick={() => setQuery('UI/UX')}>UI/UX</button>
                  <button type="button" onClick={() => setQuery('WordPress')}>WordPress</button>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Search Now
              </button>
            </form>
          </motion.div>

          <style>{`
            .search-modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 9999;
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
              background: rgba(15, 23, 42, 0.7);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
            }
            .modal-content {
              position: relative;
              width: 100%;
              max-width: 580px;
              background: var(--bg-card);
              border-radius: 32px;
              padding: 3rem;
              box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.35);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 2.5rem;
            }
            .header-text h2 {
              font-size: 1.8rem;
              font-weight: 800;
              color: var(--text-main);
              margin: 0 0 5px 0;
            }
            .header-text p {
              font-size: 0.95rem;
              color: var(--text-muted);
              margin: 0;
              font-weight: 500;
            }
            .close-btn {
              background: var(--light-2);
              border: none;
              width: 45px;
              height: 45px;
              border-radius: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--text-muted);
              cursor: pointer;
              transition: all 0.3s;
            }
            .close-btn:hover {
              background: #ff4757;
              color: white;
              transform: rotate(90deg);
            }
            .input-wrapper {
              position: relative;
              display: flex;
              align-items: center;
              background: var(--bg-light);
              border-radius: 20px;
              padding: 0 1.5rem;
              border: 2px solid var(--border-color);
              transition: all 0.3s;
            }
            .input-wrapper:focus-within {
              border-color: var(--primary);
              background: var(--bg-card);
              box-shadow: 0 0 0 4px rgba(90, 129, 250, 0.1);
            }
            .search-icon {
              color: var(--primary);
              margin-right: 1.2rem;
            }
            .input-wrapper input {
              width: 100%;
              height: 65px;
              border: none;
              background: none;
              font-size: 1.2rem;
              font-weight: 600;
              color: var(--text-main);
              outline: none;
            }
            .input-wrapper input::placeholder {
              color: var(--text-muted);
              opacity: 0.6;
            }
            .search-hints {
              margin-top: 1.8rem;
            }
            .search-hints span {
              display: block;
              font-size: 0.85rem;
              color: var(--text-muted);
              font-weight: 700;
              margin-bottom: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .hint-btns {
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
            }
            .hint-btns button {
              background: var(--bg-light);
              border: 1px solid var(--border-color);
              padding: 8px 20px;
              border-radius: 12px;
              font-size: 0.85rem;
              font-weight: 600;
              color: var(--text-main);
              cursor: pointer;
              transition: all 0.2s;
            }
            .hint-btns button:hover {
              border-color: var(--primary);
              color: white;
              background: var(--primary);
              transform: translateY(-2px);
            }
            .submit-btn {
              width: 100%;
              height: 60px;
              background: var(--primary);
              color: white;
              border: none;
              border-radius: 20px;
              font-size: 1.1rem;
              font-weight: 800;
              margin-top: 2.5rem;
              cursor: pointer;
              transition: all 0.3s;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }
            .submit-btn:hover {
              transform: translateY(-3px);
              box-shadow: 0 15px 30px rgba(90, 129, 250, 0.3);
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
