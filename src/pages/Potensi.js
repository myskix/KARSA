import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import { Card } from '../components/Card.js';
import { Button } from '../components/Button.js';
import rulesData from '../data/potensiRules.json';

const renderForm = () => {
  const container = document.getElementById('potensi-container');
  if(!container) return;

  const formHtml = rulesData.questions.map((q, index) => {
    let inputHtml = '';
    
    if (q.type === 'select') {
      inputHtml = `
        <select name="${q.id}" class="w-full mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-karsa-primary focus:border-karsa-primary transition-colors">
          <option value="" disabled selected>Pilih salah satu...</option>
          ${q.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
        </select>
      `;
    } else if (q.type === 'radio') {
      inputHtml = `
        <div class="space-y-2 mt-3">
          ${q.options.map(opt => `
            <label class="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors active:bg-slate-100">
              <input type="radio" name="${q.id}" value="${opt.value}" class="w-4 h-4 text-karsa-primary border-slate-300 focus:ring-karsa-primary">
              <span class="ml-3 text-sm text-slate-700">${opt.label}</span>
            </label>
          `).join('')}
        </div>
      `;
    }

    return `
      ${Card({
        classNames: 'mb-4 shadow-sm border border-slate-100',
        padding: 'p-5',
        children: `
          <h4 class="font-bold text-slate-800">${index + 1}. ${q.label}</h4>
          ${inputHtml}
        `
      })}
    `;
  }).join('');

  container.innerHTML = `
    <div class="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
      <h2 class="font-bold text-blue-900 mb-1">Tes Potensi Diri</h2>
      <p class="text-xs text-blue-600">Jawab pertanyaan berikut dengan jujur untuk mendapatkan rekomendasi jurusan terbaik.</p>
    </div>
    
    <form id="potensi-form" onsubmit="event.preventDefault(); window.submitPotensi();">
      ${formHtml}
      <div class="mt-6 mb-4">
        ${Button({ text: 'Lihat Hasil Rekomendasi', type: 'primary', classNames: 'shadow-lg shadow-blue-500/30' })}
      </div>
    </form>
  `;
};

window.submitPotensi = () => {
  const form = document.getElementById('potensi-form');
  const formData = new FormData(form);
  const answers = {};
  
  // Validate if all questions answered
  let allAnswered = true;
  rulesData.questions.forEach(q => {
    if (!formData.get(q.id)) allAnswered = false;
    answers[q.id] = formData.get(q.id);
  });

  if (!allAnswered) {
    if(window.openModal) {
      document.getElementById('potensi-alert-content').innerText = 'Harap jawab semua pertanyaan terlebih dahulu.';
      window.openModal('potensi-alert-modal');
    } else {
      alert('Harap jawab semua pertanyaan!');
    }
    return;
  }

  // Fade out form
  const container = document.getElementById('potensi-container');
  container.classList.add('opacity-0', 'scale-95');
  
  // Simulate loading and evaluate
  setTimeout(() => {
    let finalResult = rulesData.defaultResult;

    // Evaluate rules (simple condition matching)
    // A rule matches if all its condition keys match the user's answers
    for (const rule of rulesData.rules) {
      let isMatch = true;
      for (const [key, val] of Object.entries(rule.condition)) {
        if (answers[key] !== val) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) {
        finalResult = rule.result;
        break;
      }
    }

    renderResult(finalResult);
    container.classList.remove('opacity-0', 'scale-95');
  }, 600);
};

window.resetPotensi = () => {
  const container = document.getElementById('potensi-container');
  container.classList.add('opacity-0', 'scale-95');
  setTimeout(() => {
    renderForm();
    container.classList.remove('opacity-0', 'scale-95');
  }, 300);
};

const renderResult = (result) => {
  const container = document.getElementById('potensi-container');
  
  container.innerHTML = `
    <div class="text-center py-4 animate-fade-in-up">
      <div class="inline-flex items-center justify-center p-1 bg-green-50 rounded-full mb-4">
        <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>
      <h2 class="text-2xl font-black text-slate-900 mb-1">Hasil Analisis</h2>
      <p class="text-slate-500 text-sm mb-6">Berdasarkan profil yang kamu masukkan</p>

      ${Card({
        classNames: 'bg-gradient-to-br from-karsa-primary to-blue-800 text-white border-0 shadow-xl mb-6 relative overflow-hidden',
        padding: 'p-6',
        children: `
          <div class="absolute -right-4 -top-4 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72L5.18 9L12 5.28L18.82 9zM17 15.99l-5 2.73l-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
          </div>
          <div class="relative z-10 text-left">
            <p class="text-blue-200 text-xs font-bold tracking-wider mb-1">REKOMENDASI JURUSAN</p>
            <h3 class="text-2xl font-bold mb-4">${result.jurusan}</h3>
            
            <div class="flex items-end gap-3 mb-2">
              <div class="text-4xl font-black">${result.skor}<span class="text-2xl">%</span></div>
              <div class="text-sm text-blue-100 pb-1">Tingkat Kecocokan</div>
            </div>
          </div>
        `
      })}

      ${Card({
        classNames: 'text-left mb-6 border border-slate-100',
        padding: 'p-5',
        children: `
          <h4 class="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Alasan Rekomendasi
          </h4>
          <p class="text-sm text-slate-600 leading-relaxed mb-4">${result.alasan}</p>
          
          <div class="bg-amber-50 rounded-lg p-3 border border-amber-100">
            <p class="text-xs font-bold text-amber-800 mb-1">REKOMENDASI JALUR BEASISWA</p>
            <p class="text-sm font-semibold text-amber-900">${result.beasiswa}</p>
          </div>
        `
      })}

      ${Button({ text: 'Ulangi Asesmen', type: 'outline', onClick: 'window.resetPotensi()' })}
    </div>
  `;
};

// Listen to page loaded to initialize form
document.addEventListener('pageLoaded', (e) => {
  if (e.detail.path === 'potensi') {
    renderForm();
  }
});

export const Potensi = async () => {
  return `
    ${Header({ title: 'Menu Potensi', showBack: true })}
    
    <main class="p-5 pb-24">
      <div id="potensi-container" class="transition-all duration-300 transform min-h-[400px]">
        <div class="flex justify-center items-center h-40">
           <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-karsa-primary"></div>
        </div>
      </div>
    </main>

    <!-- Alert Modal for Validation -->
    <div id="potensi-alert-modal" class="fixed inset-0 z-[100] hidden flex-col items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity opacity-0" id="potensi-alert-modal-backdrop" onclick="closeModal('potensi-alert-modal')"></div>
      <div class="bg-white rounded-3xl w-full max-w-sm p-6 relative z-10 transform translate-y-full transition-transform duration-300 shadow-2xl text-center" id="potensi-alert-modal-panel">
        <div class="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Oops!</h3>
        <p class="text-slate-600 mb-6" id="potensi-alert-content">Pesan error</p>
        <button onclick="closeModal('potensi-alert-modal')" class="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold active:scale-[0.98] transition-transform">Mengerti</button>
      </div>
    </div>

    ${BottomNav('potensi')}
  `;
};
