import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import { Card } from '../components/Card.js';
import { Button } from '../components/Button.js';
import homeData from '../data/homeData.json';

export const Home = async () => {
  // Use data from JSON
  const { user, progress, menus, dailyTip, checklist, simulationState } = homeData;

  // Render checklist items
  const renderChecklist = () => {
    return checklist.map(item => `
      <label class="flex items-start gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
        <div class="mt-0.5">
          <input type="checkbox" class="w-5 h-5 rounded text-karsa-primary border-slate-300 focus:ring-karsa-primary transition-all" ${item.completed ? 'checked' : ''} disabled>
        </div>
        <span class="text-sm ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}">${item.task}</span>
      </label>
    `).join('');
  };

  // Render main menus dynamically
  const renderMenus = () => {
    return menus.map(menu => {
      // mapping color string to Tailwind classes since dynamic string interpolation for arbitrary colors can be tricky with PurgeCSS/Tailwind
      const colorMap = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
        emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' }
      };
      const theme = colorMap[menu.color] || colorMap.blue;

      return `
        <a href="${menu.url}" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center gap-3 hover:shadow-md transition-all active:scale-95">
          <div class="w-14 h-14 rounded-full ${theme.bg} ${theme.text} flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${menu.icon}" />
            </svg>
          </div>
          <span class="text-xs font-bold text-slate-700">${menu.label}</span>
        </a>
      `;
    }).join('');
  };

  return `
    ${Header({ title: 'Beranda' })}
    
    <main class="p-5 space-y-6">
      
      <!-- Greeting Section -->
      <section class="flex justify-between items-end">
        <div>
          <p class="text-slate-500 text-sm font-medium mb-1">Halo, ${user.name}!</p>
          <h2 class="text-2xl font-bold text-slate-900">Mari Siapkan Masa Depanmu 🚀</h2>
        </div>
        <div onclick="window.location.hash='profil'" class="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all">
          ${user.name.charAt(0)}
        </div>
      </section>

      <!-- Progress Persiapan Kuliah -->
      ${Card({
        classNames: 'border border-slate-100 shadow-sm bg-white',
        padding: 'p-4',
        children: `
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-xs font-bold text-slate-500 tracking-wider">PROGRES PERSIAPAN KULIAH</span>
            <span class="text-xs font-bold text-karsa-primary">${progress.percentage}%</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2">
            <div class="bg-karsa-primary h-2 rounded-full transition-all duration-500" style="width: ${progress.percentage}%"></div>
          </div>
        `
      })}

      <!-- 3 Main Menus -->
      <section>
        <div class="grid grid-cols-3 gap-3">
          ${renderMenus()}
        </div>
      </section>

      <!-- Daily Motivation Tip -->
      <section>
        <div class="bg-amber-50 border border-amber-100 p-4 rounded-2xl relative overflow-hidden">
          <div class="absolute -right-4 -bottom-4 text-amber-200 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
          </div>
          <h3 class="font-bold text-amber-900 mb-2 relative z-10">${dailyTip.title}</h3>
          <p class="text-sm text-amber-800 leading-relaxed relative z-10">${dailyTip.content}</p>
        </div>
      </section>

      <!-- Checklist Progress -->
      <section>
        <h3 class="font-bold text-slate-800 mb-3 flex items-center justify-between">
          <span>Tugas Hari Ini</span>
          <span class="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">1/3 Selesai</span>
        </h3>
        <div class="space-y-2">
          ${renderChecklist()}
        </div>
      </section>

      <!-- Continue Simulation Button -->
      <section class="pb-4">
        ${Card({
          classNames: 'bg-white border-blue-100 shadow-sm',
          padding: 'p-4',
          children: `
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p class="text-xs text-slate-400 font-semibold mb-0.5">TERAKHIR DIMAINKAN</p>
                <h4 class="font-bold text-slate-800 text-sm">${simulationState.title}</h4>
                <p class="text-xs text-slate-500">${simulationState.episode}</p>
              </div>
            </div>
            ${Button({ text: 'Lanjutkan Life Simulation', type: 'primary', onClick: `window.location.hash='${simulationState.url.replace('#', '')}'` })}
          `
        })}
      </section>
      
    </main>

    ${BottomNav('home')}
  `;
};
