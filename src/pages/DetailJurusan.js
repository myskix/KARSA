import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import { Card } from '../components/Card.js';
import { Button } from '../components/Button.js';
import jurusanData from '../data/jurusanData.json';

window.lihatKampus = (id) => {
  window.location.hash = 'kampus?jurusan=' + (id || 'H1');
};

export const DetailJurusan = async () => {
  // Parse ID from hash
  const hashPath = window.location.hash;
  let id = null;
  if (hashPath.includes('?id=')) {
    id = hashPath.split('?id=')[1].split('&')[0];
  }

  const data = jurusanData[id];

  if (!data) {
    return `
      ${Header({ title: 'Detail Jurusan', showBack: true })}
      <main class="p-5 pb-24 text-center mt-10">
        <h2 class="text-xl font-bold text-slate-800">Jurusan tidak ditemukan!</h2>
        <p class="text-slate-500 mt-2">Maaf, detail untuk jurusan ini belum tersedia.</p>
        <div class="mt-6">${Button({ text: 'Kembali', onClick: 'window.history.back()' })}</div>
      </main>
      ${BottomNav('')}
    `;
  }

  const renderList = (items) => {
    return items.map(item => `
      <li class="flex items-start gap-2 text-sm text-slate-600 mb-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-karsa-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>${item}</span>
      </li>
    `).join('');
  };

  return `
    ${Header({ title: 'Detail Jurusan', showBack: true })}
    
    <main class="p-5 space-y-5 pb-24">
      <!-- Header Banner -->
      <section class="bg-gradient-to-br from-karsa-primary to-blue-800 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-blue-900/20 animate-fade-in-up">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div class="relative z-10 text-left">
          <p class="text-blue-200 text-xs font-bold tracking-wider mb-1">PROFIL JURUSAN</p>
          <h2 class="text-2xl font-bold mb-3 leading-tight">${data.nama}</h2>
          <p class="text-sm text-blue-50/90 leading-relaxed">${data.deskripsi}</p>
        </div>
      </section>

      <!-- Mata Kuliah Utama -->
      ${Card({
        classNames: 'bg-white shadow-sm border border-slate-100 animate-fade-in-up',
        padding: 'p-5',
        children: `
          <h3 class="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Mata Kuliah Utama
          </h3>
          <ul class="ml-1">${renderList(data.mataKuliahUtama)}</ul>
        `
      })}

      <!-- Skill yang Dibutuhkan -->
      ${Card({
        classNames: 'bg-white shadow-sm border border-slate-100 animate-fade-in-up',
        padding: 'p-5',
        children: `
          <h3 class="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Skill yang Dibutuhkan
          </h3>
          <ul class="ml-1">${renderList(data.skillDibutuhkan)}</ul>
        `
      })}

      <!-- Prospek & Profesi -->
      ${Card({
        classNames: 'bg-white shadow-sm border border-slate-100 animate-fade-in-up',
        padding: 'p-5',
        children: `
          <h3 class="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Prospek Kerja & Karier
          </h3>
          <div class="bg-amber-50 rounded-xl p-3 border border-amber-100 mb-4">
             <p class="text-xs font-bold text-amber-800 mb-1">PROSPEK KERJA</p>
             <p class="text-sm text-amber-900 leading-relaxed">${data.prospekKerja}</p>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed mb-4">${data.peluangKarier}</p>
          <div>
            <p class="text-[10px] font-bold text-slate-400 mb-2.5 uppercase tracking-wider">Contoh Profesi:</p>
            <div class="flex flex-wrap gap-2">
              ${data.contohProfesi.map(prof => `<span class="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-[11px] font-semibold">${prof}</span>`).join('')}
            </div>
          </div>
        `
      })}

      <!-- Action Button -->
      <div class="pt-2 animate-fade-in-up">
        ${Button({ text: 'Lihat Kampus', type: 'primary', classNames: 'shadow-md shadow-blue-500/20', onClick: `window.lihatKampus('${id}')` })}
      </div>

    </main>

    ${BottomNav('')}
  `;
};
