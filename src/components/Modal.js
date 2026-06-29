/**
 * Modal Component
 * Overlay with fade-in and slide-up animation.
 */

export const Modal = ({ id, title, content, confirmText = 'Tutup' }) => {
  return `
    <div id="${id}" class="fixed inset-0 z-[100] hidden flex-col items-center justify-end p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity opacity-0" id="${id}-backdrop" onclick="closeModal('${id}')"></div>
      
      <!-- Modal Panel -->
      <div class="bg-white rounded-t-3xl w-full max-w-[480px] p-6 relative z-10 transform translate-y-full transition-transform duration-300 ease-out shadow-2xl" id="${id}-panel">
        <div class="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 sm:hidden"></div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">${title}</h3>
        <div class="text-slate-600 mb-8 max-h-[60vh] overflow-y-auto">
          ${content}
        </div>
        <button onclick="closeModal('${id}')" class="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold active:scale-[0.98] transition-transform">
          ${confirmText}
        </button>
      </div>
    </div>
  `;
};

// Expose open/close globally so inline onclick can use them easily
// In a real app, this should be handled more elegantly
window.openModal = (id) => {
  const modal = document.getElementById(id);
  const backdrop = document.getElementById(`${id}-backdrop`);
  const panel = document.getElementById(`${id}-panel`);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    // small delay to allow display:flex to apply before animating opacity/transform
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      panel.classList.remove('translate-y-full');
      panel.classList.add('translate-y-0');
    }, 10);
  }
};

window.closeModal = (id) => {
  const modal = document.getElementById(id);
  const backdrop = document.getElementById(`${id}-backdrop`);
  const panel = document.getElementById(`${id}-panel`);
  if (modal) {
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    panel.classList.remove('translate-y-0');
    panel.classList.add('translate-y-full');
    
    // wait for animation to finish before hiding
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 300);
  }
};
