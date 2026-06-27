# Data Schema

Aplikasi KARSA merupakan *Offline-First App* tanpa menggunakan database eksternal. Semua data direpresentasikan sebagai Array of Objects dalam file `.json` lokal di folder `src/data/`.

Berikut adalah rancangan struktur (schema) data utama:

## 1. `questions.json`
Menyimpan daftar pertanyaan asesmen minat dan bakat.

```json
[
  {
    "id": "q1",
    "category": "minat_sosial",
    "text": "Seberapa suka Anda membantu orang lain menyelesaikan masalah mereka?",
    "options": [
      { "label": "Sangat Suka", "value": 4 },
      { "label": "Suka", "value": 3 },
      { "label": "Kurang Suka", "value": 2 },
      { "label": "Tidak Suka", "value": 1 }
    ]
  }
]
```

## 2. `majors.json`
Menyimpan direktori jurusan atau program studi beserta kecocokan kategori minat.

```json
[
  {
    "id": "m1",
    "name": "Ilmu Kesejahteraan Sosial",
    "faculty": "FISIP",
    "description": "Mempelajari cara membantu individu, kelompok, dan masyarakat dalam memecahkan masalah sosial.",
    "related_categories": ["minat_sosial", "humaniora"],
    "prospects": ["Pekerja Sosial", "PNS", "Aktivis LSM"]
  }
]
```

## 3. `scholarships.json`
Menyimpan informasi jalur afirmasi atau beasiswa.

```json
[
  {
    "id": "s1",
    "name": "KIP Kuliah",
    "provider": "Kemdikbudristek",
    "description": "Bantuan biaya pendidikan dari pemerintah bagi lulusan SMA sederajat yang memiliki keterbatasan ekonomi.",
    "requirements": [
      "Siswa SMA/SMK/MA sederajat",
      "Memiliki KIP atau berasal dari keluarga miskin/rentan miskin",
      "Diterima di PTN atau PTS terakreditasi"
    ],
    "link": "https://kip-kuliah.kemdikbud.go.id/"
  },
  {
    "id": "s2",
    "name": "Beasiswa ADik (Afirmasi Pendidikan Tinggi)",
    "provider": "Puslapdik",
    "description": "Beasiswa khusus untuk siswa dari Papua, daerah 3T, dan anak TKI.",
    "requirements": [
      "Berasal dari daerah 3T (Kepau Baru termasuk)",
      "Lulusan SMA/SMK/sederajat tahun berjalan atau 1 tahun sebelumnya"
    ]
  }
]
```

## 4. `user_profile.json` (Local Storage Schema)
Data ini tidak berupa file, melainkan struktur JSON yang akan disimpan pada browser `localStorage`.

```json
{
  "name": "Budi",
  "school": "SMA Terbuka Kepau Baru",
  "assessment_completed": true,
  "scores": {
    "minat_sosial": 15,
    "teknik": 5
  },
  "recommended_majors": ["m1", "m3"],
  "saved_scholarships": ["s1"]
}
```
