import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  client: string;
  status: string;
  image: string;
  images: string[];
  features: string[];
  team: string;
  challenges: string;
  solutions: string;
}

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'building', name: 'Konstruksi Gedung' },
    { id: 'infrastructure', name: 'Infrastruktur' },
    { id: 'renovation', name: 'Renovasi' },
    { id: 'commercial', name: 'Komersial' },
    { id: 'residential', name: 'Perumahan' }
  ];

  const years = [
    { id: 'all', name: 'Semua Tahun' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' },
    { id: '2021', name: '2021' },
    { id: '2020', name: '2020' }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Gedung Perkantoran Central Park Jakarta',
      category: 'building',
      year: '2023',
      location: 'Jakarta Pusat',
      description: 'Gedung perkantoran modern 25 lantai dengan desain sustainable dan teknologi smart building',
      client: 'Central Park Development',
      status: 'Selesai',
      image: '🏢',
      images: ['🏢', '🏗️', '🔨', '📐', '🏢', '🎯'],
      features: ['25 Lantai', 'Smart Building System', 'Green Building', 'Parking 500+ Mobil'],
      team: '150+ Orang',
      challenges: 'Konstruksi di area padat penduduk dengan traffic tinggi',
      solutions: 'Implementasi teknologi prefab dan manajemen traffic yang ketat'
    },
    {
      id: 2,
      title: 'Jembatan Suramadu Surabaya-Madura',
      category: 'infrastructure',
      year: '2022',
      location: 'Surabaya-Madura',
      description: 'Jembatan terpanjang di Indonesia yang menghubungkan Pulau Jawa dan Madura',
      client: 'Kementerian PUPR',
      status: 'Selesai',
      image: '🌉',
      images: ['🌉', '🌊', '🚧', '🔧', '🌉', '📏'],
      features: ['Panjang 5.4 KM', '6 Lajur', 'Anti Korosi', 'Tahan Gempa'],
      team: '500+ Orang',
      challenges: 'Konstruksi di laut dengan kondisi cuaca ekstrem',
      solutions: 'Penggunaan material khusus anti korosi dan teknologi floating crane'
    },
    {
      id: 3,
      title: 'Mall Taman Anggrek Jakarta',
      category: 'renovation',
      year: '2021',
      location: 'Jakarta Barat',
      description: 'Renovasi total mall dengan penambahan area retail dan entertainment',
      client: 'Taman Anggrek Development',
      status: 'Selesai',
      image: '🏬',
      images: ['🏬', '🛠️', '🎨', '🔨', '🏬', '✨'],
      features: ['Renovasi Total', 'Area Retail Baru', 'Entertainment Center', 'Parking System'],
      team: '200+ Orang',
      challenges: 'Renovasi tanpa menghentikan operasional mall',
      solutions: 'Phased construction dan night shift untuk area yang tidak aktif'
    },
    {
      id: 4,
      title: 'Hotel Grand Indonesia Jakarta',
      category: 'building',
      year: '2023',
      location: 'Jakarta Pusat',
      description: 'Hotel bintang 5 dengan 500 kamar dan fasilitas luxury',
      client: 'Grand Indonesia Group',
      status: 'Dalam Proses',
      image: '🏨',
      images: ['🏨', '🏗️', '🔨', '📐', '🏨', '🎯'],
      features: ['500 Kamar', 'Luxury Facilities', 'Restaurant & Bar', 'Conference Center'],
      team: '300+ Orang',
      challenges: 'Konstruksi di area heritage dengan batasan tinggi',
      solutions: 'Design yang mengikuti regulasi heritage dan penggunaan material premium'
    },
    {
      id: 5,
      title: 'Apartemen Taman Rasuna Jakarta',
      category: 'residential',
      year: '2022',
      location: 'Jakarta Selatan',
      description: 'Kompleks apartemen modern dengan 800 unit dan fasilitas lengkap',
      client: 'Rasuna Development',
      status: 'Selesai',
      image: '🏢',
      images: ['🏢', '🏗️', '🔨', '📐', '🏢', '🎯'],
      features: ['800 Unit', 'Swimming Pool', 'Gym & Spa', 'Security System'],
      team: '250+ Orang',
      challenges: 'Konstruksi di area padat dengan batasan waktu',
      solutions: 'Modular construction dan 24/7 work schedule'
    },
    {
      id: 6,
      title: 'Tol Jakarta-Cikampek',
      category: 'infrastructure',
      year: '2021',
      location: 'Jakarta-Bekasi',
      description: 'Pembangunan tol 6 lajur dengan sistem electronic toll collection',
      client: 'Jasa Marga',
      status: 'Selesai',
      image: '🛣️',
      images: ['🛣️', '🚧', '🔧', '📏', '🛣️', '🎯'],
      features: ['6 Lajur', 'ETC System', 'Rest Area', 'Emergency Lane'],
      team: '400+ Orang',
      challenges: 'Konstruksi di area pertanian dengan banyak sungai',
      solutions: 'Teknologi precast dan sistem drainase yang canggih'
    },
    {
      id: 7,
      title: 'Pelabuhan Tanjung Priok Jakarta',
      category: 'infrastructure',
      year: '2020',
      location: 'Jakarta Utara',
      description: 'Modernisasi pelabuhan dengan kapasitas 7.5 juta TEU per tahun',
      client: 'Pelindo II',
      status: 'Selesai',
      image: '🚢',
      images: ['🚢', '🌊', '🔧', '📐', '🚢', '🎯'],
      features: ['7.5 Juta TEU', 'Automated System', 'Deep Water Port', 'Container Yard'],
      team: '350+ Orang',
      challenges: 'Konstruksi di laut dengan kedalaman 16 meter',
      solutions: 'Teknologi caisson dan floating dock untuk konstruksi laut'
    },
    {
      id: 8,
      title: 'Rumah Sakit Medistra Jakarta',
      category: 'building',
      year: '2021',
      location: 'Jakarta Selatan',
      description: 'Rumah sakit modern dengan 300 tempat tidur dan teknologi medis terkini',
      client: 'Medistra Foundation',
      status: 'Selesai',
      image: '🏥',
      images: ['🏥', '🏗️', '🔨', '📐', '🏥', '🎯'],
      features: ['300 Tempat Tidur', 'ICU & NICU', 'Operation Theater', 'Medical Equipment'],
      team: '180+ Orang',
      challenges: 'Konstruksi dengan standar medis yang sangat ketat',
      solutions: 'Implementasi clean room technology dan medical grade materials'
    },
    {
      id: 9,
      title: 'Bendungan Jatigede Jawa Barat',
      category: 'infrastructure',
      year: '2020',
      location: 'Sumedang, Jawa Barat',
      description: 'Bendungan terbesar kedua di Indonesia dengan kapasitas 1.6 miliar m³',
      client: 'Kementerian PUPR',
      status: 'Selesai',
      image: '💧',
      images: ['💧', '🏔️', '🔧', '📏', '💧', '🎯'],
      features: ['1.6 Miliar m³', 'PLTA 110 MW', 'Irigasi 90.000 Ha', 'Flood Control'],
      team: '600+ Orang',
      challenges: 'Konstruksi di area pegunungan dengan kondisi geologi kompleks',
      solutions: 'Geotechnical investigation mendalam dan slope stabilization'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const yearMatch = selectedYear === 'all' || project.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectDetail = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-900 to-orange-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfolio Proyek</h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            Lebih dari 150 proyek konstruksi yang telah kami selesaikan dengan sukses
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year.id} value={year.id}>{year.name}</option>
                ))}
              </select>
            </div>
            
            <div className="text-gray-600">
              Menampilkan {filteredProjects.length} dari {projects.length} proyek
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <div className="text-6xl">{project.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-orange-600 font-medium">{project.category}</span>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Lokasi:</span>
                      <span className="text-gray-700">{project.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Klien:</span>
                      <span className="text-gray-700">{project.client}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tim:</span>
                      <span className="text-gray-700">{project.team}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Selesai' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                    <button 
                      onClick={() => openProjectDetail(project)}
                      className="text-orange-600 hover:text-orange-800 font-semibold text-sm cursor-pointer"
                    >
                      Lihat Detail →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Proyek Ditemukan</h3>
              <p className="text-gray-600">Coba ubah filter pencarian Anda</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Statistik Proyek</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pencapaian dan milestone yang telah kami raih dalam 15 tahun terakhir
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">150+</div>
              <div className="text-gray-600">Proyek Selesai</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">Rp 15+ T</div>
              <div className="text-gray-600">Total Nilai Proyek</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-gray-600">Kota di Indonesia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Kepuasan Klien</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Proyek Unggulan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gedung Perkantoran Central Park Jakarta - Proyek terbesar kami tahun 2023
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="h-96 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <div className="text-8xl">🏢</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Gedung Perkantoran Central Park Jakarta</h3>
                <p className="text-gray-600 mb-6">
                  Proyek konstruksi gedung perkantoran modern 25 lantai dengan teknologi smart building dan sustainable design.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">Tim</div>
                    <div className="font-semibold text-gray-900">150+ Orang</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="font-semibold text-green-600">Selesai</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Kategori</div>
                    <div className="font-semibold text-gray-900">Konstruksi Gedung</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Tahun</div>
                    <div className="font-semibold text-gray-900">2023</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Fitur Utama:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• 25 Lantai</div>
                    <div>• Smart Building System</div>
                    <div>• Green Building</div>
                    <div>• Parking 500+ Mobil</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Memulai Proyek Bersama Kami?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Berdasarkan track record kami, kami siap membantu mewujudkan proyek konstruksi impian Anda
          </p>
          <div className="space-x-4">
            <Link to="/contact" className="inline-block bg-white text-orange-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Konsultasi Gratis
            </Link>
            <Link to="/services" className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Lihat Layanan
            </Link>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button
                  onClick={closeProjectDetail}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Informasi Proyek</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Kategori:</span>
                      <span className="text-gray-700">{selectedProject.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tahun:</span>
                      <span className="text-gray-700">{selectedProject.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Lokasi:</span>
                      <span className="text-gray-700">{selectedProject.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Klien:</span>
                      <span className="text-gray-700">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tim:</span>
                      <span className="text-gray-700">{selectedProject.team}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedProject.status === 'Selesai' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Deskripsi</h3>
                  <p className="text-gray-600 text-sm">{selectedProject.description}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Fitur Utama</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, index) => (
                    <div key={index} className="text-sm text-gray-600">• {feature}</div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Tantangan & Solusi</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 font-medium">Tantangan:</span>
                    <span className="text-gray-700 ml-2">{selectedProject.challenges}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Solusi:</span>
                    <span className="text-gray-700 ml-2">{selectedProject.solutions}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Galeri Proyek</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedProject.images.map((image, index) => (
                    <div key={index} className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <div className="text-4xl">{image}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
