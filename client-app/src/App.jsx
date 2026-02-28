import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Services from './pages/Services';
import Content from './pages/Content';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

const AdminRoute = ({ children }) => {
    const { token, loading } = useAuth();
    if (loading) return null;
    return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const { token, loading } = useAuth();
    if (loading) return null;
    // If user is already logged in, redirect to admin instead of showing login/forgot-password/etc.
    return token ? <Navigate to="/admin" /> : children;
};

function App() {
    console.log("App: Root component mounting");
    
    useEffect(() => {
        console.log("App: Main observer effect running");
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Persistent observer to handle dynamic content
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Function to observe currently available elements
        const observeNow = () => {
            const elements = document.querySelectorAll('.scroll-reveal');
            elements.forEach(el => observer.observe(el));
        };

        // Mutation observer to catch dynamically added content (like posts)
        const mutationObserver = new MutationObserver(() => {
            observeNow();
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });
        observeNow();

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

const AppContent = () => {
    const location = useLocation();
    console.log("AppContent: Current path is", location.pathname);
    
    return (
        <Routes>
            {/* Auth Routes - No Header/Footer */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
            <Route 
                path="/admin" 
                element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                } 
            />

            {/* Public Routes with Header/Footer */}
            <Route 
                path="/*" 
                element={
                    <>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/blog" element={<Home />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/post/:slug" element={<PostDetails />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/content" element={<Content />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                            <Route path="*" element={<HashRedirect />} />
                        </Routes>
                        <Footer />
                    </>
                } 
            />
        </Routes>
    );
};

// Helper to handle any edge cases
const HashRedirect = () => {
    return <Navigate to="/" replace />;
};

export default App;
