import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import { Button } from '../components/Button.js';
import { Card } from '../components/Card.js';
import beasiswaData from '../data/beasiswaData.json';
import kampusData from '../data/kampusData.json';

window.lihatTimeline = (beasiswaId) => {
  window.location.hash = 'timeline-beasiswa?id=' + beasiswaId;
};

export const DetailBeasiswa = async () => {
  const hashPath = window.location.hash;
  let id = null;
  if (hashPath.includes('?kampusId=')) {
    id = hashPath.split('?kampusId=')[1].split('&')[0];
  }

  const kampus = kampusData.find(k => k.id === id);
  const beasiswas = beasiswaData.filter(b => b.kampusId === id);

  if (!kampus || beasiswas.length === 0) {
    return `
      ${Header({ title: 'Program Beasiswa', showBack: true })}
      <main class="p-5 text-center mt-10 min-h-screen">
        <h2 class="font-bold text-slate-800 text-lg mb-2">Belum Tersedia</h2>
        <p class="text-sm text-slate-500 mb-6">Belum ada data program beasiswa afirmasi yang terdata secara spesifik untuk kampus ini.</p>
        ${Button({ text: 'Kembali', onClick: 'window.history.back()' })}
      </main>
      ${BottomNav('')}
    `;
  }

  const renderStatusBadge = (status) => {
    let colorClass = '';
    if (status === 'Dibuka') colorClass = 'bg-emerald-100 text-emerald-700 border-emerald-200';
    else if (status === 'Akan Dibuka') colorClass = 'bg-amber-100 text-amber-700 border-amber-200';
    else colorClass = 'bg-rose-100 text-rose-700 border-rose-200';

    return `<span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colorClass} shadow-sm">${status}</span>`;
  };

  const renderList = (items, iconColor) => {
    return items.map(item => `
      <li class="flex items-start gap-2 text-sm text-slate-600 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 ${iconColor} shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
        <span class="leading-relaxed">${item}</span>
      </li>
    `).join('');
  };

  const beasiswaHtml = beasiswas.map((b, index) => {
    return `
      <div class="mb-8 animate-fade-in-up" style="animation-delay: ${index * 100}ms">
        <div class="flex justify-between items-start mb-3 gap-2">
          <h2 class="text-xl font-bold text-slate-800 leading-tight flex-1">${b.nama}</h2>
          <div class="shrink-0 mt-1">${renderStatusBadge(b.status)}</div>
        </div>
        
        <p class="text-sm text-slate-600 mb-4 leading-relaxed text-justify">${b.deskripsi}</p>

        <div class="space-y-4">
          ${Card({
            classNames: 'bg-white shadow-sm border border-slate-100',
            padding: 'p-4',
            children: `
              <h3 class="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Persyaratan Utama
              </h3>
              <ul class="ml-1">${renderList(b.persyaratan, 'text-indigo-400')}</ul>
            `
          })}

          ${Card({
            classNames: 'bg-emerald-50/50 shadow-sm border border-emerald-100',
            padding: 'p-4',
            children: `
              <h3 class="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Benefit Beasiswa
              </h3>
              <ul class="ml-1">${renderList(b.benefit, 'text-emerald-500')}</ul>
            `
          })}

          ${Card({
            classNames: 'bg-white shadow-sm border border-slate-100',
            padding: 'p-4',
            children: `
              <h3 class="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Dokumen Diperlukan
              </h3>
              <ul class="ml-1">${renderList(b.dokumen, 'text-amber-500')}</ul>
            `
          })}

          ${Card({
            classNames: 'bg-blue-50/50 shadow-sm border border-blue-100',
            padding: 'p-4',
            children: `
              <h3 class="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Tips Persiapan
              </h3>
              <ul class="ml-1">${renderList(b.tips, 'text-blue-500')}</ul>
            `
          })}
        </div>

        <div class="mt-5">
          ${Button({ text: 'Lihat Timeline Beasiswa', type: 'primary', classNames: 'shadow-md shadow-blue-500/20', onClick: `window.lihatTimeline('${b.id}')` })}
        </div>
      </div>
      ${index < beasiswas.length - 1 ? '<div class="h-px bg-slate-200 my-8 mx-4"></div>' : ''}
    `;
  }).join('');

  const SimulationBanner = `
    <div class="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider text-center py-1.5 border-b border-amber-100 flex items-center justify-center gap-1.5 z-10 relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      Menampilkan Data Simulasi
    </div>
  `;

  return `
    ${Header({ title: 'Program Beasiswa', showBack: true })}
    ${SimulationBanner}
    
    <main class="pb-24 bg-slate-50 min-h-screen">
      <!-- Header Banner Khusus -->
      <div class="bg-gradient-to-r from-blue-700 to-karsa-primary px-5 py-8 rounded-b-3xl shadow-sm mb-6 text-white animate-fade-in-down">
         <p class="text-xs font-bold text-blue-200 tracking-wider mb-1.5 uppercase">BEASISWA DI</p>
         <h1 class="text-2xl font-black leading-tight">${kampus.nama}</h1>
      </div>

      <div class="px-5">
        ${beasiswaHtml}
      </div>
    </main>

    <!-- Modal Alert Timeline -->
    <div id="kampus-alert-modal" class="fixed inset-0 z-[100] hidden flex-col items-center justify-end p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity opacity-0" id="kampus-alert-modal-backdrop" onclick="closeModal('kampus-alert-modal')"></div>
      <div class="bg-white rounded-t-3xl w-full max-w-[480px] p-6 relative z-10 transform translate-y-full transition-transform duration-300 ease-out shadow-2xl text-center" id="kampus-alert-modal-panel">
        <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
        <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Segera Hadir</h3>
        <p class="text-slate-600 mb-6 text-sm leading-relaxed" id="kampus-alert-content">Pesan error</p>
        <button onclick="closeModal('kampus-alert-modal')" class="w-full bg-karsa-primary text-white py-3.5 rounded-xl font-semibold active:scale-[0.98] transition-transform">Mengerti</button>
      </div>
    </div>

    ${BottomNav('')}
  `;
};
