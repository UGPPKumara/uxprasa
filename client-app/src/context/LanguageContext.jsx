import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        home: "Home",
        blog: "Blog",
        services: "Services",
        about: "About",
        contact: "Contact",
        search_articles: "Search Articles",
        search_placeholder: "Type your search here...",
        popular_searches: "Popular Searches",
        search_now: "Search Now",
        start_learning: "Start Learning",
        hero_title: "Learn Technology & Design",
        hero_subtitle: "Simplified in your own language. Everything you need to become a digital creator.",
        trending_posts: "Trending Posts",
        latest_updates: "Get Latest Updates",
        subscribe: "Subscribe",
        popular_topics: "Popular Topics",
        read_more: "Read More",
        login: "Login",
        logout: "Logout",
        language: "Language",
        select_language: "Select Language"
    },
    si: {
        home: "මුල් පිටුව",
        blog: "බ්ලොග්",
        services: "සේවාවන්",
        about: "අපි ගැන",
        contact: "සම්බන්ධ වන්න",
        search_articles: "ලිපි සොයන්න",
        search_placeholder: "මෙහි සොයන්න...",
        popular_searches: "ප්‍රධාන මාතෘකා",
        search_now: "දැන් සොයන්න",
        start_learning: "ඉගෙනීම අරඹන්න",
        hero_title: "තාක්ෂණය සහ නිර්මාණකරණය",
        hero_subtitle: "සිංහලෙන්ම ඉගෙන ගන්න. ඩිජිටල් නිර්මාණකරුවෙකු වීමට අවශ්‍ය සියලු දැනුම එකම තැනකින්.",
        trending_posts: "ජනප්‍රිය ලිපි",
        latest_updates: "අලුත්ම තොරතුරු",
        subscribe: "ලියාපදිංචි වන්න",
        popular_topics: "ප්‍රධාන මාතෘකා",
        read_more: "තව කියවන්න",
        login: "ඇතුළු වන්න",
        logout: "පිටවෙන්න",
        language: "භාෂාව",
        select_language: "භාෂාව තෝරන්න"
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('uxprasa_lang') || 'si');

    useEffect(() => {
        localStorage.setItem('uxprasa_lang', language);
        document.documentElement.lang = language;
    }, [language]);

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
