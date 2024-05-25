# Program Basis Data Terenkripsi dan Bertanda-tangan Digital dengan Menggunakan Algoritma RSA dan Fungsi hash SHA-3 ✨
Pada tugas ini kami membuat aplikasi berbasis web untuk mengimplementasikan as basis data yang terenkripsi dan bertanda tangan digital menggunakan algoritma RSA dan fungsi SHA-3. Aplikasi yang dibuat dapat menerima input nilai mata kuliah untuk setiap mahasiswa, membangkitkan kunci publik dan kunci privat, menandatangani setiap rekaman nilai mahasiswa, mengenkripsi seluruh field pada basis data, memverifikasi rekaman nilai mahasiswa yang sudah ditandatangani, menampilkan basis data dalam bentuk plainteks dan cipherteks, membuat file transkrip nilai mahasiswa dalam bentuk PDF yang dienkripsi, dan menerima file transkrip nilai untuk di deskripsi.

## Tugas Kecil 4 - II4031 Kriptografi dan Koding

## Algorithm

- RSA: Algoritma untuk membuat tanda tangan untuk setiap rekaman data dengan pembangkitan kunci publik dan kunci privat.
- SHA-3: Algoritma hashing untuk memverifikasi tanda tangan. (Implementasi Sendiri)
- Modified RC4: Algoritma RC4 yang digabungkan dengan Extended Vigenere. Algoritma ini digunakan untuk mengenkripsi field basis data
- AES: Algoritma untuk mengenkripsi dokumen transkrip nilai

## Fitur Aplikasi

- Menerima input data mahasiswa
- Menerima input data Mata Kuliah
- Menerima input data Nilai
- Membangkitkan kunci 
- Memberikan tanda tangan digital pada setia rekaman data
- Memverifikai tanda tangan digital
- Memberikan file transkrip nilai dengan format pdf yang terenkripsi
- Mendekripsi file transkrip nilai

## Instalasi

1. Clone repository

```bash
git clone https://github.com/gibranfsh/tugas-4-kriptografi-koding-digital-signature-website-with-encrypted-database.git
```

2. Move on to the project directory

```bash
cd tugas-4-kriptografi-koding-digital-signature-website-with-encrypted-database
```

3. Open the project with your favorite IDE (for me it's VSCode)

```bash
code .
```

4. Open a terminal and install the dependencies

```bash
npm install
```

5. Run the project in development mode (Make sure you have Node.js installed)

```bash
npm run dev
```
## Untuk Isi dari File .env bisa Langsung Hubungi Kami Yaaa :D karena Sangat Rahasia

## Makalah dari Aplikasi

Link : https://docs.google.com/document/d/1efTd_IITT0kZ93KYSRvFc3mF_hSxcghPu45zswTygh0/edit?usp=sharing

## Kontributor

- 18221055 - Mochamad Syahrial A.
- 18221069 - Gibran Fasha Ghazanfar
- 18221107 - Ken Azizan