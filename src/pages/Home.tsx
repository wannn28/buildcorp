import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-orange-900 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Membangun Masa Depan
              <span className="block text-orange-300">Bersama Kami</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
              Spesialis konstruksi terpercaya dengan pengalaman lebih dari 15 tahun dalam membangun infrastruktur berkualitas tinggi
            </p>
            <div className="space-x-4">
              <Link to="/projects" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg">
                Lihat Proyek Kami
              </Link>
              <Link to="/contact" className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tentang BuildCorp</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Perusahaan konstruksi terkemuka yang berkomitmen memberikan layanan terbaik dengan standar kualitas internasional
            </p>
            <Link to="/about" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Pelajari Lebih Lanjut
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kualitas Terjamin</h3>
              <p className="text-gray-600">Setiap proyek dikerjakan dengan standar kualitas tertinggi dan material terbaik</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tepat Waktu</h3>
              <p className="text-gray-600">Komitmen menyelesaikan proyek sesuai jadwal yang telah disepakati</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tim Ahli</h3>
              <p className="text-gray-600">Dibantu oleh tim profesional berpengalaman dan bersertifikasi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Layanan Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Berbagai layanan konstruksi yang kami tawarkan untuk memenuhi kebutuhan proyek Anda
            </p>
            <Link to="/services" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Lihat Semua Layanan
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Konstruksi Gedung</h3>
                <p className="text-gray-600 mb-4">Konstruksi gedung komersial, perkantoran, dan perumahan dengan desain modern</p>
                <Link to="/services" className="text-orange-600 hover:text-orange-800 font-semibold">Pelajari Lebih Lanjut →</Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Infrastruktur</h3>
                <p className="text-gray-600 mb-4">Pembangunan jalan, jembatan, dan infrastruktur publik lainnya</p>
                <Link to="/services" className="text-orange-600 hover:text-orange-800 font-semibold">Pelajari Lebih Lanjut →</Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Renovasi</h3>
                <p className="text-gray-600 mb-4">Layanan renovasi dan perbaikan untuk gedung dan properti yang sudah ada</p>
                <Link to="/services" className="text-orange-600 hover:text-orange-800 font-semibold">Pelajari Lebih Lanjut →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proyek Unggulan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Beberapa proyek terbaik yang telah kami selesaikan dengan sukses
            </p>
            <Link to="/projects" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Lihat Semua Proyek
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                <div className="h-64 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Gedung Perkantoran Central Park</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Gedung Perkantoran Central Park</h3>
                <p className="text-gray-600">Jakarta, 2023</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                <div className="h-64 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Jembatan Suramadu</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Jembatan Suramadu</h3>
                <p className="text-gray-600">Surabaya-Madura, 2022</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                <div className="h-64 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Mall Taman Anggrek</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Mall Taman Anggrek</h3>
                <p className="text-gray-600">Jakarta, 2021</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-orange-200">Proyek Selesai</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-orange-200">Tahun Pengalaman</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-orange-200">Tim Ahli</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-orange-200">Kepuasan Klien</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
