import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminAuth from '../components/AdminAuth';
import { auth, authApi, type User } from '../services/api';

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

interface CompanyInfo {
  vision: string;
  mission: string;
  values: string[];
  history: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  management: Array<{
    name: string;
    position: string;
    photo: string;
    bio: string;
  }>;
  documents: Array<{
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  featuredProject: {
    title: string;
    description: string;
    image: string;
    highlights: string[];
  };
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  process: string[];
  benefits: string[];
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isLoggedIn());
  const [currentUser, setCurrentUser] = useState<User | null>(auth.getUser());
  const [activeTab, setActiveTab] = useState('projects');

  // Register modal state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regForm, setRegForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Sample data - in real app this would come from API/database
  const [projects, setProjects] = useState<Project[]>([
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
    }
  ]);

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    vision: 'Menjadi perusahaan konstruksi terdepan yang inovatif dan berkelanjutan di Indonesia',
    mission: 'Menyediakan layanan konstruksi berkualitas tinggi dengan teknologi terkini dan komitmen terhadap keselamatan dan lingkungan',
    values: [
      'Integritas dan Profesionalisme',
      'Inovasi dan Teknologi',
      'Keselamatan dan Kualitas',
      'Keberlanjutan dan Lingkungan',
      'Kolaborasi dan Tim Kerja'
    ],
    history: [
      {
        year: '2009',
        title: 'Pendirian Perusahaan',
        description: 'PT Konstruksi Maju didirikan dengan fokus pada proyek konstruksi skala menengah'
      },
      {
        year: '2015',
        title: 'Ekspansi Nasional',
        description: 'Memperluas layanan ke berbagai kota di Indonesia'
      },
      {
        year: '2020',
        title: 'Teknologi Digital',
        description: 'Implementasi teknologi BIM dan manajemen proyek digital'
      }
    ],
    management: [
      {
        name: 'Ir. Ahmad Suharto',
        position: 'Direktur Utama',
        photo: '👨‍💼',
        bio: 'Memiliki pengalaman 25 tahun di industri konstruksi dengan spesialisasi manajemen proyek besar'
      },
      {
        name: 'Ir. Siti Nurhaliza',
        position: 'Direktur Operasional',
        photo: '👩‍💼',
        bio: 'Ahli konstruksi dengan fokus pada keselamatan kerja dan standar kualitas internasional'
      }
    ],
    documents: [
      {
        name: 'SIUP Konstruksi',
        type: 'PDF',
        size: '2.5 MB',
        url: '#'
      },
      {
        name: 'Sertifikat ISO 9001:2015',
        type: 'PDF',
        size: '1.8 MB',
        url: '#'
      }
    ],
    featuredProject: {
      title: 'Gedung Perkantoran Central Park Jakarta',
      description: 'Proyek konstruksi gedung perkantoran modern 25 lantai dengan teknologi smart building',
      image: '🏢',
      highlights: ['25 Lantai', 'Smart Building System', 'Green Building', 'Parking 500+ Mobil']
    }
  });

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: 'Konstruksi Gedung',
      description: 'Layanan konstruksi gedung komersial, perkantoran, dan residensial',
      icon: '🏢',
      features: ['Design & Build', 'Renovasi', 'Pemeliharaan'],
      process: ['Perencanaan', 'Desain', 'Konstruksi', 'Quality Control'],
      benefits: ['Efisien Waktu', 'Kualitas Terjamin', 'Harga Kompetitif']
    }
  ]);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openEditModal = (item: any, type: string) => {
    if (type === 'project') {
      setSelectedProject(item);
      setIsEditModalOpen(true);
    } else if (type === 'service') {
      setSelectedService(item);
      setIsEditModalOpen(true);
    }
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProject(null);
    setSelectedService(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentUser(auth.getUser());
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentUser(auth.getUser());
  };

  const handleLogout = async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    auth.clearTokens();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (regForm.password !== regForm.confirmPassword) {
      setRegError('Password dan konfirmasi password tidak cocok');
      return;
    }
    if (regForm.password.length < 6) {
      setRegError('Password minimal 6 karakter');
      return;
    }

    setRegLoading(true);
    try {
      await authApi.register({
        username: regForm.username,
        email: regForm.email,
        password: regForm.password,
        role: 'admin',
      });
      setRegSuccess(`Admin "${regForm.username}" berhasil didaftarkan`);
      setRegForm({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (err: unknown) {
      setRegError(err instanceof Error ? err.message : 'Gagal mendaftarkan admin');
    } finally {
      setRegLoading(false);
    }
  };

  // Show authentication if not logged in
  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              {currentUser && (
                <span className="text-sm text-gray-500">
                  Halo, <strong>{currentUser.username}</strong>
                </span>
              )}
              <button
                onClick={() => { setIsRegisterOpen(true); setRegError(''); setRegSuccess(''); }}
                className="bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
              >
                + Tambah Admin
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 rounded-md"
              >
                Logout
              </button>
              <Link to="/" className="text-orange-600 hover:text-orange-800 text-sm">
                ← Kembali ke Website
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'projects', name: 'Proyek', icon: '🏗️' },
              { id: 'company', name: 'Informasi Perusahaan', icon: '🏢' },
              { id: 'services', name: 'Layanan', icon: '⚙️' },
              { id: 'content', name: 'Konten Website', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Projects Management */}
          {activeTab === 'projects' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Manajemen Proyek</h2>
                <button
                  onClick={openAddModal}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  + Tambah Proyek
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proyek
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tahun
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">{project.image}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{project.title}</div>
                              <div className="text-sm text-gray-500">{project.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {project.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.status === 'Selesai' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {project.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => openEditModal(project, 'project')}
                            className="text-orange-600 hover:text-orange-900 mr-3"
                          >
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Company Information Management */}
          {activeTab === 'company' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informasi Perusahaan</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Vision & Mission */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Visi & Misi</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Visi</label>
                        <textarea
                          value={companyInfo.vision}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Misi</label>
                        <textarea
                          value={companyInfo.mission}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Values */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Nilai-Nilai Perusahaan</h3>
                    <div className="space-y-2">
                      {companyInfo.values.map((value, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={value}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          />
                          <button className="text-red-600 hover:text-red-800">×</button>
                        </div>
                      ))}
                      <button className="text-orange-600 hover:text-orange-800 text-sm">
                        + Tambah Nilai
                      </button>
                    </div>
                  </div>
                </div>

                {/* History & Management */}
                <div className="space-y-6">
                  {/* Company History */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Perjalanan Kami</h3>
                    <div className="space-y-3">
                      {companyInfo.history.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <input
                              type="text"
                              value={item.year}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                            <input
                              type="text"
                              value={item.title}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded"
                            />
                            <button className="text-red-600 hover:text-red-800">×</button>
                          </div>
                          <textarea
                            value={item.description}
                            className="w-full mt-2 px-2 py-1 border border-gray-300 rounded text-sm"
                            rows={2}
                          />
                        </div>
                      ))}
                      <button className="text-orange-600 hover:text-orange-800 text-sm">
                        + Tambah Milestone
                      </button>
                    </div>
                  </div>

                  {/* Management Team */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Tim Manajemen</h3>
                    <div className="space-y-3">
                      {companyInfo.management.map((member, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center space-x-3 mb-2">
                            <input
                              type="text"
                              value={member.photo}
                              className="w-12 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                            <input
                              type="text"
                              value={member.name}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded"
                            />
                            <button className="text-red-600 hover:text-red-800">×</button>
                          </div>
                          <input
                            type="text"
                            value={member.position}
                            className="w-full mb-2 px-2 py-1 border border-gray-300 rounded"
                            placeholder="Jabatan"
                          />
                          <textarea
                            value={member.bio}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            rows={2}
                            placeholder="Biografi"
                          />
                        </div>
                      ))}
                      <button className="text-orange-600 hover:text-orange-800 text-sm">
                        + Tambah Member
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* Services Management */}
          {activeTab === 'services' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Manajemen Layanan</h2>
                <button
                  onClick={openAddModal}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  + Tambah Layanan
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-3xl">{service.icon}</div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={service.title}
                          className="w-full px-2 py-1 border border-gray-300 rounded font-medium"
                        />
                      </div>
                    </div>
                    
                    <textarea
                      value={service.description}
                      className="w-full mb-3 px-2 py-1 border border-gray-300 rounded text-sm"
                      rows={2}
                    />
                    
                    <div className="space-y-2 mb-4">
                      <label className="block text-xs font-medium text-gray-700">Fitur:</label>
                      {service.features.map((feature, index) => (
                        <input
                          key={index}
                          type="text"
                          value={feature}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(service, 'service')}
                        className="text-orange-600 hover:text-orange-800 text-sm"
                      >
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Management */}
          {activeTab === 'content' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Konten Website</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Company Documents */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Dokumen Perusahaan</h3>
                  <div className="space-y-3">
                    {companyInfo.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">📄</span>
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-500">{doc.type} • {doc.size}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                          <button className="text-red-600 hover:text-red-800 text-sm">Hapus</button>
                        </div>
                      </div>
                    ))}
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-500 hover:text-gray-700 hover:border-gray-400">
                      + Upload Dokumen Baru
                    </button>
                  </div>
                </div>

                {/* Featured Project */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Proyek Unggulan</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <input
                        type="text"
                        value={companyInfo.featuredProject.image}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-2xl"
                      />
                      <input
                        type="text"
                        value={companyInfo.featuredProject.title}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded font-medium"
                      />
                    </div>
                    
                    <textarea
                      value={companyInfo.featuredProject.description}
                      className="w-full mb-3 px-2 py-1 border border-gray-300 rounded text-sm"
                      rows={3}
                    />
                    
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Highlight:</label>
                      {companyInfo.featuredProject.highlights.map((highlight, index) => (
                        <input
                          key={index}
                          type="text"
                          value={highlight}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Tambah Proyek Baru</h2>
                <button
                  onClick={closeAddModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Proyek</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nama proyek"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
                      <option>Konstruksi Gedung</option>
                      <option>Infrastruktur</option>
                      <option>Renovasi</option>
                      <option>Komersial</option>
                      <option>Perumahan</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
                      <option>Selesai</option>
                      <option>Dalam Proses</option>
                      <option>Perencanaan</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Kota, Provinsi"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    rows={3}
                    placeholder="Deskripsi detail proyek"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Klien</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nama klien"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tim</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Jumlah tim"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeAddModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    Simpan Proyek
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Register Admin Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Daftarkan Admin Baru</h2>
                <button
                  onClick={() => setIsRegisterOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    required
                    minLength={3}
                    maxLength={50}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Minimal 3 karakter"
                    value={regForm.username}
                    onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="email@contoh.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Minimal 6 karakter"
                    value={regForm.password}
                    onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Ulangi password"
                    value={regForm.confirmPassword}
                    onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                  />
                </div>

                {regError && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{regError}</div>
                )}
                {regSuccess && (
                  <div className="text-green-700 text-sm bg-green-50 p-3 rounded-md">{regSuccess}</div>
                )}

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {regLoading ? 'Mendaftarkan...' : 'Daftarkan Admin'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
