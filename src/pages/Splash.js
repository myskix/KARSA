/**
 * Splash Screen
 */

export const Splash = async () => {
  // Automatically navigate to home after 2.5 seconds
  setTimeout(() => {
    if (window.location.hash.replace('#', '') === 'splash' || window.location.hash === '') {
      window.location.hash = 'home';
    }
  }, 2500);

  return `
    <div class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-karsa-primary text-white">
      <div class="animate-bounce">
        <div class="w-24 h-24 bg-white text-karsa-primary rounded-full flex items-center justify-center text-4xl font-black shadow-2xl mb-6 mx-auto">
          K
        </div>
      </div>
      <h1 class="text-4xl font-bold tracking-tight mb-2">KARSA</h1>
      <p class="text-blue-100 font-medium tracking-wide">Konselor Karir Siswa Afirmasi</p>
      
      <div class="absolute bottom-12 left-0 w-full text-center">
        <div class="inline-flex items-center gap-2 text-sm text-blue-200">
          <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Memuat...
        </div>
      </div>
    </div>
  `;
};
