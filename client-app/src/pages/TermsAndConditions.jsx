import { motion } from 'framer-motion';

const TermsAndConditions = () => {
    return (
        <main className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center' }}>
                    Terms & <span style={{ color: 'var(--primary)' }}>Conditions</span>
                </h1>
                
                <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '32px', boxShadow: 'var(--shadow-md)', lineHeight: '1.8', color: 'var(--text-main)' }}>
                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>1. Acceptance of Terms</h2>
                        <p>By accessing and using this website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our website.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>2. Intellectual Property</h2>
                        <p>All content on this website, including articles, designs, logos, and other materials, is the property of UX prasa. Reproduction or unauthorized use of our content without prior written permission is strictly prohibited.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>3. Limitation of Liability</h2>
                        <p>The information provided on this website is for educational and informational purposes only. We are not liable for any losses or damages resulting from the use of information found on this platform.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>4. User Registration</h2>
                        <p>If you register for any services on our site, you are responsible for maintaining the confidentiality of your account information and ensuring that the details provided are accurate and up-to-date.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>5. Changes to Terms</h2>
                        <p>We reserve the right to modify these terms at any time. Any changes will be effective immediately upon being posted on this website. It is your responsibility to review these terms periodically.</p>
                    </section>
                </div>
            </motion.div>
        </main>
    );
};

export default TermsAndConditions;
