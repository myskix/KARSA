# Design System

Aplikasi KARSA dirancang dengan antarmuka yang modern, bersih (clean), dan responsif agar mudah digunakan di perangkat mobile (yang kemungkinan besar adalah perangkat utama bagi siswa). Styling dibangun menggunakan **Tailwind CSS v4**.

## Warna Utama (Color Palette)

Tema warna merepresentasikan pendidikan, harapan, dan profesionalisme.

- **Primary (`bg-karsa-primary`):** `#2563eb` (Blue-600) - Warna utama untuk brand, header, dan tombol utama (Call to Action).
- **Secondary (`bg-karsa-secondary`):** `#1e40af` (Blue-800) - Warna aksen gelap untuk teks tebal atau elemen pendukung.
- **Accent (`bg-karsa-accent`):** `#f59e0b` (Amber-500) - Warna untuk highlight, lencana beasiswa, atau informasi penting.
- **Background (`bg-slate-50`):** `#f8fafc` - Warna dasar aplikasi yang bersih.
- **Surface (`bg-white`):** `#ffffff` - Warna card atau elemen overlay.
- **Text:** `#0f172a` (Slate-900) untuk teks utama, `#475569` (Slate-600) untuk teks sekunder/deskripsi.

## Tipografi

Menggunakan font standar *sans-serif* yang bersih, mudah dibaca, dan *user-friendly* (seperti *Inter* atau *system-ui*).
- **Heading 1:** Text 2xl, Bold, Slate-900 - Judul utama halaman.
- **Heading 2:** Text xl, Semi-bold, Slate-800 - Sub-judul bagian.
- **Body Text:** Text base, Regular, Slate-600 - Teks paragraf, tinggi baris lega (leading-relaxed).
- **Micro-copy / Label:** Text sm, Medium, Slate-500 - Label navigasi, tag kecil.

## Komponen Dasar (Vanilla JS + Tailwind)

Meskipun menggunakan Vanilla JS, struktur HTML dirancang modular agar mudah di-copy/paste atau di-*render* secara dinamis. Mengutamakan *Clean UI* dan *User Friendly* (ruang kosong/whitespace yang cukup, kontras warna yang baik).

- **Layout Utama:** Dibungkus dalam kontainer `.max-w-md .mx-auto .bg-slate-50 .min-h-screen .relative .shadow-2xl` untuk mensimulasikan layar *smartphone* modern di perangkat besar.
- **Header:** *Glassmorphism* dengan `.sticky .top-0 .z-50 .bg-white/80 .backdrop-blur-md .border-b .border-slate-200`.
- **Bottom Navigation:** Menu navigasi utama di bawah dengan `.fixed .bottom-0 .w-full .max-w-md .bg-white .border-t .border-slate-100 .flex .justify-around .pb-safe`.
- **Card:** `.bg-white .rounded-2xl .shadow-sm .border .border-slate-100 .p-5 .hover:shadow-md .transition-shadow` untuk menonjolkan area konten secara halus.
- **Button Primary:** `.w-full .bg-karsa-primary .text-white .py-3.5 .rounded-xl .font-semibold .active:scale-95 .transition-transform` - Besar dan mudah di-tap (touch-friendly).
- **Badge:** `.px-3 .py-1 .bg-blue-50 .text-blue-700 .rounded-full .text-xs .font-medium`.

## Aturan Responsivitas & UX
- **Mobile First & Clean:** Fokus pada satu layar *smartphone* (hingga lebar maksimal `max-w-md`). Ruang kosong (whitespace) digunakan secara maksimal untuk memisahkan informasi (menghindari desain yang sesak).
- **Touch Target:** Semua elemen yang bisa diklik (tombol, link, tab navigasi) minimal memiliki tinggi 44px atau padding yang memadai untuk kenyamanan sentuhan jari.
- **Feedback Visual:** Memberikan feedback (*hover* shadow, *active* scale) saat pengguna menyentuh/mengklik elemen interaktif.
