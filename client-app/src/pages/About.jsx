import { Rocket, Palette, Code, Edit3, ArrowRight, Quote, Briefcase, MessageSquare, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import bannerAbout from '../assets/banner-about.jpeg';

const About = () => {
    return (
        <main className="container about-page">
            {/* Section 1: Hero */}
            <section className="about-hero">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="about-hero-title"
                >
                    The <span style={{ color: 'var(--primary)' }}>Story</span> Behind the Stories
                </motion.h1>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="about-banner-container"
                >
                    <img src={bannerAbout} 
                        alt="About Banner" className="about-banner-img" />
                    <div className="about-stats-overlay">
                        <div className="about-stat-card white">
                            <h2 className="about-stat-num">50+</h2>
                            <p className="about-stat-label">Projects</p>
                        </div>
                        <div className="about-stat-card primary">
                             <h2 className="about-stat-num">2+</h2>
                            <p className="about-stat-label">Years</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Section 2: My Story */}
            <section className="scroll-reveal" style={{ maxWidth: '1000px', margin: '0 auto 8rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '2rem', lineHeight: '1.4' }}>තාක්ෂණය <span style={{ color: 'var(--primary)' }}>සරලව</span> සහ ප්‍රායෝගිකව.</h2>
                </div>
                <div style={{ lineHeight: '2.1', fontSize: '1.35rem', color: 'var(--text-main)', textAlign: 'left' }}>
                    <p style={{ marginBottom: '2.5rem' }}>
                        මෘදුකාංග ඉංජිනේරුවරයෙකු ලෙස මම විශ්වාස කරන දෙයක් තියෙනවා; තාක්ෂණය කියන්නේ සංකීර්ණ දෙයක් නෙවෙයි, එය අපේ ජීවිත සහ ව්‍යාපාර පහසු කරන මෙවලමක්.
                    </p>
                    <p style={{ marginBottom: '2.5rem' }}>
                        මගේ වෘත්තීය ජීවිතය තුළ මම විවිධ ව්‍යාපාර සඳහා මෘදුකාංග විසඳුම් (Software Solutions) සහ වෙබ් අඩවි නිර්මාණය කරමින් ලබාගත් අත්දැකීම්, <b>uxprasa</b> බ්ලොග් අඩවිය හරහා බෙදාගැනීමට මම තීරණය කළා.
                    </p>
                    <p style={{ marginBottom: '1.5rem', fontWeight: '800', color: 'var(--black)' }}>මෙහි අරමුණ දෙකයි:</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', gap: '20px', marginBottom: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '8px' }}>
                                <Rocket size={28} />
                            </div>
                            <span style={{ fontWeight: '500' }}>ලංකාවේ ව්‍යාපාර නවීන තාක්ෂණය හරහා ඊළඟ මට්ටමට ගෙන ඒම.</span>
                        </li>
                        <li style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '8px' }}>
                                <Lightbulb size={28} />
                            </div>
                            <span style={{ fontWeight: '500' }}>IT ක්ෂේත්‍රයට එන්න බලාපොරොත්තු වෙන අලුත් අයට නිවැරදි මඟ පෙන්වීමක් සිංහල භාෂාවෙන් ලබා දීම.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section 3: What I Do */}
            <section className="scroll-reveal" style={{ marginBottom: '8rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800' }}>මගේ <span style={{ color: 'var(--primary)' }}>කාර්යභාරය</span></h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div className="about-card">
                        <div className="about-icon-box" style={{ background: 'rgba(90, 129, 250, 0.1)', color: 'var(--primary)' }}>
                            <Rocket size={32} />
                        </div>
                        <h3>Founder & Lead Developer (@Nuvoora)</h3>
                        <p>සුළු සහ මධ්‍යම පරිමාණ ව්‍යාපාර සඳහා නවීන මෘදුකාංග විසඳුම් (POS, Inventory Systems) සහ වෙබ් අඩවි නිර්මාණය කිරීම මෙහෙයවීම.</p>
                    </div>
                    <div className="about-card">
                        <div className="about-icon-box" style={{ background: 'rgba(255, 90, 95, 0.1)', color: '#FF5A5F' }}>
                            <Palette size={32} />
                        </div>
                        <h3>UI/UX Engineering</h3>
                        <p>පරිශීලකයාට (User) පහසුවෙන් හැසිරවිය හැකි, ආකර්ෂණීය ඩිජිටල් අත්දැකීම් නිර්මාණය කිරීම.</p>
                    </div>
                    <div className="about-card">
                        <div className="about-icon-box" style={{ background: 'rgba(15, 23, 42, 0.1)', color: '#0F172A' }}>
                            <Code size={32} />
                        </div>
                        <h3>Full Stack Development</h3>
                        <p>React, Next.js, WordPress සහ Node.js වැනි තාක්ෂණයන් යොදා ගනිමින් කාර්යක්ෂම පද්ධති ගොඩනැගීම.</p>
                    </div>
                    <div className="about-card">
                        <div className="about-icon-box" style={{ background: 'rgba(56, 176, 0, 0.1)', color: '#38B000' }}>
                            <Edit3 size={32} />
                        </div>
                        <h3>Tech Blogging</h3>
                        <p>සංකීර්ණ තාක්ෂණික දැනුම සරලව සමාජගත කිරීම අරමුණු කරගත් ලිපි සහ දැනුම බෙදාහදා ගැනීම.</p>
                    </div>
                </div>
            </section>

            {/* Section 4: My Vision */}
            <section className="scroll-reveal about-vision-section">
                <div className="about-vision-card">
                    <Quote className="about-quote-icon" />
                    <p className="about-vision-text">
                        "මගේ ඉලක්කය වන්නේ ශ්‍රී ලංකාවේ ඩිජිටල් අවකාශය (Digital Space) තුළ ගුණාත්මක සහ ජාත්‍යන්තර මට්ටමේ නිර්මාණ බිහි කිරීමයි. ඔබ ව්‍යාපාරිකයෙක් වුවත්, ආධුනිකයෙක් වුවත්, තාක්ෂණය හරහා ඔබේ සිහින ජයගන්නට මම උදව් කිරීමට සූදානම්."
                    </p>
                </div>
            </section>

            {/* Section 5: Let's Connect - Refined */}
            <section className="scroll-reveal about-cta-section">
                {/* Decorative circles */}
                <div className="cta-circle-top"></div>
                <div className="cta-circle-bottom"></div>

                <h2 className="about-cta-title">අපි එක්ව වැඩ කරමු!</h2>
                <p className="about-cta-text">
                    ඔබේ ව්‍යාපාරයට ගැලපෙන වෙබ් අඩවියක් හෝ මෘදුකාංගයක් නිර්මාණය කරගැනීමට අවශ්‍යද? නැතිනම් තාක්ෂණික ගැටලුවක් ගැන සාකච්ඡා කිරීමට අවශ්‍යද? මම ඔබට උදව් කිරීමට සැමවිටම සූදානම්.
                </p>
                <div className="about-cta-btns">
                    <a href="https://www.nuvoora.com" target="_blank" rel="noreferrer" className="btn-about-white">
                        Work With Me (Nuvoora IT) <Briefcase size={22} />
                    </a>
                    <a href="https://whatsapp.com/channel/0029Vb8JBr06LwHec2lewr43" target="_blank" rel="noreferrer" className="btn-about-white">
                        Join My Community <MessageSquare size={22} />
                    </a>
                </div>
            </section>

            <style>{`
                .about-card {
                    background: var(--bg-card);
                    padding: 3rem;
                    border-radius: 32px;
                    border: 1px solid var(--border-color);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: var(--shadow-sm);
                }
                .about-card:hover {
                    transform: translateY(-10px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--primary);
                }
                .about-icon-box {
                    width: 70px;
                    height: 70px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                }
                .about-card h3 {
                    font-size: 1.4rem;
                    font-weight: 800;
                    margin-bottom: 1.2rem;
                    line-height: 1.4;
                }
                .about-card p {
                    color: var(--text-muted);
                    font-size: 1rem;
                    line-height: 1.6;
                }
                .btn-about-white {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 45px;
                    background: white;
                    border: none;
                    border-radius: 50px;
                    color: var(--primary);
                    font-weight: 700;
                    font-size: 1.1rem;
                    text-decoration: none;
                    transition: all 0.3s;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    text-align: center;
                    justify-content: center;
                }
                .btn-about-white:hover {
                    background: var(--light-2);
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
                }

                /* Vision Section Styles */
                .about-vision-section { maxWidth: 1000px; margin: 0 auto 10rem; }
                .about-vision-card {
                    padding: 5rem; 
                    background: var(--bg-card); 
                    border-radius: 48px; 
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid var(--border-color);
                }
                .about-quote-icon { position: absolute; top: 20px; left: 20px; width: 80px; height: 80px; opacity: 0.1; color: var(--primary); }
                .about-vision-text { 
                    font-size: 1.8rem; 
                    fontWeight: 600; 
                    line-height: 1.6; 
                    font-style: italic; 
                    position: relative; 
                    zIndex: 1; 
                    color: var(--text-main); 
                }

                /* About CTA Styles */
                .about-cta-section {
                    padding: 7rem 4rem; 
                    background: linear-gradient(135deg, var(--primary) 0%, #203391 100%); 
                    border-radius: 48px; 
                    text-align: center;
                    color: white;
                    box-shadow: 0 25px 50px rgba(90, 129, 250, 0.25);
                    position: relative;
                    overflow: hidden;
                }
                .cta-circle-top { position: absolute; top: -100px; left: -100px; width: 300px; height: 300px; background: rgba(255,255,255,0.05); border-radius: 50%; }
                .cta-circle-bottom { position: absolute; bottom: -100px; right: -100px; width: 300px; height: 300px; background: rgba(255,255,255,0.05); border-radius: 50%; }
                .about-cta-title { font-size: 3rem; font-weight: 800; marginBottom: 2rem; color: white; position: relative; z-index: 1; }
                .about-cta-text { 
                    color: rgba(255,255,255,0.95); 
                    font-size: 1.25rem; 
                    line-height: 1.9; 
                    max-width: 800px; 
                    margin: 0 auto 4.5rem; 
                    position: relative;
                    z-index: 1;
                }
                .about-cta-btns { display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; position: relative; z-index: 1; }

                /* About Hero Styles */
                .about-page { padding-top: 8rem; padding-bottom: 6rem; }
                .about-hero { text-align: center; margin-bottom: 6rem; }
                .about-hero-title { font-size: 3.5rem; margin-bottom: 2rem; fontWeight: 800; line-height: 1.2; }
                .about-banner-container { 
                    position: relative; 
                    max-width: 1200px; 
                    margin: 2rem auto; 
                    border-radius: 32px; 
                    overflow: hidden; 
                    height: 500px; 
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
                }
                .about-banner-img { width: 100%; height: 100%; object-fit: cover; }
                .about-stats-overlay { position: absolute; bottom: 2rem; right: 2rem; display: flex; gap: 1.5rem; z-index: 2; }
                .about-stat-card { padding: 1.5rem 2.5rem; border-radius: 24px; text-align: center; min-width: 160px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
                .about-stat-card.white { background: white; }
                .about-stat-card.primary { background: var(--primary); color: white; box-shadow: 0 10px 30px rgba(90, 129, 250, 0.3); }
                .about-stat-num { font-size: 2.2rem; fontWeight: 800; margin-bottom: 0.2rem; }
                .white .about-stat-num { color: var(--primary); }
                .about-stat-label { font-size: 0.85rem; color: var(--text-muted); fontWeight: 700; textTransform: uppercase; margin: 0; }
                .primary .about-stat-label { color: rgba(255,255,255,0.9); }

                @media (max-width: 992px) {
                    .about-banner-container { height: 400px; }
                    .about-hero-title { font-size: 2.8rem; }
                }

                @media (max-width: 768px) {
                    .about-page { padding-top: 6rem; }
                    .about-hero { margin-bottom: 4rem; }
                    .about-hero-title { font-size: 2.2rem; padding: 0 1rem; }
                    .about-banner-container { height: 350px; margin: 1.5rem 0.5rem; border-radius: 20px; }
                    .about-stats-overlay { 
                        position: absolute; 
                        bottom: 1.5rem; 
                        left: 1.5rem; 
                        right: 1.5rem; 
                        justify-content: center;
                        gap: 1rem;
                    }
                    .about-stat-card { padding: 1rem 1.5rem; min-width: 0; flex: 1; border-radius: 16px; }
                    .about-stat-num { font-size: 1.6rem; }
                    .about-stat-label { font-size: 0.75rem; }
                    
                    .about-vision-section { margin-bottom: 6rem; padding: 0 1rem; }
                    .about-vision-card { padding: 3rem 2rem; border-radius: 32px; }
                    .about-vision-text { font-size: 1.35rem; }
                    .about-quote-icon { width: 50px; height: 50px; top: 10px; left: 10px; }

                    .about-cta-section { padding: 5rem 2rem; border-radius: 32px; }
                    .about-cta-title { font-size: 2.2rem; }
                    .about-cta-text { font-size: 1.1rem; margin-bottom: 3rem; }
                    .about-cta-btns { gap: 1rem; }

                    .btn-about-white { width: 100%; max-width: 300px; margin: 0 auto; padding: 15px 25px; font-size: 0.9rem; }
                }

                @media (max-width: 480px) {
                    .about-hero-title { font-size: 1.9rem; }
                    .about-banner-container { height: 300px; }
                    .about-stats-overlay { flex-direction: column; bottom: 1rem; left: 1rem; right: 1rem; }
                    .about-stat-card { padding: 0.8rem 1rem; display: flex; align-items: center; justify-content: center; gap: 10px; }
                    .about-stat-num { font-size: 1.4rem; margin-bottom: 0; }
                    .about-stat-label { font-size: 0.8rem; }

                    .about-vision-card { padding: 2.5rem 1.25rem; }
                    .about-vision-text { font-size: 1.1rem; line-height: 1.7; }
                    .about-quote-icon { width: 40px; height: 40px; }

                    .about-cta-section { padding: 4rem 1.5rem; }
                    .about-cta-title { font-size: 1.8rem; }
                    .about-cta-text { font-size: 1rem; }
                }
            `}</style>
        </main>
    );
};

export default About;

