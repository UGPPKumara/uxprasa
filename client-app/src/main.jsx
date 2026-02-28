import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Hide unnecessary console noise from 3rd party SDKs in production
if (import.meta.env.PROD) {
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args) => {
    const msg = args[0]?.toString() || '';
    if (msg.includes('tiktok') || msg.includes('Content Security Policy') || msg.includes('upgrade-insecure-requests')) return;
    originalError(...args);
  };
  
  console.warn = (...args) => {
    const msg = args[0]?.toString() || '';
    if (msg.includes('tiktok') || msg.includes('upgrade-insecure-requests')) return;
    originalWarn(...args);
  };

  // Optional: Completely clear logs if needed (comment out if you want to keep other logs)
  // console.log = () => {};
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
