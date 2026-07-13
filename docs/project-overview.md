# Project Overview: KARSA

**KARSA** (Konselor Karir Siswa Afirmasi) adalah sebuah purwarupa aplikasi *Offline-First Progressive Web App* (*Digital Career Counselor*) yang dikhususkan untuk pendampingan karier siswa-siswi di daerah 3T (Tertinggal, Terdepan, dan Terluar). Target utama dari proyek ini adalah **Siswa SMA Terbuka Desa Kepau Baru**.

Proyek ini dibangun untuk mengikuti **LIDM 2026** dan berfokus pada solusi teknologi yang adaptif terhadap tantangan infrastruktur internet dan perangkat keras di daerah 3T.

## Latar Belakang & Masalah
Siswa di daerah 3T seringkali mengalami:
1. Kurangnya motivasi untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.
2. Kesulitan mendapatkan informasi mengenai rekomendasi jurusan yang sesuai dengan minat dan bakat mereka.
3. Ketiadaan bimbingan khusus untuk persiapan beasiswa afirmasi (seperti KIP Kuliah atau Beasiswa ADik).

## Solusi yang Ditawarkan
KARSA hadir sebagai solusi digital interaktif yang dirancang khusus untuk memecahkan masalah tersebut. Aplikasi ini berfungsi untuk:
1. **Meningkatkan Motivasi:** Menyediakan cerita inspiratif dan pemahaman mengenai pentingnya pendidikan tinggi melalui fitur simulasi kehidupan (*Life Simulation*).
2. **Memberikan Rekomendasi Jurusan:** Menggunakan asesmen sederhana berbasis minat, bakat, dan kemampuan.
3. **Membantu Persiapan Beasiswa:** Menyediakan panduan langkah demi langkah dan pelacakan kelengkapan berkas untuk pendaftaran beasiswa afirmasi.

## Prinsip Utama Pengembangan
Dalam mengembangkan aplikasi ini, kami berpegang pada prinsip-prinsip berikut:
- **Offline First**: Berfungsi optimal tanpa bergantung pada konektivitas jaringan yang stabil.
- **Mobile First**: Desain difokuskan pada kenyamanan penggunaan di perangkat layar kecil.
- **Lightweight Application**: Ukuran aplikasi ditekan sekecil mungkin agar cepat diunduh.
- **Fast Loading**: Optimalisasi aset dan kode untuk memastikan waktu muat (*load time*) yang sangat singkat.
- **Modular Architecture**: Struktur kode yang terpisah dan terorganisir untuk mempermudah pengembangan lanjutan.
- **Progressive Web App**: Kemampuan untuk diinstal langsung ke perangkat tanpa melalui toko aplikasi formal.
- **Responsive Design**: Tampilan yang tetap elegan, rapi, dan adaptif saat dibuka dari peramban desktop maupun perangkat seluler.

## Spesifikasi Target Aplikasi
Untuk menyesuaikan dengan kondisi di lapangan, aplikasi KARSA dirancang dengan spesifikasi target teknis sebagai berikut:
- Ukuran *bundle* produksi di bawah 5 MB.
- Tetap dapat digunakan tanpa koneksi internet setelah instalasi pertama.
- Seluruh data MVP (*Minimum Viable Product*) berasal dari file JSON lokal dan *Local Storage*.
- Menggunakan JavaScript murni (Vanilla JS) dan Tailwind CSS agar ringan saat dijalankan pada perangkat spesifikasi rendah.
- Dioptimalkan khusus untuk *smartphone* Android kelas *entry-level*.
- Seluruh fitur inti tetap dapat digunakan secara penuh tanpa server (*backend*).
