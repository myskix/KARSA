# KARSA - Konselor Karir Siswa Afirmasi

**KARSA** adalah aplikasi *Offline-First Digital Career Counselor* yang dirancang khusus untuk membantu siswa di daerah 3T (Tertinggal, Terdepan, dan Terluar), dengan fokus implementasi di **Kepau Baru**. Aplikasi ini bertujuan untuk memberikan bimbingan dan simulasi karir yang dapat diakses bahkan tanpa koneksi internet yang stabil, berkat dukungan teknologi *Progressive Web App (PWA)*.

## 🚀 Fitur Utama
Aplikasi KARSA memiliki berbagai modul bimbingan karir yang dirancang secara interaktif:
- **🏠 Beranda (Home):** Tampilan utama dan navigasi ke seluruh fitur KARSA.
- **👣 Jejak (Simulasi):** Simulasi perencanaan dan jejak karir.
- **💡 Potensi:** Penggalian dan analisis potensi minat & bakat siswa.
- **🗺️ Peta:** Pemetaan pilihan karir dan pendidikan lanjutan.
- **ℹ️ Tentang:** Informasi mengenai program KARSA dan latar belakang pengembangannya.
- **👤 Profil:** Profil pengguna dan riwayat progres karir.
- **🔗 Bagikan:** Fitur untuk berbagi hasil atau informasi ke platform lain.

## 🛠️ Teknologi yang Digunakan
KARSA dibangun dengan menggunakan teknologi modern untuk performa terbaik dan dukungan offline:
- **Vanilla JavaScript:** Logika aplikasi yang ringan tanpa overhead framework besar.
- **[Vite](https://vitejs.dev/):** Build tool yang sangat cepat untuk pengembangan dan produksi.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Framework CSS utility-first untuk desain responsif dan modern.
- **[Vite PWA Plugin](https://vite-pwa-org.netlify.app/):** Dukungan *Offline-First* dan fungsionalitas Progressive Web App agar aplikasi dapat diinstal di perangkat seluler.

## 💻 Cara Menjalankan Proyek Secara Lokal

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di perangkat Anda.

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/username/karsa.git
   cd karsa
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Development):**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```

5. **Preview hasil build produksi:**
   ```bash
   npm run preview
   ```

## 📱 Progressive Web App (PWA) & Offline Mode
Aplikasi ini menggunakan Service Worker untuk melakukan *caching* aset. Saat aplikasi dijalankan pertama kali dengan koneksi internet, seluruh data penting akan disimpan ke dalam *cache*. Pada kunjungan berikutnya, aplikasi dapat beroperasi sepenuhnya secara offline, sehingga sangat cocok untuk target pengguna di daerah dengan keterbatasan jaringan internet (3T).

## 🤝 Kontribusi
Kami menyambut baik setiap kontribusi untuk mengembangkan KARSA. Silakan buat *Pull Request* atau *Issue* jika Anda menemukan *bug* atau memiliki ide peningkatan fitur.

## 📄 Lisensi
Proyek ini bersifat *private* / *open-source* (Silakan sesuaikan jenis lisensi yang digunakan).
