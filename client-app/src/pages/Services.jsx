import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout, Palette, Code, Smartphone, Globe, Megaphone, CheckCircle2, ArrowRight, GraduationCap } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Globe size={32} />,
            title: "Web Development",
            description: "Modern, responsive, and high-performance websites built with the latest technologies like React and Next.js.",
            features: ["Custom Web Apps", "E-commerce Solutions", "API Integration"]
        },
        {
            icon: <Palette size={32} />,
            title: "UI/UX Design",
            description: "User-centric designs that are not only beautiful but also intuitive and functional for your users.",
            features: ["Wireframing", "Prototyping", "User Research"]
        },
        {
            icon: <Layout size={32} />,
            title: "WordPress Solutions",
            description: "Custom WordPress themes and plugins tailored to your business needs with easy content management.",
            features: ["Theme Customization", "Plugin Development", "Site Migration"]
        },
        {
            icon: <Smartphone size={32} />,
            title: "App Development",
            description: "Cross-platform mobile applications that provide a seamless experience across iOS and Android.",
            features: ["React Native", "Native Performance", "Store Deployment"]
        },
        {
            icon: <GraduationCap size={32} />,
            title: "Academic Project Support",
            description: "Expert guidance for university students on final year projects, capstone projects, and technical research development.",
            features: ["Final Year Projects", "Capstone Guidance", "Technical Documentation"]
        },
        {
            icon: <Megaphone size={32} />,
            title: "Digital Marketing",
            description: "SEO and performance marketing strategies to help your business reach its full potential online.",
            features: ["SEO Optimization", "Content Strategy", "Social Media"]
        }
    ];

    return (
        <div className="services-page" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="container">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem' }}
                >
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
                        Services We <span style={{ color: 'var(--primary)' }}>Provide</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                        අපි සමාගම් සහ පුද්ගලයින් සඳහා උසස් තත්ත්වයේ, ඕනෑම මට්ටමකට ව්‍යාප්ත කළ හැකි සහ පරිශීලක-හිතකාමී ඩිජිටල් නිර්මාණ බිහි කිරීමට සහාය වන්නෙමු. අපගේ වෘත්තීය සේවාවන් මෙතැනින් ගවේෂණය කරන්න.
                    </p>
                </motion.div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.a 
                            href="https://www.nuvoora.com"
                            target="_blank"
                            rel="noreferrer"
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="service-card"
                            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                        >
                            <div className="service-icon-wrapper">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <CheckCircle2 size={16} /> {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="service-btn">
                                Learn More <ArrowRight size={16} />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Get in Touch CTA - Blue Gradient Version */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="services-cta"
                >
                    <h2>ඔබට වෙබ් අඩවියක් අවශ්‍යද?</h2>
                    <p>
                        ඔබේ ව්‍යාපාරයට ගැලපෙනම වෙබ් අඩවියක් හෝ සිස්ටම් එකක් සියලුම graphics, hosting සහ domain සියල්ල සමඟින් සාධාරණ මිලට අපෙන් සාදාගන්න.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <a href="https://api.whatsapp.com/send/?phone=94755111360&text&type=phone_number&app_absent=0" 
                           target="_blank" 
                           rel="noreferrer" 
                           className="btn-pill-white">
                            මිල ගණන් විමසන්න <ArrowRight size={22} className="btn-icon" />
                        </a>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .btn-pill-white {
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
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                .btn-pill-white:hover {
                    background: var(--light-2);
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 30px;
                    margin-bottom: 6rem;
                }
                .service-card {
                    background: var(--bg-card);
                    padding: 3rem 2.5rem;
                    border-radius: 32px;
                    border: 1px solid var(--border-color);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .service-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--primary);
                    box-shadow: 0 20px 40px rgba(90, 129, 250, 0.1);
                }
                .service-icon-wrapper {
                    width: 70px;
                    height: 70px;
                    background: var(--light-2);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                    margin-bottom: 2rem;
                    transition: all 0.3s;
                }
                .service-card:hover .service-icon-wrapper {
                    background: var(--primary);
                    color: white;
                    transform: scale(1.1) rotate(5deg);
                }
                .service-card h3 {
                    font-size: 1.5rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                }
                .service-card p {
                    color: var(--text-muted);
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                .service-features {
                    list-style: none;
                    margin-bottom: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .service-features li {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--text-main);
                }
                .service-features li svg {
                    color: var(--primary);
                }
                .service-btn {
                    background: none;
                    border: none;
                    color: var(--primary);
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.95rem;
                    cursor: pointer;
                    padding: 0;
                    transition: gap 0.3s;
                }
                .service-card:hover .service-btn {
                    gap: 15px;
                }

                .services-cta {
                    margin-top: 8rem;
                    padding: 6rem 4rem;
                    background: linear-gradient(135deg, var(--primary) 0%, #2C3D8F 100%);
                    border-radius: 48px;
                    text-align: center;
                    color: white;
                    box-shadow: 0 20px 40px rgba(90, 129, 250, 0.2);
                }
                .services-cta h2 {
                    font-size: 2.8rem;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    color: white;
                }
                .services-cta p {
                    color: rgba(255,255,255,0.9);
                    font-size: 1.4rem;
                    font-weight: 600;
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto 3.5rem;
                }

                @media (max-width: 1024px) {
                    .services-grid {
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                    }
                }

                @media (max-width: 768px) {
                    .services-grid {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 25px !important;
                    }
                    .service-card {
                        padding: 2.5rem 2.5rem !important;
                        border-radius: 24px;
                    }
                    .services-page { padding-top: 9rem !important; }
                    .services-cta { 
                        margin-top: 5rem;
                        padding: 3.5rem 1.5rem;
                        border-radius: 32px;
                    }
                    .services-cta h2 { font-size: 2rem; }
                    .services-cta p { font-size: 1.1rem; margin-bottom: 2.5rem; }
                    .btn-pill-white { padding: 15px 35px; font-size: 1rem; }
                    .btn-icon { width: 18px; height: 18px; }
                }

                @media (max-width: 480px) {
                    .services-page { padding-top: 10rem !important; }
                    .services-page h1 { font-size: 2.2rem !important; }
                    .service-card {
                        padding: 2.5rem 2rem !important;
                    }
                    .service-icon-wrapper {
                        width: 60px;
                        height: 60px;
                        margin-bottom: 1.5rem;
                    }
                    .service-card h3 { font-size: 1.3rem; }
                    .services-cta h2 { font-size: 1.6rem; }
                }
            `}</style>
        </div>
    );
};

export default Services;
