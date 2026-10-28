# Portfolio Hendrik Tarigan

Website portofolio pribadi berbasis HTML5, CSS3, dan Vanilla JavaScript dengan integrasi cloud database Supabase.

## Fitur
- **Responsive Design**: Tata letak adaptif untuk smartphone, tablet, dan desktop.
- **Dark Mode**: Pilihan tema terang dan gelap dengan persistensi data di `localStorage`.
- **Kontak**: Pengiriman pesan langsung ke cloud database Supabase dengan validasi client-side dan sensor email otomatis.

## Tech Stack
- **Frontend**: HTML5 Semantik, CSS3 murni (Flexbox & CSS Grid), Vanilla JavaScript.
- **Database**: [Supabase](https://supabase.com) (PostgreSQL Cloud).
- **Icons**: Font Awesome 6.

## Struktur Direktori
```text
eksis-example/
├── index.html               # Halaman utama portofolio
├── supabase_schema.sql      # Skrip DDL tabel & RLS Supabase
├── README.md                # Dokumentasi proyek
├── .gitignore               # Konfigurasi file yang diabaikan Git
└── assets/
    ├── css/
    │   └── style.css        # Stylesheet utama & variabel tema
    ├── js/
    │   └── main.js          # Logika interaktif & koneksi Supabase
    └── img/
        └── profile.webp     # Foto profil
```

## Menjalankan Proyek Secara Lokal
Proyek ini berjalan murni di sisi browser tanpa memerlukan instalasi server lokal (XAMPP/Apache):
1. Buka folder ini di text editor (VS Code).
2. Buka `index.html` langsung di browser atau gunakan ekstensi **Live Server**.

## Konfigurasi Supabase
Secara default, website berjalan menggunakan data simulasi lokal. Untuk menghubungkan ke database Supabase pribadi:
1. Buat proyek baru di [Supabase](https://supabase.com).
2. Jalankan skrip `supabase_schema.sql` pada menu **SQL Editor** Supabase.
3. Salin **Project URL** dan **Anon Key** dari menu **Project Settings > API**.
4. Masukkan kredensial tersebut ke dalam objek `SUPABASE_CONFIG` di `assets/js/main.js`:
   ```javascript
   const SUPABASE_CONFIG = {
     url: 'https://PROJECT_ID.supabase.co',
     anonKey: 'ANON_PUBLIC_KEY'
   };
   ```

## Deployment
Proyek statis ini siap di-deploy secara instan ke [Vercel](https://vercel.com), GitHub Pages, atau Netlify cukup dengan menghubungkan repositori GitHub Anda.
