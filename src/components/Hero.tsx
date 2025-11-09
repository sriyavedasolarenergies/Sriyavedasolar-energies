import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Sun, Moon, Battery, Leaf } from 'lucide-react';

const Hero = () => {
  const [animationActive, setAnimationActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  useEffect(() => {
    setAnimationActive(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const features = [
    { icon: Sun, text: 'Solar Installation', color: 'text-orange-400' },
    { icon: Battery, text: 'Energy Storage', color: 'text-green-400' },
    { icon: Leaf, text: 'Eco-Friendly', color: 'text-teal-400' },
    { icon: Zap, text: 'Grid Connection', color: 'text-yellow-400' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Theme Toggle Button */}
      <div className="absolute top-20 right-4 z-30">
        <button
          onClick={toggleTheme}
          className={`relative group p-3 rounded-full border-2 transition-all duration-300 hover:scale-110 ${isDarkMode ? 'border-black' : 'border-orange-500'}`}
        >
          <div className="relative">
            {isDarkMode ? (
              <Moon className="h-6 w-6 text-white group-hover:animate-spin transition-all duration-500" />
            ) : (
              <Sun className="h-6 w-6 text-orange-500 group-hover:animate-spin transition-all duration-500" />
            )}
          </div>
        </button>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Solar Panels */}
        <div className="hidden lg:block absolute top-20 left-10 w-16 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md transform rotate-12 animate-pulse opacity-20"></div>
        <div className="hidden lg:block absolute top-40 right-20 w-20 h-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md transform -rotate-12 animate-pulse opacity-20 animation-delay-1000"></div>
        <div className="hidden lg:block absolute bottom-40 left-20 w-14 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md transform rotate-45 animate-pulse opacity-20 animation-delay-2000"></div>

        {/* Sun Rays */}
        <div className="hidden lg:block absolute top-20 right-10 w-32 h-32">
          <div className="absolute inset-0 bg-gradient-radial from-orange-400 to-transparent opacity-10 rounded-full animate-ping animation-delay-500"></div>
        </div>

        {/* Energy Flow Lines */}
        <div className="absolute inset-0 hidden lg:block">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 bg-gradient-to-t from-transparent via-orange-400 to-transparent opacity-30 animate-pulse`}
              style={{
                left: `${20 + i * 15}%`,
                height: '100%',
                animationDelay: `${i * 500}ms`,
                transform: `rotate(${Math.random() * 20 - 10}deg)`
              }}
            ></div>
          ))}
        </div>
        
        {/* Mobile-friendly background elements */}
        <div className="absolute inset-0 md:hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-20 bg-gradient-to-t from-transparent via-orange-400 to-transparent opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-16 bg-gradient-to-t from-transparent via-teal-400 to-transparent opacity-20 animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-12 bg-gradient-to-t from-transparent via-yellow-400 to-transparent opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${animationActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Logo Area */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="relative group">
                <Sun className="h-16 w-16 text-orange-500 animate-pulse group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  SRIYAVEDA
                </h1>
                <p className="text-xl md:text-2xl text-teal-400 font-semibold">
                  SOLAR ENERGIES
                </p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Power Your Future with
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              {' '}Clean Energy
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your home or business with premium solar installations. 
            Save money, reduce carbon footprint, and join the renewable energy revolution.
          </p>

          {/* Feature Icons */}
          <div className="flex justify-center space-x-8 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 ${
                  animationActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <feature.icon className={`h-8 w-8 ${feature.color} group-hover:animate-bounce transition-all duration-300`} />
                  <div className={`absolute inset-0 bg-current rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                </div>
                <span className="text-sm text-gray-400 mt-2 group-hover:text-white transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center space-x-2">
              <span className="font-semibold">Get Free Quote</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </button>
            
            <button 
              onClick={() => setShowMapModal(true)}
              className="group bg-[#FF6600] text-white px-8 py-4 rounded-full hover:bg-[#E55A00] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FF6600]/30"
            >
              <span className="font-semibold">Our Channel Partners</span>
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </button>
            
            <button className="group border-2 border-teal-400 text-teal-400 px-8 py-4 rounded-full hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-400/30">
              <span className="font-semibold">Learn More</span>
              <div className="absolute inset-0 bg-teal-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Installations' },
              { number: '98%', label: 'Satisfaction' },
              { number: '25+', label: 'Years Warranty' },
              { number: '₹50L+', label: 'Savings Generated' }
            ].map((stat, index) => (
              <div
                key={index}
                className="group cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-orange-400 group-hover:text-orange-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <MapModal onClose={() => setShowMapModal(false)} />
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
};

// Map Modal Component
const MapModal = ({ onClose }: { onClose: () => void }) => {
  const cities = [
    { name: 'Palakollu', x: 15, y: 35 },
    { name: 'Narasapuram', x: 20, y: 40 },
    { name: 'Mogalathuru', x: 25, y: 45 },
    { name: 'Bhimavaram', x: 30, y: 50 },
    { name: 'Gokavaram', x: 35, y: 55 },
    { name: 'Kakinada', x: 40, y: 60 },
    { name: 'JRG', x: 45, y: 65 },
    { name: 'Tenali', x: 50, y: 70 }
  ];

  const scrollToCity = (cityName: string) => {
    const element = document.getElementById(`city-${cityName.toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Keep modal open so user can see the city section below
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
        >
          <span className="text-black text-xl font-bold">×</span>
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#FF6600] to-[#E55A00] text-white p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Our Channel Partners in Andhra Pradesh
          </h2>
          <p className="text-center mt-2 opacity-90">
            Click on the markers to explore our partners in different cities
          </p>
        </div>

        {/* Map Container */}
        <div className="p-6">
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden shadow-lg">
            {/* Andhra Pradesh Map Background */}
            <div className="aspect-[4/3] relative">
              {/* Simplified Andhra Pradesh Map Shape */}
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Andhra Pradesh Outline */}
                <path
                  d="M50,50 L350,50 L370,80 L360,120 L340,140 L320,160 L300,180 L280,200 L260,220 L240,240 L220,260 L200,270 L180,280 L160,285 L140,280 L120,270 L100,250 L80,230 L70,200 L60,170 L50,140 Z"
                  fill="#E3F2FD"
                  stroke="#1976D2"
                  strokeWidth="2"
                />
                
                {/* Coastal Line */}
                <path
                  d="M50,50 L350,50 L370,80 L360,120 L340,140 L320,160 L300,180 L280,200 L260,220 L240,240 L220,260 L200,270 L180,280 L160,285"
                  fill="none"
                  stroke="#0277BD"
                  strokeWidth="3"
                  opacity="0.6"
                />

                {/* City Markers */}
                {cities.map((city, index) => (
                  <g key={city.name}>
                    {/* Marker */}
                    <circle
                      cx={city.x * 4}
                      cy={city.y * 3}
                      r="8"
                      fill="#FF6600"
                      className="cursor-pointer hover:r-10 transition-all duration-300 animate-pulse"
                      onClick={() => scrollToCity(city.name)}
                    />
                    
                    {/* Marker Pulse Effect */}
                    <circle
                      cx={city.x * 4}
                      cy={city.y * 3}
                      r="12"
                      fill="none"
                      stroke="#FF6600"
                      strokeWidth="2"
                      opacity="0.3"
                      className="animate-ping"
                    />

                    {/* Tooltip */}
                    <text
                      x={city.x * 4}
                      y={city.y * 3 - 15}
                      textAnchor="middle"
                      className="text-xs font-semibold fill-gray-700 pointer-events-none"
                    >
                      {city.name}
                    </text>
                  </g>
                ))}

                {/* Company Branding */}
                <g className="animate-bounce">
                  <rect
                    x="150"
                    y="130"
                    width="100"
                    height="40"
                    fill="#FF6600"
                    rx="20"
                    className="animate-pulse"
                  />
                  <text
                    x="200"
                    y="150"
                    textAnchor="middle"
                    className="text-sm font-bold fill-white"
                  >
                    Sriyaveda Solar
                  </text>
                </g>

                {/* Location Label */}
                <text
                  x="200"
                  y="180"
                  textAnchor="middle"
                  className="text-lg font-bold fill-gray-800 animate-fade-in"
                >
                  Andhra Pradesh
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#FF6600] rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Channel Partner Locations</span>
              </div>
            </div>
          </div>

          {/* City Sections */}
          <div className="mt-8 space-y-6">
            {cities.map((city) => (
              <div
                key={city.name}
                id={`city-${city.name.toLowerCase()}`}
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#FF6600]"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{city.name}</h3>
                <p className="text-gray-600">
                  Our channel partner in {city.name} provides comprehensive solar installation services,
                  maintenance, and support. Contact them for personalized solar solutions in your area.
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="bg-[#FF6600] text-white px-4 py-2 rounded-lg hover:bg-[#E55A00] transition-colors">
                    Contact Partner
                  </button>
                  <button className="border border-[#FF6600] text-[#FF6600] px-4 py-2 rounded-lg hover:bg-[#FF6600] hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
