-- Tabel untuk menampung pesan pengunjung portofolio
CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('asia/jakarta', NOW())
);

-- Mengaktifkan Row Level Security (RLS) pada tabel
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Kebijakan akses: Mengizinkan pengunjung publik (role: anon) untuk membaca daftar pesan
CREATE POLICY "Allow public read messages" 
ON messages 
FOR SELECT 
TO anon 
USING (true);

-- Kebijakan akses: Mengizinkan pengunjung publik (role: anon) untuk mengirim pesan baru
CREATE POLICY "Allow public insert messages" 
ON messages 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Data awal (dummy messages)
INSERT INTO messages (name, email, message, created_at) VALUES
('Dimas Wahyu', 'dimas@kampus.id', 'Desain baru ini jauh lebih bersih dan nyaman dibaca.', NOW() - INTERVAL '1 day'),
('Siti Aisyah', 'siti@example.com', 'Portofolionya keren Kak Hendrik! Sukses selalu untuk program EKSIS!', NOW() - INTERVAL '3 hours'),
('Budi Santoso', 'budi@example.com', 'Inspiratif sekali buat kami mahasiswa baru.', NOW() - INTERVAL '30 minutes');
