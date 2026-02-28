import { motion } from 'framer-motion';
import { Facebook, Youtube } from 'lucide-react';

const Content = () => {
    return (
        <main className="container content-page" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Social <span style={{ color: 'var(--primary)' }}>Hub</span></h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                    අපගේ සියලුම සමාජ මාධ්‍ය ජාලයන් සමඟ සම්බන්ධ වන්න. අපගේ නවතම TikTok වීඩියෝ නරඹන්න සහ අපගේ නවතම තොරතුරු සමඟ සැමවිටම යාවත්කාලීන වන්න.
                </p>
            </motion.div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr', 
                gap: '6rem', 
                maxWidth: '100%', 
                margin: '0 auto' 
            }}>
                {/* TikTok Row */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ 
                        background: 'var(--bg-card)', 
                        padding: '2.5rem', 
                        borderRadius: '40px', 
                        boxShadow: 'var(--shadow-md)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                        <div style={{ width: '45px', height: '45px', background: '#000', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>TikTok Feed</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>@uxprasa</p>
                        </div>
                    </div>

                    <div className="tiktok-container" style={{ width: '100%', height: '700px', borderRadius: '24px', overflow: 'hidden', background: '#f8f9fa', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <iframe 
                            src="https://www.tiktok.com/embed/@uxprasa" 
                            className="tiktok-iframe"
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                border: 'none',
                                transform: 'scale(1.4)',
                                transformOrigin: 'top center'
                            }}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; accelerometer; gyroscope; display-capture"
                            allowFullScreen
                            title="TikTok Feed"
                        ></iframe>
                    </div>
                </motion.div>

                {/* Section Title for Other Channels */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '-2rem' }}
                >
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '800' }}>අපගේ <span style={{ color: '#FF0000' }}>අනෙකුත්</span> YouTube නාලිකා</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>විවිධ අංශයන් ඔස්සේ ඔබව දැනුවත් කරන අපගේ අනෙකුත් YouTube නාලිකා සමඟද එක්වන්න.</p>
                </motion.div>

                {/* The Toon Zoo TV YouTube */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ 
                        background: 'var(--bg-card)', 
                        padding: '2.5rem', 
                        borderRadius: '40px', 
                        boxShadow: 'var(--shadow-md)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                        <div style={{ width: '45px', height: '45px', background: '#FF0000', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Youtube size={22} fill="currentColor" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>Toon Zoo TV</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>@TheToonZooTV</p>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '300px', borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(135deg, #FF0000 0%, #B90000 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', border: 'none', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.2)' }}>
                         <div style={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.1 }}>
                            <Youtube size={150} color="white" />
                         </div>
                         <div style={{ zIndex: 1, textAlign: 'center', padding: '2rem' }}>
                             <div style={{ background: 'white', display: 'inline-flex', padding: '10px 20px', borderRadius: '50px', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                 <Youtube size={18} color="#FF0000" fill="#FF0000" />
                                 <span style={{ color: '#FF0000', fontWeight: '800', fontSize: '0.9rem' }}>OFFICIAL CHANNEL</span>
                             </div>
                             <h4 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.8rem' }}>Toon Zoo TV</h4>
                             <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginBottom: '1.8rem', maxWidth: '400px', margin: '0 auto 1.8rem' }}>ළමයින් වෙනුවෙන් නිර්මාණය වූ අපගේ විනෝදජනක සහ අධ්‍යාපනික කාටූන් නාලිකාව.</p>
                             <a href="https://www.youtube.com/@TheToonZooTV" target="_blank" rel="noreferrer" style={{ background: 'white', color: '#B90000', padding: '12px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                 Channel එකට යන්න
                             </a>
                         </div>
                    </div>
                </motion.div>

                {/* Pop In Tech Studio YouTube */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ 
                        background: 'var(--bg-card)', 
                        padding: '2.5rem', 
                        borderRadius: '40px', 
                        boxShadow: 'var(--shadow-md)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                        <div style={{ width: '45px', height: '45px', background: '#FF0000', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Youtube size={22} fill="currentColor" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>Pop In Tech Studio</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>@popintechstudio0</p>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '300px', borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', border: 'none', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' }}>
                         <div style={{ position: 'absolute', bottom: '10%', left: '10%', opacity: 0.1 }}>
                            <Youtube size={150} color="white" />
                         </div>
                         <div style={{ zIndex: 1, textAlign: 'center', padding: '2rem' }}>
                             <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'inline-flex', padding: '10px 20px', borderRadius: '50px', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', backdropFilter: 'blur(10px)' }}>
                                 <Youtube size={18} color="#FF0000" fill="#FF0000" />
                                 <span style={{ color: 'white', fontWeight: '800', fontSize: '0.9rem' }}>TECH & TUTORIALS</span>
                             </div>
                             <h4 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.8rem' }}>Pop In Tech Studio</h4>
                             <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', marginBottom: '1.8rem', maxWidth: '400px', margin: '0 auto 1.8rem' }}>නවීන තාක්ෂණය සහ ඇප් නිර්මාණය පිළිබඳ ඔබව දැනුවත් කරන අපගේ තාක්ෂණික නාලිකාව.</p>
                             <a href="https://www.youtube.com/@popintechstudio0" target="_blank" rel="noreferrer" style={{ background: '#FF0000', color: 'white', padding: '12px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(255,0,0,0.3)' }}>
                                 Channel එකට යන්න
                             </a>
                         </div>
                    </div>
                </motion.div>

            </div>

            {/* Other Channels CTA - Refined with Blue Gradient */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ 
                    marginTop: '8rem', 
                    padding: '5rem 3rem', 
                    background: 'linear-gradient(135deg, var(--primary) 0%, #2C3D8F 100%)', 
                    borderRadius: '48px', 
                    textAlign: 'center',
                    color: 'white',
                    boxShadow: '0 20px 40px rgba(90, 129, 250, 0.2)' 
                }}
            >
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'white' }}>Never miss an update</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '3rem', fontSize: '1.1rem' }}>Find us on other platforms for specialized content.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <a href="https://www.facebook.com/people/UX-prasa/61587203784505/" target="_blank" rel="noreferrer" className="btn-pill-white">
                        <Facebook size={24} /> Facebook
                    </a>
                    <a href="https://whatsapp.com/channel/0029Vb8JBr06LwHec2lewr43" target="_blank" rel="noreferrer" className="btn-pill-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 2l-2.6 7.4Z" />
                        </svg> 
                        WhatsApp Channel
                    </a>
                </div>
            </motion.div>

            <style>{`
                .btn-pill-white {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 15px 40px;
                    background: white;
                    border: none;
                    border-radius: 50px;
                    color: var(--primary);
                    font-weight: 700;
                    font-size: 1.1rem;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                .btn-pill-white:hover {
                    background: var(--light-2);
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
                }
                @media (max-width: 768px) {
                    .content-page {
                        padding-top: 5.5rem !important;
                    }
                    .tiktok-container {
                        height: 420px !important;
                        border-radius: 16px !important;
                    }
                    .tiktok-iframe {
                        transform: scale(1) !important;
                    }
                }
                @media (max-width: 480px) {
                    .content-page {
                        padding-top: 5rem !important;
                    }
                    .tiktok-container {
                        height: 340px !important;
                    }
                }
            `}</style>
        </main>
    );
};

export default Content;
