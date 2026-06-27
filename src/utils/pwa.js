/**
 * PWA Utilities
 * Handles install prompt and offline/online detection.
 */

let deferredPrompt = null;

/**
 * Initialize PWA features: install prompt capture + online/offline listeners.
 */
export const initPWA = () => {
  // Capture the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });

  // Listen for successful install
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideInstallBanner();
  });

  // Online/Offline detection
  window.addEventListener('online', () => showConnectivityToast(true));
  window.addEventListener('offline', () => showConnectivityToast(false));
};

/**
 * Show a non-intrusive install banner at the top of the app.
 */
const showInstallBanner = () => {
  // Don't show if already dismissed this session
  if (sessionStorage.getItem('karsa_install_dismissed')) return;

  // Remove existing banner if any
  const existing = document.getElementById('pwa-install-banner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.className = 'fixed top-0 left-0 right-0 z-[200] max-w-md mx-auto animate-fade-in-up';
  banner.innerHTML = `
    <div class="m-3 p-4 bg-white rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3">
      <div class="w-12 h-12 bg-karsa-primary text-white rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 shadow-md">
        K
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-slate-900 text-sm">Pasang KARSA</h4>
        <p class="text-xs text-slate-500 truncate">Akses lebih cepat tanpa browser</p>
      </div>
      <button id="pwa-install-btn" class="px-4 py-2 bg-karsa-primary text-white text-xs font-bold rounded-lg active:scale-95 transition-transform flex-shrink-0 shadow-sm">
        Pasang
      </button>
      <button id="pwa-dismiss-btn" class="p-1.5 text-slate-400 hover:text-slate-600 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById('pwa-install-btn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
    }
    hideInstallBanner();
  });

  document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
    sessionStorage.setItem('karsa_install_dismissed', 'true');
    hideInstallBanner();
  });
};

const hideInstallBanner = () => {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-20px)';
    banner.style.transition = 'all 0.3s ease';
    setTimeout(() => banner.remove(), 300);
  }
};

/**
 * Show a small toast when connectivity changes.
 */
const showConnectivityToast = (isOnline) => {
  // Remove existing toast
  const existing = document.getElementById('connectivity-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'connectivity-toast';
  toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[300] max-w-xs animate-fade-in-up';
  toast.innerHTML = `
    <div class="px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-semibold ${
      isOnline 
        ? 'bg-green-600 text-white' 
        : 'bg-slate-800 text-white'
    }">
      <div class="w-2 h-2 rounded-full ${isOnline ? 'bg-green-300' : 'bg-red-400'} animate-pulse"></div>
      ${isOnline ? 'Kembali Online' : 'Mode Offline Aktif'}
    </div>
  `;

  document.body.appendChild(toast);

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }
  }, 3000);
};
