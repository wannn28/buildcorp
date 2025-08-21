import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      id: 'building-construction',
      title: 'Konstruksi Gedung',
      description: 'Konstruksi gedung komersial, perkantoran, dan perumahan dengan desain modern dan teknologi terkini',
      icon: '🏢',
      gradient: 'from-orange-500 to-orange-600',
      features: [
        'Gedung Perkantoran & Komersial',
        'Perumahan & Apartemen',
        'Hotel & Resort',
        'Rumah Sakit & Klinik',
        'Sekolah & Universitas',
        'Gedung Olahraga'
      ],
      process: [
        'Konsultasi & Perencanaan',
        'Design & Engineering',
        'Konstruksi & Supervisi',
        'Quality Control',
        'Handover & Maintenance'
      ],
      projects: [
        'Gedung Perkantoran Central Park Jakarta',
        'Hotel Grand Indonesia',
        'Apartemen Taman Rasuna',
        'Rumah Sakit Medistra'
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastruktur',
      description: 'Pembangunan infrastruktur publik yang mendukung pertumbuhan ekonomi dan kesejahteraan masyarakat',
      icon: '🌉',
      gradient: 'from-green-500 to-green-600',
      features: [
        'Jalan Raya & Tol',
        'Jembatan & Flyover',
        'Pelabuhan & Bandara',
        'Bendungan & Irigasi',
        'Rel Kereta Api',
        'Instalasi Air & Sanitasi'
      ],
      process: [
        'Survey & Investigation',
        'Design & Planning',
        'Construction & Supervision',
        'Testing & Commissioning',
        'Operation & Maintenance'
      ],
      projects: [
        'Jembatan Suramadu Surabaya-Madura',
        'Tol Jakarta-Cikampek',
        'Pelabuhan Tanjung Priok',
        'Bendungan Jatigede'
      ]
    },
    {
      id: 'renovation',
      title: 'Renovasi & Perbaikan',
      description: 'Layanan renovasi dan perbaikan untuk gedung dan properti yang sudah ada dengan standar kualitas tinggi',
      icon: '🔧',
      gradient: 'from-purple-500 to-purple-600',
      features: [
        'Renovasi Gedung',
        'Perbaikan Struktur',
        'Upgrade Sistem MEP',
        'Interior & Exterior',
        'Restorasi Bangunan Tua',
        'Maintenance Rutin'
      ],
      process: [
        'Assessment & Survey',
        'Design & Planning',
        'Renovation & Repair',
        'Quality Assurance',
        'Final Inspection'
      ],
      projects: [
        'Renovasi Mall Taman Anggrek',
        'Restorasi Gedung Bappenas',
        'Upgrade Hotel Indonesia',
        'Perbaikan Masjid Istiqlal'
      ]
    },
    {
      id: 'consulting',
      title: 'Konsultasi Konstruksi',
      description: 'Layanan konsultasi profesional untuk perencanaan, manajemen, dan pengawasan proyek konstruksi',
      icon: '📋',
      gradient: 'from-blue-500 to-blue-600',
      features: [
        'Feasibility Study',
        'Project Management',
        'Cost Estimation',
        'Risk Assessment',
        'Quality Assurance',
        'Safety Management'
      ],
      process: [
        'Initial Consultation',
        'Project Analysis',
        'Solution Development',
        'Implementation Support',
        'Monitoring & Evaluation'
      ],
      projects: [
        'Konsultasi Proyek MRT Jakarta',
        'Project Management LRT Palembang',
        'Feasibility Study Bandara Kertajati',
        'Risk Assessment Bendungan Bener'
      ]
    },
    {
      id: 'project-management',
      title: 'Manajemen Proyek',
      description: 'Layanan manajemen proyek konstruksi dari awal hingga selesai dengan standar internasional',
      icon: '📊',
      gradient: 'from-red-500 to-red-600',
      features: [
        'Project Planning',
        'Schedule Management',
        'Resource Allocation',
        'Cost Control',
        'Risk Management',
        'Stakeholder Communication'
      ],
      process: [
        'Project Initiation',
        'Planning & Design',
        'Execution & Control',
        'Monitoring & Reporting',
        'Project Closure'
      ],
      projects: [
        'Manajemen Proyek MRT Jakarta',
        'Project Control LRT Jabodebek',
        'Construction Management Tol Trans Jawa',
        'EPC Management PLTU Jawa 7'
      ]
    },
    {
      id: 'maintenance',
      title: 'Pemeliharaan & Service',
      description: 'Layanan pemeliharaan rutin dan perbaikan untuk memastikan bangunan tetap berfungsi optimal',
      icon: '🛠️',
      gradient: 'from-yellow-500 to-yellow-600',
      features: [
        'Preventive Maintenance',
        'Corrective Maintenance',
        'Emergency Repair',
        'System Optimization',
        'Performance Monitoring',
        'Maintenance Planning'
      ],
      process: [
        'Inspection & Assessment',
        'Maintenance Planning',
        'Execution & Repair',
        'Testing & Verification',
        'Documentation & Reporting'
      ],
      projects: [
        'Maintenance Gedung BCA',
        'Service Hotel Mandarin Oriental',
        'Repair Mall Central Park',
        'Optimization PLTU Suralaya'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-900 to-orange-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Layanan Kami</h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            Berbagai layanan konstruksi yang kami tawarkan untuk memenuhi kebutuhan proyek Anda
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Solusi Lengkap Konstruksi</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dari perencanaan hingga pemeliharaan, kami menyediakan layanan konstruksi yang komprehensif dan berkualitas tinggi
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-48 bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                  <div className="text-6xl">{service.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link 
                    to={`#${service.id}`} 
                    className="text-orange-600 hover:text-orange-800 font-semibold inline-flex items-center"
                  >
                    Pelajari Lebih Lanjut 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center mb-6`}>
                  <div className="text-4xl">{service.icon}</div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{service.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{service.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Fitur Layanan</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Proses Kerja</h3>
                    <ul className="space-y-2">
                      {service.process.map((step, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                            {idx + 1}
                          </div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Proyek Terkait</h3>
                  <div className="space-y-4">
                    {service.projects.map((project, idx) => (
                      <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                        <span className="text-gray-700">{project}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Mengapa Memilih Kami?</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">15+ Tahun Pengalaman</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">Tim Ahli Bersertifikasi</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">Standar Kualitas Tinggi</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">Garansi Layanan</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Memulai Proyek?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Konsultasikan kebutuhan konstruksi Anda dengan tim ahli kami dan dapatkan solusi terbaik
          </p>
          <div className="space-x-4">
            <Link to="/contact" className="inline-block bg-white text-orange-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Konsultasi Gratis
            </Link>
            <Link to="/projects" className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Lihat Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
