# Architecture: Offline-First Tanpa Backend

Proyek KARSA dirancang dengan pendekatan **Offline-First Architecture**. Karena target pengguna berada di daerah 3T (SMA Terbuka Kepau Baru) dengan infrastruktur internet yang tidak stabil, aplikasi harus dapat berjalan 100% secara lokal setelah pertama kali dimuat.

## Komponen Arsitektur Utama

### 1. Progressive Web App (PWA)
- **Vite PWA Plugin** digunakan untuk meng-generate `service-worker`.
- Semua aset statis (HTML, JS, CSS, JSON, Gambar) akan di-cache menggunakan strategi `CacheFirst` atau `StaleWhileRevalidate`.
- Jika perangkat tidak memiliki internet, `service-worker` akan menyajikan aplikasi dari cache lokal.

### 2. Vanilla JavaScript (No Framework)
- Untuk menjaga aplikasi tetap ringan dan *scalable* pada purwarupa awal, proyek ini murni menggunakan **Vanilla JavaScript**.
- Manipulasi DOM dan state management dilakukan secara manual menggunakan fungsi modular (di dalam folder `src/utils` dan `src/services`).

### 3. Local Data (JSON)
- Aplikasi **tidak menggunakan backend API atau Database Eksternal (SQL/NoSQL)**.
- Semua data yang diperlukan disimpan di dalam file `.json` lokal di dalam folder `src/data/`.
- File JSON ini akan di-fetch oleh Vanilla JS menggunakan `fetch()` saat aplikasi pertama kali dimuat, dan datanya akan ikut ter-cache oleh Service Worker.

### 4. LocalStorage
- Karena tidak ada autentikasi atau backend, *state* pengguna (seperti jawaban asesmen, profil lokal, dan histori) akan disimpan di `localStorage` atau `IndexedDB`.
- Ini memastikan bahwa setiap kali pengguna membuka aplikasi di browser yang sama, progress mereka tidak hilang.

## Alur Data (Data Flow)
1. **User Membuka Aplikasi:** Browser memuat `index.html`.
2. **Service Worker Aktif:** Jika offline, service worker mengambil data dari cache.
3. **Inisialisasi Data:** Script `main.js` membaca file `JSON` dari `src/data/` (seperti `majors.json`, `scholarships.json`).
4. **Interaksi:** User mengisi kuesioner. Vanilla JS menangkap input dan menyimpannya ke `localStorage`.
5. **Hasil:** Sistem membaca jawaban dari `localStorage`, memproses logika sederhana (di `src/services/`), dan menampilkan hasil rekomendasi jurusan.
