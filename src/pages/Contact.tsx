import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [selectedSubject, setSelectedSubject] = useState('general');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  const subjects = [
    { id: 'general', name: 'Pertanyaan Umum' },
    { id: 'consultation', name: 'Konsultasi Proyek' },
    { id: 'quotation', name: 'Permintaan Penawaran' },
    { id: 'partnership', name: 'Kerjasama Bisnis' },
    { id: 'career', name: 'Lowongan Kerja' },
    { id: 'other', name: 'Lainnya' }
  ];

  const officeLocations = [
    {
      city: 'Jakarta Pusat',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat 10220',
      phone: '+62 21 1234 5678',
      email: 'jakarta@buildcorp.co.id',
      hours: 'Senin - Jumat: 08:00 - 17:00',
      coordinates: '🌍 -6.2088, 106.8456'
    },
    {
      city: 'Surabaya',
      address: 'Jl. Basuki Rahmat No. 45, Surabaya 60271',
      phone: '+62 31 2345 6789',
      email: 'surabaya@buildcorp.co.id',
      hours: 'Senin - Jumat: 08:00 - 17:00',
      coordinates: '🌍 -7.2575, 112.7521'
    },
    {
      city: 'Bandung',
      address: 'Jl. Asia Afrika No. 67, Bandung 40111',
      phone: '+62 22 3456 7890',
      email: 'bandung@buildcorp.co.id',
      hours: 'Senin - Jumat: 08:00 - 17:00',
      coordinates: '🌍 -6.9175, 107.6191'
    }
  ];

  const contactMethods = [
    {
      icon: '📞',
      title: 'Telepon',
      description: 'Hubungi kami langsung untuk konsultasi cepat',
      primary: '+62 21 1234 5678',
      secondary: '+62 21 1234 5679'
    },
    {
      icon: '✉️',
      title: 'Email',
      description: 'Kirim pesan detail melalui email',
      primary: 'info@buildcorp.co.id',
      secondary: 'support@buildcorp.co.id'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      description: 'Chat langsung dengan tim kami',
      primary: '+62 812-3456-7890',
      secondary: '24/7 Customer Service'
    },
    {
      icon: '📍',
      title: 'Kunjungi Kantor',
      description: 'Datang langsung ke kantor kami',
      primary: 'Jakarta, Surabaya, Bandung',
      secondary: 'Senin - Jumat, 08:00 - 17:00'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-900 to-orange-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            Siap untuk memulai proyek konstruksi Anda? Hubungi kami sekarang!
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cara Menghubungi Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilih metode yang paling nyaman untuk Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{method.description}</p>
                <div className="space-y-2">
                  <div className="font-semibold text-orange-600">{method.primary}</div>
                  <div className="text-sm text-gray-500">{method.secondary}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Masukkan email"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Perusahaan</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Masukkan nama perusahaan"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subjek *</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pesan *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tulis pesan Anda secara detail"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Kantor Pusat</h3>
                    <p className="text-gray-600">Jl. Sudirman No. 123, Jakarta Pusat 10220</p>
                    <p className="text-gray-600">Indonesia</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Telepon</h3>
                    <p className="text-gray-600">+62 21 1234 5678</p>
                    <p className="text-gray-600">+62 21 1234 5679</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">info@buildcorp.co.id</p>
                    <p className="text-gray-600">support@buildcorp.co.id</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Jam Kerja</h3>
                    <p className="text-gray-600">Senin - Jumat: 08:00 - 17:00 WIB</p>
                    <p className="text-gray-600">Sabtu: 08:00 - 12:00 WIB</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Butuh Bantuan Cepat?</h3>
                <p className="text-gray-600 mb-4">Untuk pertanyaan mendesak, hubungi hotline kami:</p>
                <div className="text-2xl font-bold text-orange-600">+62 812-3456-7890</div>
                <p className="text-sm text-gray-500">24/7 Customer Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lokasi Kantor Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami hadir di beberapa kota besar di Indonesia untuk melayani Anda dengan lebih baik
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{office.city}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-gray-600 text-sm">{office.address}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600 text-sm">{office.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600 text-sm">{office.email}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600 text-sm">{office.hours}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-orange-500 mr-3">{office.coordinates}</span>
                    <span className="text-gray-600 text-sm">Koordinat GPS</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pertanyaan Umum</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Berapa lama waktu respon untuk konsultasi?</h3>
                <p className="text-gray-600">Kami akan merespon dalam waktu maksimal 24 jam kerja untuk semua pertanyaan dan permintaan konsultasi.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Apakah konsultasi awal berbayar?</h3>
                <p className="text-gray-600">Konsultasi awal untuk proyek konstruksi adalah GRATIS. Kami akan memberikan analisis dan rekomendasi tanpa biaya.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Di area mana saja BuildCorp beroperasi?</h3>
                <p className="text-gray-600">Kami beroperasi di seluruh Indonesia dengan kantor pusat di Jakarta dan cabang di Surabaya dan Bandung.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Bagaimana proses kerja sama dengan BuildCorp?</h3>
                <p className="text-gray-600">Proses dimulai dengan konsultasi, perencanaan, penawaran, kontrak, eksekusi, hingga handover dan maintenance.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Apakah BuildCorp menyediakan garansi?</h3>
                <p className="text-gray-600">Ya, kami memberikan garansi untuk semua proyek sesuai dengan standar industri dan regulasi yang berlaku.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Bagaimana dengan keamanan dan keselamatan proyek?</h3>
                <p className="text-gray-600">Kami mengutamakan keselamatan dengan standar OHSAS 18001 dan tim safety officer yang bersertifikasi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Memulai Proyek?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Jangan ragu untuk menghubungi kami. Tim ahli kami siap membantu mewujudkan proyek konstruksi impian Anda.
          </p>
          <div className="space-x-4">
            <Link to="/services" className="inline-block bg-white text-orange-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Lihat Layanan
            </Link>
            <Link to="/projects" className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Portfolio Proyek
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
