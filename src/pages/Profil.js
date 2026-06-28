import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import { Card } from '../components/Card.js';
import { Modal } from '../components/Modal.js';
import profileData from '../data/profileData.json';
import petaData from '../data/petaData.json';

export const Profil = async () => {
  // Load initial dummy data
  const { user, appInfo, activityLog } = profileData;

  // Retrieve dynamic statistics from localStorage
  const savedPeta = localStorage.getItem('karsa_peta_progress');
  const checklistProgress = savedPeta ? JSON.parse(savedPeta) : [];
  const totalChecklist = petaData.length;
  const completedChecklist = checklistProgress.length;
  
  // Assessment results
  const savedPotensi = localStorage.getItem('karsa_potensi_result');
  const potensiResult = savedPotensi ? JSON.parse(savedPotensi) : null;
  const assessmentCount = parseInt(localStorage.getItem('karsa_assessment_count') || '0');

  // Simulation results
  const completedSimulations = parseInt(localStorage.getItem('karsa_simulations_completed') || '0');
  const lastSimulation = localStorage.getItem('karsa_last_simulation_result');
  const lastSimResult = lastSimulation ? JSON.parse(lastSimulation) : null;

  // Calculate overall checklist percentage
  const checklistPercentage = Math.round((completedChecklist / totalChecklist) * 100) || 0;

  // Determine current online/offline status dynamically
  const isOnline = navigator.onLine;

  // Formatted date
  const lastActiveDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Mock sync function
  window.startSync = () => {
    const btn = document.getElementById('sync-btn');
    const icon = document.getElementById('sync-icon');
    const text = document.getElementById('sync-text');
    
    // Set loading state
    btn.disabled = true;
    icon.classList.add('animate-spin');
    text.textContent = 'Memeriksa...';
    
    setTimeout(() => {
      // Reset state
      btn.disabled = false;
      icon.classList.remove('animate-spin');
      text.textContent = 'Periksa Update';
      
      // Show modal
      if (window.openModal) window.openModal('sync-modal');
    }, 1500);
  };

  return `
    ${Header({ title: 'Profil', showBack: false })}

    <main class="p-5 space-y-6 pb-24">
      
      <!-- 1. Header Profil (Vibrant Gradient) -->
      <section class="bg-gradient-to-br from-blue-600 to-karsa-primary text-white rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-blue-900/20">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 opacity-20 rounded-full -ml-8 -mb-8 blur-xl"></div>
        
        <div class="flex items-center gap-4 relative z-10">
          <div class="w-16 h-16 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center font-bold text-2xl border-2 border-white/40 shadow-sm shrink-0">
            ${user.avatarText}
          </div>
          <div>
            <h2 class="text-xl font-bold tracking-tight">${user.name}</h2>
            <p class="text-blue-100 text-sm font-medium mt-0.5 opacity-90">${user.class} • ${user.school}</p>
            <div class="flex items-center gap-1.5 mt-2 text-[11px] text-blue-50 font-medium bg-black/10 w-fit px-2.5 py-1 rounded-full backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              ${user.location}
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Ringkasan Perkembangan (Colorful Widget Style) -->
      <section>
        <h3 class="font-bold text-slate-800 mb-3 text-sm">Ringkasan Perkembangan</h3>
        <div class="grid grid-cols-2 gap-3">
          <!-- Jurusan -->
          <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex flex-col justify-between">
            <div class="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <div>
              <span class="text-[10px] font-bold text-emerald-600/70 uppercase tracking-wider block mb-0.5">Rekomendasi Jurusan</span>
              <p class="text-sm font-bold text-slate-800 leading-tight">
                ${potensiResult ? potensiResult.jurusan : 'Belum Ada'}
              </p>
            </div>
          </div>
          
          <!-- Beasiswa -->
          <div class="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex flex-col justify-between">
            <div class="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <span class="text-[10px] font-bold text-amber-600/70 uppercase tracking-wider block mb-0.5">Target Beasiswa</span>
              <p class="text-sm font-bold text-slate-800 leading-tight">
                ${potensiResult ? potensiResult.beasiswa : 'Belum Ada'}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm mt-3 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Skor Simulasi Terakhir</span>
              <p class="font-bold text-slate-700 text-xs">
                ${lastSimResult ? `Motivasi ${lastSimResult.motivasi}% • ${new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR', minimumFractionDigits:0}).format(lastSimResult.uang)}` : 'Belum bermain'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Statistik Penggunaan -->
      <section>
        <h3 class="font-bold text-slate-800 mb-3 text-sm">Statistik Penggunaan</h3>
        <div class="grid grid-cols-2 gap-3">
          
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-left">
            <span class="text-[11px] font-semibold text-slate-500 mb-1.5 block">Progres Berkas</span>
            <div class="flex items-baseline gap-1">
              <span class="text-2xl font-black text-slate-800">${checklistPercentage}%</span>
              <span class="text-[10px] font-medium text-slate-400">(${completedChecklist}/${totalChecklist})</span>
            </div>
          </div>

          <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-left">
            <span class="text-[11px] font-semibold text-slate-500 mb-1.5 block">Simulasi Dimainkan</span>
            <div class="flex items-baseline gap-1">
              <span class="text-2xl font-black text-slate-800">${completedSimulations}</span>
              <span class="text-[10px] font-medium text-slate-400">kali</span>
            </div>
          </div>

          <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-left">
            <span class="text-[11px] font-semibold text-slate-500 mb-1.5 block">Asesmen Diisi</span>
            <div class="flex items-baseline gap-1">
              <span class="text-2xl font-black text-slate-800">${assessmentCount}</span>
              <span class="text-[10px] font-medium text-slate-400">kali</span>
            </div>
          </div>

          <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-left flex flex-col justify-between">
            <span class="text-[11px] font-semibold text-slate-500 mb-1.5 block">Terakhir Aktif</span>
            <span class="text-xs font-bold text-slate-700 block">${lastActiveDate}</span>
          </div>

        </div>
      </section>

      <!-- 4. Aksi & Alat -->
      <section>
        <h3 class="font-bold text-slate-800 mb-3 text-sm">Alat & Bantuan</h3>
        <div class="grid grid-cols-2 gap-3 mb-4">
          
          <!-- Tombol Bagikan -->
          <a href="#bagikan" class="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:border-blue-200 transition-colors active:scale-95">
             <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
             </div>
             <span class="text-xs font-bold text-slate-700">Bagikan Offline</span>
          </a>
          
          <!-- Tombol Sync -->
          <button id="sync-btn" onclick="window.startSync()" class="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:border-indigo-200 transition-colors active:scale-95">
             <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                <svg id="sync-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
             </div>
             <span id="sync-text" class="text-xs font-bold text-slate-700">Periksa Update</span>
          </button>
          
        </div>

        <!-- Info App details -->
        <div class="bg-slate-50 rounded-2xl p-4 text-xs font-medium text-slate-500 space-y-2.5 border border-slate-100">
          <div class="flex justify-between items-center">
            <span>Versi Aplikasi</span>
            <span class="font-bold text-slate-700">${appInfo.version}</span>
          </div>
          <div class="flex justify-between items-center">
            <span>Status Koneksi</span>
            <span class="inline-flex items-center gap-1.5 font-bold ${isOnline ? 'text-green-600' : 'text-amber-600'}">
              <span class="w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-amber-500'}"></span>
              ${isOnline ? 'Online' : 'Offline Mode'}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span>Data Tersimpan</span>
            <span class="font-bold text-slate-700">${appInfo.cacheSize} cache</span>
          </div>
        </div>
      </section>

      <!-- 5. Riwayat Aktivitas (Timeline) -->
      <section>
        <h3 class="font-bold text-slate-800 mb-3 text-sm">Riwayat Aktivitas</h3>
        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div class="relative border-l-2 border-slate-100 ml-1.5 space-y-5">
            ${activityLog.map((log, index) => `
              <div class="relative pl-5 text-left">
                <div class="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1 ${index === 0 ? 'bg-karsa-primary ring-4 ring-blue-50' : 'bg-slate-200'}"></div>
                <h4 class="font-bold text-xs text-slate-700 leading-snug">${log.activity}</h4>
                <p class="text-[10px] text-slate-400 mt-0.5 font-medium">${log.date} • ${log.time}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <div class="pt-4 pb-6 flex justify-center">
         <p class="text-[10px] font-bold text-slate-300 uppercase tracking-widest">KARSA App &copy; 2026</p>
      </div>
    </main>

    ${BottomNav('profil')}

    ${Modal({
      id: 'sync-modal',
      title: 'Sinkronisasi Selesai',
      content: `
        <div class="flex flex-col items-center text-center">
          <div class="w-14 h-14 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-100 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="font-bold text-slate-800 text-lg mb-2">Data berhasil diperbarui.</p>
          <p class="text-xs text-slate-500 leading-relaxed">
            Informasi beasiswa dan jadwal terbaru telah diperbarui. Proses ini tidak memengaruhi data atau progres personal Anda.
          </p>
        </div>
      `,
      confirmText: 'Tutup'
    })}
  `;
};
