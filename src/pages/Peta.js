import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import { Card } from '../components/Card.js';
import petaData from '../data/petaData.json';

const STORAGE_KEY = 'karsa_peta_progress';

const getProgress = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveProgress = (progressArr) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressArr));
};

// Global toggle function
window.toggleChecklist = (id) => {
  let progress = getProgress();
  if (progress.includes(id)) {
    progress = progress.filter(item => item !== id);
  } else {
    progress.push(id);
  }
  saveProgress(progress);
  renderPeta();
};

const getBadge = (percentage) => {
  if (percentage >= 100) return { icon: '🏆', text: 'Siap Tempur!', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
  if (percentage >= 75) return { icon: '🥇', text: 'Hampir Selesai', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  if (percentage >= 50) return { icon: '🥈', text: 'Setengah Jalan', color: 'bg-blue-100 text-blue-700 border-blue-200' };
  if (percentage >= 25) return { icon: '🥉', text: 'Langkah Awal', color: 'bg-amber-100 text-amber-700 border-amber-200' };
  return { icon: '🌱', text: 'Mulai Bergerak', color: 'bg-slate-100 text-slate-700 border-slate-200' };
};

const renderPeta = () => {
  const container = document.getElementById('peta-container');
  if (!container) return;

  const progress = getProgress();
  const total = petaData.length;
  const completed = progress.length;
  const percentage = Math.round((completed / total) * 100);
  const badge = getBadge(percentage);

  const checklistHtml = petaData.map((item, index) => {
    const isChecked = progress.includes(item.id);
    return `
      <label class="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors relative overflow-hidden group mb-3 shadow-sm bg-white">
        <div class="mt-1 flex-shrink-0">
          <input type="checkbox" onchange="window.toggleChecklist('${item.id}')" ${isChecked ? 'checked' : ''} class="w-6 h-6 rounded text-karsa-primary border-slate-300 focus:ring-karsa-primary transition-all">
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-sm ${isChecked ? 'text-slate-400 line-through' : 'text-slate-800'} transition-all">${item.title}</h4>
          <p class="text-xs mt-1 ${isChecked ? 'text-slate-400' : 'text-slate-500'}">${item.description}</p>
        </div>
      </label>
    `;
  }).join('');

  container.innerHTML = `
    <!-- Progress Header -->
    ${Card({
      classNames: 'bg-white shadow-sm border border-slate-100 mb-6',
      padding: 'p-5',
      children: `
        <div class="flex justify-between items-start mb-3">
          <div>
            <h2 class="font-bold text-slate-800 text-lg">Persiapan Berkas</h2>
            <p class="text-xs text-slate-500">Lengkapi dokumen untuk pendaftaran KIP-K / Kampus</p>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold shadow-sm ${badge.color}">
            <span>${badge.icon}</span> ${badge.text}
          </div>
        </div>
        
        <div class="flex justify-between items-end mb-2">
          <span class="text-3xl font-black text-karsa-primary">${percentage}%</span>
          <span class="text-sm font-semibold text-slate-400 mb-1">${completed} dari ${total} Berkas</span>
        </div>
        
        <div class="w-full bg-slate-100 rounded-full h-3">
          <div class="bg-karsa-primary h-3 rounded-full transition-all duration-500 ease-out" style="width: ${percentage}%"></div>
        </div>
      `
    })}

    <!-- Checklist -->
    <div class="space-y-1">
      <h3 class="font-bold text-slate-700 text-sm mb-3 ml-1">Daftar Dokumen:</h3>
      ${checklistHtml}
    </div>
  `;
};

// Listen to page loaded
document.addEventListener('pageLoaded', (e) => {
  if (e.detail.path === 'peta') {
    renderPeta();
  }
});

export const Peta = async () => {
  return `
    ${Header({ title: 'Peta Langkah', showBack: true })}
    
    <main class="p-5 pb-24 min-h-screen bg-slate-50">
      <div id="peta-container" class="animate-fade-in-up">
        <!-- Rendered dynamically -->
        <div class="flex justify-center items-center h-40">
           <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-karsa-primary"></div>
        </div>
      </div>
    </main>

    ${BottomNav('peta')}
  `;
};
