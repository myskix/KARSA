import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import kampusData from '../data/kampusData.json';

// Global state for this page to handle Vanilla JS reactivity
window.kampusState = {
  jurusanId: 'H1',
  filters: {
    negeri: false,
    swasta: false,
    beasiswa: false,
    sabtuMinggu: false,
    karyawan: false,
    wilayahRiau: false
  }
};

window.toggleKampusFilter = (key) => {
  window.kampusState.filters[key] = !window.kampusState.filters[key];
  renderKampusList();
};

const renderKampusList = () => {
  const container = document.getElementById('kampus-list-container');
  if (!container) return;

  const { jurusanId, filters } = window.kampusState;

  // 1. Filter by jurusan
  let filtered = kampusData.filter(k => k.jurusanTersedia.includes(jurusanId));

  // 2. Filter by active filters
  if (filters.negeri) filtered = filtered.filter(k => k.status === 'Negeri');
  if (filters.swasta) filtered = filtered.filter(k => k.status === 'Swasta');
  if (filters.beasiswa) filtered = filtered.filter(k => k.beasiswa);
  if (filters.sabtuMinggu) filtered = filtered.filter(k => k.sabtuMinggu);
  if (filters.karyawan) filtered = filtered.filter(k => k.karyawan);
  if (filters.wilayahRiau) filtered = filtered.filter(k => k.lokasi.includes('Riau'));

  // Update filter buttons styling
  Object.keys(filters).forEach(key => {
    const btn = document.getElementById(`filter-btn-${key}`);
    if (btn) {
      if (filters[key]) {
        btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
        btn.classList.add('bg-blue-500', 'text-white', 'border-blue-500');
      } else {
        btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
        btn.classList.remove('bg-blue-500', 'text-white', 'border-blue-500');
      }
    }
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 text-slate-500 animate-fade-in-up">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p class="text-sm">Tidak ada kampus yang sesuai dengan filter pencarian.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(k => `
    <div onclick="window.location.hash = 'detail-kampus?id=${k.id}'" class="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 flex gap-4 items-center cursor-pointer active:scale-95 transition-transform animate-fade-in-up">
      <img src="${k.logo}" alt="Logo" class="w-16 h-16 rounded-xl object-cover bg-slate-50 shrink-0 border border-slate-100" />
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-slate-800 text-sm truncate">${k.nama}</h3>
        <p class="text-xs text-slate-500 mb-2 truncate">${k.lokasi} • <span class="font-semibold text-blue-600">${k.status}</span></p>
        <div class="flex flex-wrap gap-1.5 mt-1">
          ${k.beasiswa ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">Beasiswa</span>` : ''}
          ${k.reguler ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">Reguler</span>` : ''}
          ${k.sabtuMinggu ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">Sabtu-Minggu</span>` : ''}
          ${k.karyawan ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100">Karyawan</span>` : ''}
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </div>
  `).join('');
};

export const Kampus = async () => {
  const hashPath = window.location.hash;
  if (hashPath.includes('?jurusan=')) {
    window.kampusState.jurusanId = hashPath.split('?jurusan=')[1].split('&')[0];
  } else {
    window.kampusState.jurusanId = 'H1';
  }

  // Reset filters on fresh page load
  window.kampusState.filters = {
    negeri: false, swasta: false, beasiswa: false, sabtuMinggu: false, karyawan: false, wilayahRiau: false
  };

  setTimeout(() => {
    renderKampusList();
  }, 100);

  const FilterChip = (key, label) => `
    <button id="filter-btn-${key}" onclick="window.toggleKampusFilter('${key}')" class="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-600 border border-slate-200 transition-colors">
      ${label}
    </button>
  `;

  const SimulationBanner = `
    <div class="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider text-center py-1.5 border-b border-amber-100 flex items-center justify-center gap-1.5 z-10 relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      Menampilkan Data Simulasi
    </div>
  `;

  return `
    ${Header({ title: 'Rekomendasi Kampus', showBack: true })}
    ${SimulationBanner}
    
    <div class="bg-slate-50 pb-2 border-b border-slate-100 pt-4 px-5 animate-fade-in-down">
      <h2 class="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">Filter Pencarian</h2>
      <div class="flex overflow-x-auto pb-3 gap-2 snap-x hide-scrollbar" style="scrollbar-width: none; -ms-overflow-style: none;">
        ${FilterChip('negeri', 'Negeri')}
        ${FilterChip('swasta', 'Swasta')}
        ${FilterChip('beasiswa', 'Menerima Beasiswa')}
        ${FilterChip('sabtuMinggu', 'Kelas Sabtu-Minggu')}
        ${FilterChip('karyawan', 'Kelas Karyawan')}
        ${FilterChip('wilayahRiau', 'Wilayah Riau')}
      </div>
    </div>

    <style>
      /* Hide scrollbar for Chrome, Safari and Opera */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    </style>

    <main class="p-5 pb-24">
      <div id="kampus-list-container">
         <div class="flex justify-center items-center h-40">
           <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-karsa-primary"></div>
         </div>
      </div>
    </main>

    ${BottomNav('')}
  `;
};
