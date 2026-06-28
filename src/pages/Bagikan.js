import { Header } from '../components/Header.js';
import { Card } from '../components/Card.js';
import shareData from '../data/shareData.json';

export const Bagikan = async () => {
  const { explanation, methods, steps, packageInfo } = shareData;

  // Global function for simulating the packaging process
  window.simulatePackaging = () => {
    const btn = document.getElementById('btn-package');
    const loadingState = document.getElementById('loading-state');
    const successState = document.getElementById('success-state');
    
    // Hide button, show loading
    btn.classList.add('hidden');
    loadingState.classList.remove('hidden');
    
    // Simulate processing time
    setTimeout(() => {
      loadingState.classList.add('hidden');
      successState.classList.remove('hidden');
    }, 2000);
  };

  return `
    ${Header({ title: 'Bagikan KARSA', showBack: true })}
    
    <main class="p-5 space-y-6 pb-24">
      
      <!-- 1. Penjelasan Singkat -->
      <section class="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 text-center">
        <div class="w-12 h-12 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-sm mx-auto mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">${explanation}</p>
      </section>

      <!-- 2. Metode Berbagi -->
      <section class="space-y-3">
        <h3 class="text-[10px] font-bold text-slate-400 tracking-widest uppercase px-1">Metode Berbagi</h3>
        <div class="grid grid-cols-2 gap-3">
          ${methods.map(method => `
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/80 flex flex-col items-center text-center">
              <div class="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${method.icon}" />
                </svg>
              </div>
              <h4 class="font-bold text-xs text-slate-800 mb-1">${method.name}</h4>
              <p class="text-[10px] text-slate-500 leading-tight">${method.description}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3. Panduan Berbagi (Stepper) -->
      <section class="space-y-3">
        <h3 class="text-[10px] font-bold text-slate-400 tracking-widest uppercase px-1">Panduan Berbagi</h3>
        ${Card({
          classNames: 'border border-slate-100 shadow-sm bg-white',
          padding: 'p-5',
          children: `
            <div class="relative border-l-2 border-slate-100 ml-2 space-y-6">
              ${steps.map((step, index) => `
                <div class="relative pl-6">
                  <div class="absolute w-6 h-6 rounded-full bg-white border-2 border-karsa-primary text-karsa-primary flex items-center justify-center text-[10px] font-bold -left-[13px] -top-1">
                    ${step.step}
                  </div>
                  <h4 class="font-bold text-sm text-slate-800">${step.title}</h4>
                  <p class="text-xs text-slate-500 mt-1 leading-relaxed">${step.description}</p>
                </div>
              `).join('')}
            </div>
          `
        })}
      </section>

      <!-- 4. Informasi Paket Instalasi -->
      <section class="space-y-3">
        <h3 class="text-[10px] font-bold text-slate-400 tracking-widest uppercase px-1">Informasi Paket Instalasi</h3>
        ${Card({
          classNames: 'border border-slate-100 shadow-sm bg-white divide-y divide-slate-100/70',
          padding: 'p-0',
          children: `
            <div class="p-4 flex justify-between items-center">
              <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nama Aplikasi</span>
              <span class="text-xs font-semibold text-slate-700">${packageInfo.name}</span>
            </div>
            <div class="p-4 flex justify-between items-center">
              <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Versi</span>
              <span class="text-xs font-semibold text-slate-700">${packageInfo.version}</span>
            </div>
            <div class="p-4 flex justify-between items-center">
              <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ukuran</span>
              <span class="text-xs font-semibold text-slate-700">${packageInfo.size}</span>
            </div>
          `
        })}
      </section>

      <!-- 5. Simulasi Progress (Interactive) -->
      <section class="pt-2 pb-6">
        <button id="btn-package" onclick="window.simulatePackaging()" class="w-full bg-karsa-primary text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Buat Paket Distribusi
        </button>

        <div id="loading-state" class="hidden w-full bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col items-center justify-center gap-3">
          <div class="w-6 h-6 border-2 border-slate-200 border-t-karsa-primary rounded-full animate-spin"></div>
          <p class="text-xs font-semibold text-slate-500">Mempersiapkan paket offline...</p>
        </div>

        <div id="success-state" class="hidden w-full bg-green-50 border border-green-100 p-4 rounded-xl flex flex-col items-center text-center gap-2">
          <div class="w-10 h-10 bg-white text-green-500 rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 class="font-bold text-green-700 text-sm">Paket Berhasil Dibuat!</h4>
            <p class="text-xs text-green-600/80 mt-0.5">Silakan buka folder Unduhan dan bagikan file APK.</p>
          </div>
        </div>
      </section>

    </main>
  `;
};
