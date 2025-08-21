import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const companyFiles = [
    { name: 'Company Profile 2024.pdf', size: '2.5 MB', type: 'PDF' },
    { name: 'Company Brochure.pdf', size: '1.8 MB', type: 'PDF' },
    { name: 'ISO Certificate.pdf', size: '3.2 MB', type: 'PDF' },
    { name: 'Company License.pdf', size: '1.5 MB', type: 'PDF' },
    { name: 'Safety Guidelines.pdf', size: '2.1 MB', type: 'PDF' },
    { name: 'Quality Policy.pdf', size: '1.2 MB', type: 'PDF' }
  ];

  const teamMembers = [
    {
      name: 'Ir. Ahmad Suharto',
      position: 'CEO & Founder',
      experience: '20+ tahun',
      education: 'S1 Teknik Sipil - ITB',
      image: '👨‍💼'
    },
    {
      name: 'Diana Putri, ST',
      position: 'Director of Operations',
      experience: '15+ tahun',
      education: 'S1 Teknik Sipil - UI',
      image: '👩‍💼'
    },
    {
      name: 'Budi Santoso, ST, MT',
      position: 'Technical Director',
      experience: '18+ tahun',
      education: 'S2 Teknik Sipil - ITB',
      image: '👨‍🔬'
    },
    {
      name: 'Sarah Wijaya, SE',
      position: 'Finance Director',
      experience: '12+ tahun',
      education: 'S1 Ekonomi - UGM',
      image: '👩‍💻'
    }
  ];

  const milestones = [
    { year: '2009', title: 'Pendirian Perusahaan', description: 'BuildCorp didirikan dengan visi menjadi perusahaan konstruksi terkemuka' },
    { year: '2012', title: 'Proyek Pertama', description: 'Menyelesaikan proyek gedung perkantoran pertama di Jakarta' },
    { year: '2015', title: 'Ekspansi Regional', description: 'Memperluas layanan ke beberapa kota besar di Indonesia' },
    { year: '2018', title: 'Sertifikasi ISO', description: 'Mendapatkan sertifikasi ISO 9001:2015 untuk Quality Management' },
    { year: '2020', title: 'Proyek Infrastruktur', description: 'Memulai proyek infrastruktur skala besar' },
    { year: '2024', title: '15 Tahun Berdiri', description: 'Merayakan 15 tahun berdedikasi dalam industri konstruksi' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-900 to-orange-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang BuildCorp</h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            Lebih dari 15 tahun berdedikasi dalam membangun infrastruktur berkualitas tinggi untuk Indonesia
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visi & Misi Kami</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-orange-600 mb-3">Visi</h3>
                  <p className="text-gray-600">Menjadi perusahaan konstruksi terkemuka yang diakui secara nasional dan internasional, dengan komitmen tinggi terhadap kualitas, inovasi, dan keberlanjutan.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-600 mb-3">Misi</h3>
                  <p className="text-gray-600">Memberikan layanan konstruksi berkualitas tinggi dengan standar internasional, mengutamakan keselamatan, ketepatan waktu, dan kepuasan pelanggan.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nilai-Nilai Perusahaan</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Integritas & Profesionalisme</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Inovasi & Kreativitas</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Keselamatan & Lingkungan</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Kolaborasi & Tim Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perjalanan Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dari perusahaan kecil hingga menjadi salah satu perusahaan konstruksi terkemuka di Indonesia
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-orange-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Manajemen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dipimpin oleh tim profesional berpengalaman dengan latar belakang pendidikan dan sertifikasi yang kuat
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-2">{member.position}</p>
                <p className="text-sm text-gray-600 mb-2">{member.experience} pengalaman</p>
                <p className="text-sm text-gray-600">{member.education}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Files */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dokumen Perusahaan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download dokumen-dokumen resmi perusahaan untuk informasi lebih lanjut
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyFiles.map((file, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{file.type}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{file.name}</h3>
                <p className="text-gray-600 mb-4">Ukuran: {file.size}</p>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sertifikasi & Penghargaan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bukti komitmen kami terhadap kualitas dan standar internasional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ISO 9001:2015</h3>
              <p className="text-gray-600">Quality Management System</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">OHSAS 18001</h3>
              <p className="text-gray-600">Occupational Health & Safety</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ISO 14001</h3>
              <p className="text-gray-600">Environmental Management</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Bekerja Sama?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Mari kita diskusikan proyek konstruksi Anda dan bagaimana BuildCorp dapat membantu mewujudkan visi Anda
          </p>
          <div className="space-x-4">
            <Link to="/contact" className="inline-block bg-white text-orange-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Hubungi Kami
            </Link>
            <Link to="/projects" className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Lihat Proyek
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
