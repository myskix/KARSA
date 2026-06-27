import { Header } from '../components/Header.js';
import { BottomNav } from '../components/BottomNav.js';
import { Card } from '../components/Card.js';
import { Button } from '../components/Button.js';
import storyData from '../data/storyData.json';

// Simple state management for the story
let state = {
  uang: 0,
  motivasi: 0,
  currentNodeId: ''
};

// Initialize story state
const initStory = () => {
  state.uang = storyData.initialState.uang;
  state.motivasi = storyData.initialState.motivasi;
  state.currentNodeId = storyData.startNode;
  renderStory();
};

// Format currency
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

// Global function to handle choice clicks (needs to be attached to window for inline onclick)
window.selectStoryOption = (nextNodeId, uangChange, motivasiChange) => {
  const contentDiv = document.getElementById('story-content');
  
  // Fade out effect
  if(contentDiv) {
    contentDiv.classList.add('opacity-0', 'scale-95');
  }

  setTimeout(() => {
    // Update state
    state.uang += uangChange;
    state.motivasi += motivasiChange;
    state.currentNodeId = nextNodeId;
    
    // Re-render
    renderStory();
    
    // Fade in effect
    if(contentDiv) {
      contentDiv.classList.remove('opacity-0', 'scale-95');
    }
  }, 300);
};

window.restartStory = () => {
  initStory();
};

const renderStory = () => {
  const contentDiv = document.getElementById('story-content');
  const statusUang = document.getElementById('status-uang');
  const statusMotivasi = document.getElementById('status-motivasi');
  
  if (!contentDiv) return;

  const node = storyData.nodes[state.currentNodeId];
  
  // Update Header Status
  if (statusUang) statusUang.innerText = formatRupiah(state.uang);
  if (statusMotivasi) statusMotivasi.innerText = `${state.motivasi}%`;

  if (node.isEnd) {
    // Render End Screen
    contentDiv.innerHTML = `
      <div class="text-center py-8 animate-fade-in-up">
        <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 mb-2">Simulasi Selesai!</h2>
        <p class="text-slate-600 mb-6">Berikut adalah hasil akhir kehidupan kampusmu di episode ini.</p>
        
        ${Card({
          classNames: 'text-left bg-slate-50 border border-slate-100 mb-6',
          children: `
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm font-semibold text-slate-500">Sisa Uang:</span>
              <span class="font-bold text-slate-900">${formatRupiah(state.uang)}</span>
            </div>
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm font-semibold text-slate-500">Motivasi Akhir:</span>
              <span class="font-bold text-slate-900">${state.motivasi}%</span>
            </div>
            <div class="pt-4 border-t border-slate-200">
              <h4 class="font-bold text-slate-800 text-sm mb-2">Kesimpulan:</h4>
              <p class="text-sm text-slate-600 italic">"${node.kesimpulan}"</p>
            </div>
          `
        })}

        ${Button({ text: 'Mainkan Ulang Episode', type: 'outline', onClick: 'window.restartStory()' })}
      </div>
    `;
    return;
  }

  // Render Story Node
  const choicesHtml = node.pilihan.map(p => `
    <button 
      onclick="window.selectStoryOption('${p.nextNode}', ${p.uang}, ${p.motivasi})"
      class="w-full text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-karsa-primary hover:bg-blue-50 active:scale-[0.98] transition-all group shadow-sm">
      <div class="flex justify-between items-center">
        <span class="font-semibold text-slate-700 group-hover:text-karsa-primary">${p.text}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 group-hover:text-karsa-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </div>
      <div class="flex gap-3 mt-2 text-xs font-medium text-slate-500">
        ${p.uang !== 0 ? `<span class="${p.uang > 0 ? 'text-green-600' : 'text-red-500'}">${p.uang > 0 ? '+' : ''}${formatRupiah(p.uang)}</span>` : ''}
        ${p.motivasi !== 0 ? `<span class="${p.motivasi > 0 ? 'text-green-600' : 'text-red-500'}">${p.motivasi > 0 ? '↑' : '↓'} Motivasi ${Math.abs(p.motivasi)}</span>` : ''}
      </div>
    </button>
  `).join('');

  contentDiv.innerHTML = `
    <div class="animate-fade-in-up transition-all">
      ${Card({
        classNames: 'mb-6 text-slate-800 leading-relaxed bg-white border border-slate-100 shadow-sm relative overflow-hidden',
        children: `
          <div class="absolute top-0 left-0 w-1 h-full bg-karsa-primary"></div>
          <p class="text-lg">${node.narasi}</p>
        `
      })}
      
      <h3 class="font-bold text-slate-800 mb-3 text-sm px-1">Pilih Tindakanmu:</h3>
      <div class="space-y-3">
        ${choicesHtml}
      </div>
    </div>
  `;
};

// Listen to page loaded to initialize story when user navigates to this page
document.addEventListener('pageLoaded', (e) => {
  if (e.detail.path === 'jejak') {
    initStory();
  }
});

export const Simulasi = async () => {
  return `
    ${Header({ title: 'Life Simulation', showBack: true })}
    
    <!-- Status Bar -->
    <div class="sticky top-[60px] z-30 bg-white/90 backdrop-blur border-b border-slate-100 px-5 py-3 flex justify-between shadow-sm text-sm font-bold">
      <div class="flex items-center gap-2 text-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span id="status-uang">Rp 0</span>
      </div>
      <div class="flex items-center gap-2 text-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        <span id="status-motivasi">0%</span>
      </div>
    </div>

    <main class="p-5 pb-24">
      <div id="story-content" class="transition-all duration-300 transform min-h-[400px]">
        <!-- Story nodes will be injected here -->
        <div class="flex justify-center items-center h-40">
           <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-karsa-primary"></div>
        </div>
      </div>
    </main>

    ${BottomNav('jejak')}
  `;
};
