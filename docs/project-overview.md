# Project Overview: KARSA

**KARSA** (Konselor Karir Siswa Afirmasi) adalah sebuah purwarupa aplikasi *Digital Career Counselor* yang dikhususkan untuk siswa-siswi di daerah 3T (Tertinggal, Terdepan, dan Terluar). 
Target utama dari proyek ini adalah **Siswa SMA Terbuka Desa Kepau Baru**.

Proyek ini dibangun untuk mengikuti **LIDM 2026** dan berfokus pada solusi *Offline-First* karena tantangan infrastruktur internet di daerah 3T.

## Latar Belakang & Masalah
Siswa di daerah 3T seringkali mengalami:
1. Kurangnya motivasi untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.
2. Kesulitan mendapatkan informasi mengenai rekomendasi jurusan yang sesuai dengan minat dan bakat mereka.
3. Ketiadaan bimbingan khusus untuk persiapan beasiswa afirmasi (seperti KIP Kuliah atau Beasiswa ADik).

## Solusi yang Ditawarkan
KARSA hadir sebagai solusi digital tanpa memerlukan koneksi internet aktif (*Offline-First*). Aplikasi ini berfungsi untuk:
1. **Meningkatkan Motivasi:** Menyediakan cerita inspiratif dan pemahaman mengenai pentingnya pendidikan tinggi.
2. **Memberikan Rekomendasi Jurusan:** Menggunakan asesmen sederhana berbasis minat, bakat, dan kemampuan.
3. **Membantu Persiapan Beasiswa:** Menyediakan panduan langkah demi langkah untuk mempersiapkan pendaftaran beasiswa afirmasi.

## Spesifikasi Purwarupa (LIDM 2026)
- **Hanya Frontend:** Aplikasi ini tidak memiliki backend untuk memudahkan deployment sebagai aplikasi web statis / PWA.
- **Offline-First:** Menggunakan `vite-plugin-pwa` untuk menyimpan cache file sehingga aplikasi dapat dibuka tanpa internet.
- **Data Lokal:** Seluruh data profil, pertanyaan asesmen, dan informasi beasiswa menggunakan *local/dummy JSON*. Tidak menggunakan database eksternal.
- **Stack Teknologi:** Vanilla JavaScript, Vite, Tailwind CSS v4, PWA Plugin.
