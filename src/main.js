import './style.css'
import { registerRoute, initRouter } from './utils/router.js'
import { Layout } from './components/Layout.js'
import { initPWA } from './utils/pwa.js'

// Import pages
import { Splash } from './pages/Splash.js'
import { Home } from './pages/Home.js'
import { Simulasi } from './pages/Simulasi.js'
import { Potensi } from './pages/Potensi.js'
import { Peta } from './pages/Peta.js'
import { Tentang } from './pages/Tentang.js'
import { Profil } from './pages/Profil.js'
import { Bagikan } from './pages/Bagikan.js'

// Register all routes
registerRoute('splash', Splash)
registerRoute('home', Home)
registerRoute('jejak', Simulasi)
registerRoute('potensi', Potensi)
registerRoute('peta', Peta)
registerRoute('tentang', Tentang)
registerRoute('profil', Profil)
registerRoute('bagikan', Bagikan)

// Initial render with an empty layout shell
const appContainer = document.querySelector('#app');
appContainer.innerHTML = Layout('');

// Initialize router on the layout's outlet
const outlet = document.getElementById('router-outlet');
initRouter(outlet);

// Initialize PWA features (install prompt + offline detection)
initPWA();

// Optional: listen to page loads to attach specific event listeners if needed
document.addEventListener('pageLoaded', (e) => {
  const { path } = e.detail;
  // Initialize specific logic per page here in the future
  if (path === 'home') {
    // Example: check if first time, then open welcome modal
    if (!localStorage.getItem('karsa_welcomed')) {
      setTimeout(() => {
        if(window.openModal) window.openModal('welcome-modal');
        localStorage.setItem('karsa_welcomed', 'true');
      }, 500);
    }
  }
});
