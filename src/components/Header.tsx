import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
                BuildCorp
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                Beranda
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                Tentang Kami
              </Link>
              <Link 
                to="/services" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/services') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                Layanan
              </Link>
              <Link 
                to="/projects" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/projects') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                Proyek
              </Link>
              <Link 
                to="/contact" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/contact') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                Kontak
              </Link>
            </div>
            
            {/* Admin Section */}
            <div className="border-l border-gray-200 pl-8">
              <Link 
                to="/admin" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/admin') 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-500 hover:text-orange-600'
                }`}
              >
                🔧 Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
