import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <main className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center' }}>
                    Privacy <span style={{ color: 'var(--primary)' }}>Policy</span>
                </h1>
                
                <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '32px', boxShadow: 'var(--shadow-md)', lineHeight: '1.8', color: 'var(--text-main)' }}>
                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>1. Introduction</h2>
                        <p>Welcome to <b>uxprasa</b>. We value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>2. Information We Collect</h2>
                        <p>We may collect the following information when you interact with our website:</p>
                        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Name and email address (when subscribing to our newsletter).</li>
                            <li>Contact information provided via the contact form.</li>
                            <li>Technical data such as cookies and website usage patterns.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>3. How We Use Your Information</h2>
                        <p>The information we collect is used for the following purposes:</p>
                        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>To respond to your inquiries and improve our services.</li>
                            <li>To send you updates, newsletters, and relevant content.</li>
                            <li>To ensure the security and proper functioning of our website.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>4. Data Protection</h2>
                        <p>We do not sell, trade, or otherwise transfer your personal information to third parties. All data is stored on secure servers with limited access to authorized personnel only.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary)' }}>5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please feel free to reach out to us through our <a href="/contact" style={{ color: 'var(--primary)', fontWeight: '600' }}>Contact Page</a>.</p>
                    </section>
                </div>
            </motion.div>
        </main>
    );
};

export default PrivacyPolicy;
