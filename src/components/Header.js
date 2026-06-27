/**
 * Header Component
 * Glassmorphism style sticky header.
 */

export const Header = ({ title = 'KARSA', showBack = false } = {}) => {
  const backButton = showBack 
    ? `<button onclick="window.history.back()" class="p-2 -ml-2 text-slate-600 hover:text-karsa-primary active:scale-95 transition-transform" aria-label="Go Back">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
       </button>` 
    : `<div class="w-10"></div>`; // spacer to keep title centered

  return `
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-5 py-4 flex items-center justify-between shadow-sm">
      ${backButton}
      <h1 class="text-lg font-bold text-slate-900 tracking-tight">${title}</h1>
      <div class="w-10 flex justify-end">
        <!-- Optional Right Icon (e.g., User Profile/Notification) -->
      </div>
    </header>
  `;
};
