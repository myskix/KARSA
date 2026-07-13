import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import { Button } from '../components/Button.js';
import { Card } from '../components/Card.js';
import kampusData from '../data/kampusData.json';

export const DetailKampus = async () => {
  const hashPath = window.location.hash;
  let id = 'K1';
  if (hashPath.includes('?id=')) {
    id = hashPath.split('?id=')[1].split('&')[0];
  }

  const data = kampusData.find(k => k.id === id);

  if (!data) {
    return `
      ${Header({ title: 'Detail Kampus', showBack: true })}
      <main class="p-5 text-center mt-10">
        <h2 class="font-bold text-slate-800 text-lg">Kampus tidak ditemukan</h2>
        <div class="mt-4">${Button({ text: 'Kembali', onClick: 'window.history.back()' })}</div>
      </main>
      ${BottomNav('')}
    `;
  }

  const renderList = (items, iconColor = 'text-karsa-primary') => {
    return items.map(item => `
      <li class="flex items-start gap-2 text-sm text-slate-600 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${iconColor} shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span class="leading-snug">${item}</span>
      </li>
    `).join('');
  };

  const renderSystemBadge = (label, isActive) => {
    return `
      <div class="flex items-center gap-2 p-2.5 rounded-xl border ${isActive ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100 opacity-60'}">
        <div class="w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'} shrink-0">
          ${isActive 
            ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>' 
            : '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>'}
        </div>
        <span class="text-xs font-bold ${isActive ? 'text-emerald-800' : 'text-slate-500'}">${label}</span>
      </div>
    `;
  };

  const SimulationBanner = `
    <div class="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider text-center py-1.5 border-b border-amber-100 flex items-center justify-center gap-1.5 z-10 relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      Menampilkan Data Simulasi
    </div>
  `;

  return `
    ${Header({ title: 'Detail Kampus', showBack: true })}
    ${SimulationBanner}
    
    <main class="pb-24 bg-slate-50 min-h-screen">
      <!-- Cover Image & Title Section -->
      <div class="bg-white rounded-b-3xl shadow-sm border-b border-slate-100 pb-6 mb-4 animate-fade-in-up">
        <div class="h-44 w-full relative bg-slate-200 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
          <img src="https://placehold.co/600x300/1e293b/334155?text=Gedung+Kampus" alt="Cover" class="w-full h-full object-cover" />
          <div class="absolute -bottom-8 left-5 z-20 flex items-end gap-3 w-full">
            <img src="${data.logo}" class="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white object-cover" />
          </div>
        </div>

        <div class="pt-12 px-5">
          <div class="flex items-start justify-between gap-2 mb-1">
            <h2 class="text-2xl font-black text-slate-800 leading-tight">${data.nama}</h2>
          </div>
          <p class="text-slate-500 text-sm flex items-center gap-1.5 mt-1 font-medium mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ${data.lokasi}
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">${data.status}</span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-amber-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
               Akreditasi ${data.akreditasi}
            </span>
          </div>
        </div>
      </div>

      <div class="px-4 space-y-4">
        <!-- Deskripsi -->
        ${Card({
          classNames: 'bg-white shadow-sm border border-slate-100 animate-fade-in-up',
          padding: 'p-5',
          children: `
            <h3 class="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Tentang Kampus
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed text-justify">${data.deskripsiDetail}</p>
          `
        })}

        <!-- Jurusan -->
        ${Card({
          classNames: 'bg-white shadow-sm border border-slate-100 animate-fade-in-up',
          padding: 'p-5',
          children: `
            <h3 class="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              Daftar Jurusan Populer
            </h3>
            <ul class="ml-1">${renderList(data.daftarJurusanDetail, 'text-blue-500')}</ul>
          `
        })}

        <!-- Sistem Kuliah -->
        ${Card({
          classNames: 'bg-white shadow-sm border border-slate-100 animate-fade-in-up',
          padding: 'p-5',
          children: `
            <h3 class="font-bold text-slate-800 mb-4 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Sistem Perkuliahan
            </h3>
            <div class="grid grid-cols-2 gap-3">
              ${renderSystemBadge('Reguler', data.reguler)}
              ${renderSystemBadge('Hybrid (Online)', data.hybrid)}
              ${renderSystemBadge('Sabtu-Minggu', data.sabtuMinggu)}
              ${renderSystemBadge('Kelas Karyawan', data.karyawan)}
            </div>
          `
        })}

        <!-- Biaya -->
        ${Card({
          classNames: 'bg-white shadow-sm border border-slate-100 animate-fade-in-up',
          padding: 'p-5',
          children: `
            <h3 class="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Estimasi Biaya
            </h3>
            <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
               <p class="text-sm font-semibold text-emerald-800">${data.estimasiBiaya}</p>
            </div>
          `
        })}

        <!-- Beasiswa -->
        ${Card({
          classNames: 'bg-white shadow-sm border border-slate-100 animate-fade-in-up',
          padding: 'p-5',
          children: `
            <h3 class="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              Program Beasiswa
            </h3>
            ${data.beasiswa ? `
              <ul class="ml-1 mb-4">${renderList(data.programBeasiswaDetail, 'text-amber-500')}</ul>
              ${Button({ text: 'Lihat Detail Beasiswa', type: 'outline', classNames: 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100', onClick: `window.location.hash = 'detail-beasiswa?kampusId=${id}'` })}
            ` : `
              <p class="text-sm text-slate-500">Kampus ini belum memiliki program beasiswa afirmasi yang terdata.</p>
            `}
          `
        })}

        <!-- Kontak -->
        ${Card({
          classNames: 'bg-white shadow-sm border border-slate-100 animate-fade-in-up',
          padding: 'p-5',
          children: `
            <h3 class="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Kontak Kampus
            </h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span class="text-sm text-slate-700 font-medium">${data.kontak.telepon}</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span class="text-sm text-slate-700 font-medium">${data.kontak.email}</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                </div>
                <span class="text-sm text-slate-700 font-medium text-blue-600 underline">${data.kontak.website}</span>
              </div>
            </div>
          `
        })}
      </div>
    </main>
    ${BottomNav('')}
  `;
};
