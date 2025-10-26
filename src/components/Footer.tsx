import React from 'react';
import { Sun, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const services = [
    'Residential Solar',
    'Commercial Solar', 
    'Industrial Solar',
    'Battery Storage',
    'System Monitoring',
    'Maintenance'
  ];

  const quickLinks = [
    'About Us',
    'Our Services',
    'Calculator',
    'Get Quote',
    'Track Order',
    'Contact'
  ];

  const locations = [
    'Bangalore',
    'Mumbai', 
    'Delhi',
    'Chennai',
    'Hyderabad',
    'Pune'
  ];

  return (
    <footer id="contact" className="bg-gradient-to-t from-black to-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
              <div className="relative">
                <Sun className="h-10 w-10 text-orange-500 animate-pulse group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                  SRIYAVEDA
                </h1>
                <p className="text-sm text-teal-400 -mt-1">SOLAR ENERGIES</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Leading solar energy solutions provider, transforming homes and businesses 
              with sustainable, cost-effective renewable energy systems across India.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">+91 9999999999</p>
                  <p className="text-sm text-gray-400">24/7 Customer Support</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">info@sriyavedasolar.com</p>
                  <p className="text-sm text-gray-400">Get Free Consultation</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Bangalore, Karnataka</p>
                  <p className="text-sm text-gray-400">Headquarters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Our Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center group">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Locations */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
            </h3>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold text-white mb-4">Service Areas</h4>
            <div className="grid grid-cols-2 gap-2">
              {locations.map((location, index) => (
                <span key={index} className="text-gray-400 text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media & CTA */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-white font-semibold">Follow Us:</span>
              {[
                { icon: Facebook, color: 'hover:text-blue-400' },
                { icon: Twitter, color: 'hover:text-sky-400' },
                { icon: Instagram, color: 'hover:text-pink-400' },
                { icon: Linkedin, color: 'hover:text-blue-500' }
              ].map((social, index) => (
                <a key={index} href="#" className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700`}>
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 group font-semibold">
                <span className="flex items-center space-x-2">
                  <span>Get Free Quote</span>
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="border-2 border-teal-400 text-teal-400 px-8 py-3 rounded-full hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 font-semibold">
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 Sriyaveda Solar Energies. All rights reserved. | 
              <span className="text-orange-400 ml-1">Powering India's Solar Revolution</span>
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Warranty</a>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg px-4 py-2">
              <span className="text-green-400 text-sm font-semibold">ISO 9001:2015</span>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg px-4 py-2">
              <span className="text-blue-400 text-sm font-semibold">MNRE Approved</span>
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg px-4 py-2">
              <span className="text-orange-400 text-sm font-semibold">BIS Certified</span>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg px-4 py-2">
              <span className="text-purple-400 text-sm font-semibold">25 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;