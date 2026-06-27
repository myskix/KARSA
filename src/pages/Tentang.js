import { Header } from '../components/Header.js';
import { Card } from '../components/Card.js';

export const Tentang = async () => {
  return `
    ${Header({ title: 'Tentang Aplikasi', showBack: true })}
    
    <main class="p-5 space-y-6">
      <div class="text-center py-6">
        <div class="w-20 h-20 bg-karsa-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-black shadow-lg">
          K
        </div>
        <h2 class="text-2xl font-bold text-slate-900">KARSA</h2>
        <p class="text-slate-500 font-medium">Konselor Karir Siswa Afirmasi</p>
        <div class="mt-2 inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
          Versi 1.0 (Purwarupa)
        </div>
      </div>

      ${Card({
        children: `
          <h3 class="font-bold text-slate-800 mb-2">Tujuan Proyek</h3>
          <p class="text-sm text-slate-600 leading-relaxed mb-4">
            Aplikasi ini dibangun untuk membantu siswa-siswi SMA Terbuka Desa Kepau Baru (Daerah 3T) dalam mendapatkan bimbingan karir dan informasi beasiswa afirmasi tanpa bergantung pada koneksi internet (Offline-First).
          </p>
          <div class="pt-4 border-t border-slate-100">
             <p class="text-xs text-slate-400 text-center">Dikembangkan untuk LIDM 2026</p>
          </div>
        `
      })}
      
      <div class="px-2">
         <p class="text-xs text-slate-400 text-center">
            Hak Cipta &copy; 2026 Tim KARSA<br>
            Seluruh data bersifat lokal pada perangkat ini.
         </p>
      </div>
    </main>
  `;
};
