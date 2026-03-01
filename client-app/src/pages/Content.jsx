import { motion } from 'framer-motion';
import { Facebook, Youtube } from 'lucide-react';

const Content = () => {
    return (
        <main className="container content-page">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="content-header"
            >
                <h1 className="main-title">Social <span style={{ color: 'var(--primary)' }}>Hub</span></h1>
                <p className="main-desc">
                    අපගේ සියලුම සමාජ මාධ්‍ය ජාලයන් සමඟ සම්බන්ධ වන්න. අපගේ නවතම TikTok වීඩියෝ නරඹන්න සහ අපගේ නවතම තොරතුරු සමඟ සැමවිටම යාවත්කාලීන වන්න.
                </p>
            </motion.div>

            <div className="content-grid-wrapper">
                {/* TikTok Row */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="tiktok-card"
                >
                    <div className="card-header">
                        <div className="tiktok-icon-box">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </div>
                        <div className="header-text">
                            <h3>TikTok Feed</h3>
                            <p>@uxprasa</p>
                        </div>
                    </div>

                    <div className="tiktok-iframe-container">
                        <iframe 
                            src="https://www.tiktok.com/embed/@uxprasa" 
                            className="tiktok-iframe"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; accelerometer; gyroscope; display-capture"
                            allowFullScreen
                            title="TikTok Feed"
                        ></iframe>
                    </div>
                </motion.div>

                {/* YouTube Channels Section */}
                <div className="youtube-section">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="section-intro"
                    >
                        <h2>අපගේ <span style={{ color: '#FF0000' }}>අනෙකුත්</span> YouTube නාලිකා</h2>
                        <p>විවිධ අංශයන් ඔස්සේ ඔබව දැනුවත් කරන අපගේ අනෙකුත් YouTube නාලිකා සමඟද එක්වන්න.</p>
                    </motion.div>

                    <div className="yt-cards-container">
                        {/* The Toon Zoo TV YouTube */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="youtube-card"
                        >
                            <div className="yt-card-header">
                                <div className="yt-icon-box toon-bg">
                                    <Youtube size={22} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="yt-card-title">Toon Zoo TV</h3>
                                    <p className="yt-card-handle">@TheToonZooTV</p>
                                </div>
                            </div>

                            <div className="yt-banner-area toon-zoo-banner">
                                <div className="yt-banner-bg-icon">
                                    <Youtube size={150} color="white" />
                                </div>
                                <div className="yt-banner-content">
                                    <div className="yt-tag-pill">
                                        <Youtube size={18} color="#FF0000" fill="#FF0000" />
                                        <span>OFFICIAL CHANNEL</span>
                                    </div>
                                    <h4 className="yt-banner-title">Toon Zoo TV</h4>
                                    <p className="yt-banner-text">ළමයින් වෙනුවෙන් නිර්මාණය වූ අපගේ විනෝදජනක සහ අධ්‍යාපනික කාටූන් නාලිකාව.</p>
                                    <a href="https://www.youtube.com/@TheToonZooTV" target="_blank" rel="noreferrer" className="yt-banner-btn">
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
                            className="youtube-card"
                        >
                            <div className="yt-card-header">
                                <div className="yt-icon-box tech-bg">
                                    <Youtube size={22} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="yt-card-title">Pop In Tech Studio</h3>
                                    <p className="yt-card-handle">@popintechstudio0</p>
                                </div>
                            </div>

                            <div className="yt-banner-area tech-studio-banner">
                                <div className="yt-banner-bg-icon tech-bg-icon">
                                    <Youtube size={150} color="white" />
                                </div>
                                <div className="yt-banner-content">
                                    <div className="yt-tag-pill dark">
                                        <Youtube size={18} color="#FF0000" fill="#FF0000" />
                                        <span>TECH & TUTORIALS</span>
                                    </div>
                                    <h4 className="yt-banner-title">Pop In Tech Studio</h4>
                                    <p className="yt-banner-text tech-text">නවීන තාක්ෂණය සහ ඇප් නිර්මාණය පිළිබඳ ඔබව දැනුවත් කරන අපගේ තාක්ෂණික නාලිකාව.</p>
                                    <a href="https://www.youtube.com/@popintechstudio0" target="_blank" rel="noreferrer" className="yt-banner-btn tech-btn">
                                        Channel එකට යන්න
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="social-cta-box"
            >
                <h2>Never miss an update</h2>
                <p>Find us on other platforms for specialized content.</p>
                <div className="social-cta-buttons">
                    <a href="https://www.facebook.com/people/UX-prasa/61587203784505/" target="_blank" rel="noreferrer" className="sc-btn facebook">
                        <Facebook size={24} /> Facebook
                    </a>
                    <a href="https://whatsapp.com/channel/0029Vb8JBr06LwHec2lewr43" target="_blank" rel="noreferrer" className="sc-btn whatsapp">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 2l-2.6 7.4Z" />
                        </svg> 
                        WhatsApp Channel
                    </a>
                </div>
            </motion.div>

            <style>{`
                .content-page {
                    padding-top: 10rem;
                    padding-bottom: 6rem;
                }
                .content-header {
                    text-align: center;
                    margin-bottom: 5rem;
                }
                .main-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                }
                .main-desc {
                    font-size: 1.2rem;
                    color: var(--text-muted);
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.7;
                }

                .content-grid-wrapper {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 6rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .tiktok-card {
                    background: var(--bg-card);
                    padding: 2.5rem;
                    border-radius: 40px;
                    box-shadow: var(--shadow-md);
                    border: 1px solid var(--border-color);
                }
                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 2.5rem;
                }
                .tiktok-icon-box {
                    width: 48px;
                    height: 48px;
                    background: #000;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                .header-text h3 { font-size: 1.6rem; font-weight: 800; margin: 0; }
                .header-text p { color: var(--text-muted); font-size: 1.1rem; margin: 0; }

                .tiktok-iframe-container {
                    width: 100%;
                    height: 800px;
                    border-radius: 24px;
                    overflow: hidden;
                    background: #000;
                    position: relative;
                }
                .tiktok-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    transform: scale(1.3);
                    transform-origin: top center;
                }

                .youtube-section {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4rem;
                }
                .section-intro {
                    text-align: center;
                }
                .section-intro h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
                .section-intro p { color: var(--text-muted); font-size: 1.1rem; }

                .yt-cards-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                    gap: 3rem;
                }

                .youtube-card {
                    background: var(--bg-card);
                    padding: 2.5rem;
                    border-radius: 40px;
                    box-shadow: var(--shadow-md);
                    border: 1px solid var(--border-color);
                    transition: all 0.3s ease;
                }
                .yt-card-header { display: flex; align-items: center; gap: 15px; margin-bottom: 2rem; }
                .yt-icon-box { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; }
                .toon-bg { background: #FF0000; }
                .tech-bg { background: #333; }
                .yt-card-title { font-size: 1.5rem; font-weight: 800; margin: 0; }
                .yt-card-handle { color: var(--text-muted); font-size: 1rem; margin: 0; }

                .yt-banner-area {
                    width: 100%;
                    height: 380px;
                    border-radius: 24px;
                    overflow: hidden;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .toon-zoo-banner { background: linear-gradient(135deg, #FF0000 0%, #B90000 100%); }
                .tech-studio-banner { background: linear-gradient(135deg, #1A1A1A 0%, #333333 100%); }
                .yt-banner-bg-icon { position: absolute; top: 10%; right: 10%; opacity: 0.1; }
                .tech-bg-icon { bottom: 10%; left: 10%; top: auto; right: auto; }
                
                .yt-banner-content { z-index: 1; text-align: center; padding: 2rem; }
                .yt-tag-pill { background: white; padding: 10px 20px; border-radius: 50px; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 1.5rem; }
                .yt-tag-pill span { color: #FF0000; font-weight: 800; font-size: 0.85rem; }
                .yt-tag-pill.dark { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(10px); }
                .yt-tag-pill.dark span { color: white; }
                
                .yt-banner-title { color: white; font-size: 1.8rem; font-weight: 800; margin-bottom: 1rem; }
                .yt-banner-text { color: rgba(255,255,255,0.9); font-size: 1rem; margin-bottom: 2rem; line-height: 1.6; max-width: 320px; margin-left: auto; margin-right: auto; }
                .tech-text { color: rgba(255,255,255,0.7); }
                
                .yt-banner-btn { background: white; color: #B90000; padding: 14px 35px; border-radius: 50px; font-weight: 800; text-decoration: none; transition: all 0.3s; box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
                .yt-banner-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
                .tech-btn { background: #FF0000; color: white; }

                .social-cta-box {
                    margin-top: 8rem;
                    padding: 6rem 3rem;
                    background: linear-gradient(135deg, var(--primary) 0%, #2C3D8F 100%);
                    border-radius: 48px;
                    text-align: center;
                    color: white;
                    box-shadow: 0 20px 40px rgba(90, 129, 250, 0.2);
                }
                .social-cta-box h2 { font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; color: white; }
                .social-cta-box p { font-size: 1.25rem; opacity: 0.9; margin-bottom: 3.5rem; }
                .social-cta-buttons { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
                
                .sc-btn { display: flex; align-items: center; gap: 12px; padding: 18px 45px; background: white; border-radius: 50px; color: var(--primary); font-weight: 700; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
                .sc-btn:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }

                @media (max-width: 1024px) {
                    .yt-cards-container { grid-template-columns: 1fr; }
                }

                @media (max-width: 768px) {
                    .content-page { padding-top: 9rem; }
                    .main-title { font-size: 2.8rem; }
                    .tiktok-card, .youtube-card { padding: 1.5rem; border-radius: 30px; }
                    .tiktok-iframe-container { height: 600px; }
                    .tiktok-iframe { transform: scale(1.1); }
                    .yt-banner-area { height: 420px; }
                    .social-cta-box { padding: 4rem 2rem; border-radius: 32px; }
                    .social-cta-box h2 { font-size: 2rem; margin-bottom: 1rem; }
                    .social-cta-box p { font-size: 1rem; margin-bottom: 2.5rem; }
                    .social-cta-buttons { flex-direction: column; width: 100%; max-width: 320px; margin: 0 auto; gap: 12px; }
                    .sc-btn { width: 100%; justify-content: center; padding: 14px 20px; font-size: 1rem; }
                }

                @media (max-width: 480px) {
                    .content-page { padding-top: 8rem; }
                    .main-title { font-size: 2.4rem; }
                    .section-intro h2 { font-size: 1.8rem; }
                    .tiktok-iframe-container { height: 500px; }
                    .tiktok-iframe { transform: scale(1); }
                    .yt-banner-title { font-size: 1.5rem; }
                    .yt-banner-text { font-size: 0.9rem; }
                }
            `}</style>
        </main>
    );
};

export default Content;
