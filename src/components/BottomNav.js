/**
 * Bottom Navigation Component
 * Supports 5 main tabs for mobile layout: Home, Potensi, Life Sim, Peta, Profil.
 */

export const BottomNav = (activeTab = 'home') => {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'potensi', label: 'Potensi', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id: 'jejak', label: 'Life Sim', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'peta', label: 'Peta', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
    { id: 'profil', label: 'Profil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  const renderTab = (tab) => {
    const isActive = activeTab === tab.id;
    const colorClass = isActive ? 'text-karsa-primary' : 'text-slate-400 hover:text-slate-600';
    
    return `
      <a href="#${tab.id}" class="flex flex-col items-center justify-center w-full py-2 ${colorClass} transition-colors active:scale-95 touch-manipulation">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="${isActive ? '2.5' : '2'}" d="${tab.icon}" />
        </svg>
        <span class="text-[9px] font-semibold mt-0.5">${tab.label}</span>
      </a>
    `;
  };

  return `
    <div class="sticky bottom-0 w-full z-50 pointer-events-none mt-auto">
      <nav 
        class="w-full bg-white/90 backdrop-blur-lg border-t border-slate-100 flex justify-around items-end shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] pointer-events-auto rounded-t-2xl"
        style="padding-bottom: env(safe-area-inset-bottom, 0px);"
      >
        ${tabs.map(renderTab).join('')}
      </nav>
    </div>
  `;
};
