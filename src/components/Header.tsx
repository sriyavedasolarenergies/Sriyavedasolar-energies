import React, { useState } from 'react';
import { Menu, X, Sun, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', isRoute: true },
    { href: '#about', label: 'About' },
    { href: '#partner-banks', label: 'Partner Banks' },
    { href: '#services', label: 'Services' },
    { href: '#calculator', label: 'Calculator' },
    { href: '#quotation', label: 'Quotation' },
    { href: '/partners', label: 'Partners', isRoute: true },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-orange-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Sun className="h-8 w-8 text-orange-500 animate-pulse group-hover:scale-110 transition-all duration-300" />
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                SRIYAVEDA
              </h1>
              <p className="text-xs text-teal-400 -mt-1">SOLAR ENERGIES</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.isRoute ? (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className="text-white hover:text-orange-400 transition-colors duration-300 relative group"
                >
                  {item.label}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-orange-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-orange-400 transition-colors duration-300 relative group"
                >
                  {item.label}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-orange-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                </a>
              )
            ))}
          </nav>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-400 transition-colors p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-b border-orange-500/20 transition-all duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item.isRoute ? (
                <button
                  key={item.href}
                  onClick={() => {
                    navigate(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:text-orange-400 hover:bg-orange-500/10 rounded-md transition-all duration-300"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:text-orange-400 hover:bg-orange-500/10 rounded-md transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
