import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BackgroundMusicProvider } from './contexts/BackgroundMusicContext'

createRoot(document.getElementById("root")!).render(
  <BackgroundMusicProvider>
    <App />
  </BackgroundMusicProvider>
);
