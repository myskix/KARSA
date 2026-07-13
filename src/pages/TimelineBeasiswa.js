import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import timelineData from '../data/timelineData.json';
import beasiswaData from '../data/beasiswaData.json';
import { Button } from '../components/Button.js';

export const TimelineBeasiswa = async () => {
  const hashPath = window.location.hash;
  let id = null;
  if (hashPath.includes('?id=')) {
    id = hashPath.split('?id=')[1].split('&')[0];
  }

  const timeline = timelineData.find(t => t.beasiswaId === id);
  const beasiswa = beasiswaData.find(b => b.id === id);

  if (!timeline || !beasiswa) {
    return `
      ${Header({ title: 'Timeline Beasiswa', showBack: true })}
      <main class="p-5 text-center mt-10 min-h-screen bg-slate-50">
        <div class="w-16 h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h2 class="font-bold text-slate-800 text-lg mb-2">Belum Tersedia</h2>
        <p class="text-sm text-slate-500 mb-6">Data jadwal/timeline untuk beasiswa ini sedang disusun atau belum tersedia.</p>
        ${Button({ text: 'Kembali', onClick: 'window.history.back()' })}
      </main>
      ${BottomNav('')}
    `;
  }

  const stages = timeline.stages;
  
  // Hitung persentase progress untuk progress bar kecil (opsional tambahan indikator)
  const completed = stages.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completed / stages.length) * 100);

  const renderTimelineItem = (stage, isLast, index) => {
    let circleColor = '';
    let icon = '';
    let titleColor = '';
    let lineColor = stage.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-200';
    
    if (stage.status === 'completed') {
      circleColor = 'bg-emerald-500 text-white border-emerald-500';
      titleColor = 'text-emerald-700';
      icon = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>';
    } else if (stage.status === 'active') {
      circleColor = 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/40 ring-4 ring-blue-100';
      titleColor = 'text-blue-700';
      icon = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    } else {
      circleColor = 'bg-white text-slate-300 border-slate-300';
      titleColor = 'text-slate-600';
      icon = '<div class="w-2 h-2 rounded-full bg-slate-300"></div>';
    }

    return `
      <div class="relative flex gap-5 animate-fade-in-up" style="animation-delay: ${index * 150}ms">
        <!-- Vertical Line -->
        ${!isLast ? `<div class="absolute left-[15px] top-10 bottom-0 w-0.5 -mb-6 ${lineColor}"></div>` : ''}
        
        <!-- Node Circle -->
        <div class="relative z-10 w-8 h-8 shrink-0 rounded-full border-2 flex items-center justify-center mt-1 ${circleColor}">
          ${icon}
        </div>
        
        <!-- Content -->
        <div class="flex-1 pb-10">
          <span class="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold tracking-wider mb-2 uppercase border border-slate-200/60 shadow-sm">${stage.date}</span>
          <h3 class="font-bold text-base ${titleColor} mb-1">${stage.title}</h3>
          <p class="text-sm text-slate-500 leading-relaxed text-justify pr-2">${stage.description}</p>
        </div>
      </div>
    `;
  };

  const timelineHtml = stages.map((stage, index) => renderTimelineItem(stage, index === stages.length - 1, index)).join('');

  const SimulationBanner = `
    <div class="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider text-center py-1.5 border-b border-amber-100 flex items-center justify-center gap-1.5 z-10 relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      Menampilkan Data Simulasi
    </div>
  `;

  return `
    ${Header({ title: 'Timeline Beasiswa', showBack: true })}
    ${SimulationBanner}
    
    <main class="pb-24 bg-slate-50 min-h-screen">
      <!-- Header Banner -->
      <div class="bg-gradient-to-r from-blue-700 to-karsa-primary px-5 py-8 rounded-b-3xl shadow-sm mb-6 text-white animate-fade-in-down relative overflow-hidden">
         <div class="absolute right-0 top-0 opacity-10">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 -mr-4 -mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
         </div>
         <p class="text-xs font-bold text-blue-200 tracking-wider mb-1.5 uppercase relative z-10">TIMELINE SELEKSI</p>
         <h1 class="text-xl font-black leading-tight relative z-10 w-11/12">${beasiswa.nama}</h1>
      </div>

      <div class="px-5 mb-5 animate-fade-in-up">
        <div class="flex justify-between items-center mb-2">
           <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Progress Tahapan</span>
           <span class="text-xs font-bold text-blue-600">${progressPercent}%</span>
        </div>
        <div class="w-full bg-slate-200 rounded-full h-2">
           <div class="bg-blue-500 h-2 rounded-full transition-all duration-1000" style="width: ${progressPercent}%"></div>
        </div>
      </div>

      <div class="px-5">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
           ${timelineHtml}
        </div>
      </div>
    </main>
    ${BottomNav('')}
  `;
};
