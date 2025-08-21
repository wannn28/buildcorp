# 🏗️ BuildCorp - Company Profile Website

Website company profile modern untuk perusahaan kontraktor yang dibangun dengan React, TypeScript, dan Tailwind CSS.

## ✨ Fitur Utama

- **Design Modern & Responsif** - Menggunakan Tailwind CSS untuk styling yang konsisten
- **Navigation Bar** - Sticky navigation dengan smooth scrolling
- **Hero Section** - Background gradient yang menarik dengan call-to-action
- **About Section** - Informasi perusahaan dengan keunggulan utama
- **Services Section** - Layanan perusahaan dengan card design yang interaktif
- **Projects Section** - Portfolio proyek-proyek unggulan
- **Statistics Section** - Angka-angka penting perusahaan
- **Contact Section** - Form kontak dan informasi lengkap
- **Footer** - Informasi perusahaan dan social media links

## 🚀 Teknologi yang Digunakan

- **React 19** - Framework JavaScript modern
- **TypeScript** - Type safety dan developer experience yang lebih baik
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Build tool yang cepat dan modern
- **Responsive Design** - Mobile-first approach

## 📱 Responsif

Website dirancang dengan pendekatan mobile-first dan mendukung semua ukuran layar:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## 🎨 Design System

- **Color Palette**: Biru sebagai warna utama (#3B82F6)
- **Typography**: Inter font family untuk readability yang baik
- **Spacing**: Konsisten menggunakan Tailwind spacing scale
- **Components**: Reusable components dengan styling yang konsisten

## 🛠️ Instalasi & Penggunaan

### Prerequisites
- Node.js (versi 18 atau lebih baru)
- npm atau yarn

### Setup
```bash
# Clone repository
git clone <repository-url>
cd company_profile

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview
```

### Development
```bash
# Jalankan development server
npm run dev

# Linting
npm run lint

# Type checking
npm run build
```

## 📁 Struktur Proyek

```
company_profile/
├── public/                 # Static assets
├── src/
│   ├── App.tsx            # Main component
│   ├── App.css            # Custom styles
│   ├── index.css          # Global styles + Tailwind
│   ├── main.tsx           # Entry point
│   └── assets/            # Images dan assets
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies
```

## 🎯 Customization

### Mengubah Warna
Edit file `tailwind.config.js` untuk mengubah color palette:
```javascript
colors: {
  primary: {
    500: '#your-color-here',
    // ... other shades
  }
}
```

### Mengubah Konten
Edit file `src/App.tsx` untuk mengubah:
- Nama perusahaan
- Deskripsi
- Layanan
- Proyek
- Informasi kontak

### Mengubah Styling
- Gunakan Tailwind classes di `App.tsx`
- Tambahkan custom CSS di `App.css`
- Edit global styles di `index.css`

## 🌟 Fitur Tambahan yang Bisa Dikembangkan

- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Blog/News section
- [ ] Team member profiles
- [ ] Project gallery dengan filter
- [ ] Testimonial carousel
- [ ] Newsletter subscription
- [ ] Contact form backend integration
- [ ] SEO optimization
- [ ] Performance optimization

## 📞 Kontak

Untuk pertanyaan atau feedback, silakan hubungi:
- Email: info@buildcorp.co.id
- Phone: +62 21 1234 5678
- Address: Jl. Sudirman No. 123, Jakarta Pusat

## 📄 License

Proyek ini dibuat untuk tujuan demonstrasi dan dapat digunakan sebagai template untuk website company profile.

---

**BuildCorp** - Membangun Masa Depan Bersama Kami 🏗️✨
