# Development Roadmap: KARSA (LIDM 2026)

Dokumen ini merangkum rencana pengembangan purwarupa aplikasi KARSA dari fase inisiasi hingga siap dipresentasikan.

## Fase 1: Fondasi Proyek (Current)
*Target: Minggu 1*
- [x] Inisialisasi Vite + Vanilla JS.
- [x] Konfigurasi Tailwind CSS v4.
- [x] Konfigurasi Vite PWA Plugin (Offline-First setup).
- [x] Pembuatan struktur direktori (`components`, `pages`, `utils`, `data`, dll).
- [x] Penulisan dokumen arsitektur dan skema data.

## Fase 2: Pembuatan Komponen UI (Mendatang)
*Target: Minggu 2*
- [ ] Membangun **Design System** (Warna, Tipografi, Shadow).
- [ ] Membuat **Reusable Components**:
  - `Header` / `Navbar`
  - `Card` (untuk Jurusan dan Beasiswa)
  - `Button`
  - `Modal` / `Alert`
- [ ] Membuat tata letak halaman (Page Layouts):
  - Halaman Beranda (Home / Dashboard)
  - Halaman Asesmen (Kuesioner)
  - Halaman Hasil Rekomendasi
  - Halaman Informasi Beasiswa

## Fase 3: Integrasi Data Lokal & Logika
*Target: Minggu 3*
- [ ] Membuat file `.json` untuk data pertanyaan, jurusan, dan beasiswa di folder `src/data/`.
- [ ] Menulis modul pembaca data (JSON parser) menggunakan Fetch API lokal.
- [ ] Membuat *Engine* Asesmen:
  - Mengelola *state* jawaban pengguna.
  - Algoritma pencocokan skor dengan kategori jurusan.
- [ ] Menulis logika penyimpanan ke `localStorage`.

## Fase 4: Optimasi Offline-First & PWA
*Target: Minggu 4*
- [ ] Mendaftarkan manifest aplikasi dengan lengkap (Icon PWA lengkap, splash screen).
- [ ] Testing Service Worker (memastikan aplikasi dapat dibuka tanpa WiFi/Data Seluler).
- [ ] Menambahkan indikator UI saat kondisi offline / online.

## Fase 5: Finalisasi & Pengujian Purwarupa
*Target: Minggu 5*
- [ ] Melakukan simulasi pengujian pada perangkat mobile/Android (device testing).
- [ ] Memperbaiki *bug* UI/UX.
- [ ] Deployment (misal ke GitHub Pages atau Vercel) sebagai aplikasi statis untuk keperluan demo LIDM 2026.
