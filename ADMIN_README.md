# Admin Panel - BuildCorp Company Profile

## Overview
Admin panel untuk mengelola website profil perusahaan BuildCorp. Panel ini memungkinkan administrator untuk mengelola semua konten website tanpa perlu mengubah kode.

## Fitur Utama

### 🔐 Authentication
- Login dengan username dan password
- Demo credentials: `admin` / `admin123`
- Session management sederhana
- Logout functionality

### 🏗️ Manajemen Proyek
- **Tambah Proyek Baru**: Form lengkap untuk menambah proyek dengan semua detail
- **Edit Proyek**: Modifikasi informasi proyek yang sudah ada
- **Hapus Proyek**: Penghapusan proyek dari sistem
- **Tabel Proyek**: Tampilan semua proyek dengan informasi lengkap
- **Filter & Search**: Kemudahan dalam mencari proyek tertentu

**Field yang dapat dikelola:**
- Judul proyek
- Kategori (Konstruksi Gedung, Infrastruktur, Renovasi, dll)
- Tahun pelaksanaan
- Status (Selesai, Dalam Proses, Perencanaan)
- Lokasi
- Deskripsi
- Klien
- Jumlah tim
- Gambar/ikon proyek

### 🏢 Informasi Perusahaan
- **Visi & Misi**: Update visi dan misi perusahaan
- **Nilai-Nilai Perusahaan**: Tambah, edit, hapus nilai perusahaan
- **Perjalanan Kami**: Kelola milestone dan sejarah perusahaan
- **Tim Manajemen**: Update informasi tim manajemen

**Yang dapat dikelola:**
- Teks visi dan misi
- Daftar nilai perusahaan (tambah/hapus)
- Timeline sejarah perusahaan
- Profil tim manajemen (nama, jabatan, foto, bio)

### ⚙️ Manajemen Layanan
- **Tambah Layanan**: Buat layanan baru dengan fitur lengkap
- **Edit Layanan**: Modifikasi layanan yang sudah ada
- **Hapus Layanan**: Penghapusan layanan
- **Fitur Layanan**: Kelola fitur-fitur setiap layanan

**Field yang dapat dikelola:**
- Nama layanan
- Deskripsi
- Ikon layanan
- Fitur-fitur layanan
- Proses kerja
- Keuntungan

### 📝 Konten Website
- **Dokumen Perusahaan**: Upload, download, hapus dokumen
- **Proyek Unggulan**: Set proyek yang ditampilkan di halaman utama
- **Highlight Proyek**: Kelola poin-poin penting proyek unggulan

## Cara Akses

### 1. Login ke Admin Panel
- Buka website dan klik link "🔧 Admin" di header
- Atau langsung akses `/admin`
- Masukkan credentials:
  - **Username**: `admin`
  - **Password**: `admin123`

### 2. Navigasi
Setelah login, admin dapat menggunakan 4 tab utama:
- **Proyek**: Manajemen portfolio proyek
- **Informasi Perusahaan**: Update visi, misi, nilai, sejarah, tim
- **Layanan**: Manajemen layanan perusahaan
- **Konten Website**: Dokumen dan proyek unggulan

## Penggunaan

### Menambah Proyek Baru
1. Klik tab "Proyek"
2. Klik tombol "+ Tambah Proyek"
3. Isi form dengan lengkap
4. Klik "Simpan Proyek"

### Mengedit Informasi Perusahaan
1. Klik tab "Informasi Perusahaan"
2. Edit langsung pada field yang tersedia
3. Klik "Simpan Perubahan" di bagian bawah

### Mengelola Layanan
1. Klik tab "Layanan"
2. Edit langsung pada card layanan
3. Atau tambah layanan baru dengan tombol "+ Tambah Layanan"

### Upload Dokumen
1. Klik tab "Konten Website"
2. Di bagian "Dokumen Perusahaan"
3. Klik area upload untuk menambah dokumen baru

## Keamanan

### Authentication
- Login required untuk akses admin panel
- Session management sederhana
- Logout functionality

### Data Protection
- Semua perubahan tersimpan di state lokal
- Validasi input pada form
- Confirmation untuk aksi penting

## Teknologi

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks (useState)
- **Routing**: React Router DOM
- **Authentication**: Custom implementation

## Pengembangan Selanjutnya

### Fitur yang dapat ditambahkan:
- **Database Integration**: Koneksi ke backend/database
- **Image Upload**: Upload gambar proyek yang sebenarnya
- **User Management**: Multi-user admin dengan role berbeda
- **Audit Log**: Log semua perubahan yang dilakukan admin
- **Backup & Restore**: Backup data website
- **API Integration**: Koneksi ke sistem eksternal
- **Real-time Updates**: Live update tanpa refresh
- **Advanced Search**: Search dan filter yang lebih canggih

### Backend Requirements:
- REST API atau GraphQL
- Database (PostgreSQL, MySQL, MongoDB)
- File storage untuk dokumen dan gambar
- User authentication & authorization
- Data validation & sanitization

## Troubleshooting

### Masalah Umum:
1. **Tidak bisa login**: Pastikan username `admin` dan password `admin123`
2. **Form tidak tersimpan**: Klik tombol "Simpan Perubahan"
3. **Gambar tidak muncul**: Gunakan emoji atau URL gambar yang valid
4. **Data hilang setelah refresh**: Data tersimpan di state lokal, perlu backend untuk persist

### Solusi:
- Refresh halaman jika ada masalah
- Logout dan login kembali jika ada error
- Pastikan semua field required terisi
- Gunakan browser modern (Chrome, Firefox, Safari, Edge)

## Support

Untuk bantuan teknis atau pertanyaan tentang admin panel, hubungi tim development atau buat issue di repository project.

---

**Note**: Admin panel ini adalah prototype untuk demo. Untuk production, implementasikan backend yang proper dengan database dan security measures yang sesuai.
