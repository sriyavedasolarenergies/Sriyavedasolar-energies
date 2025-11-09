import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Sun, Moon, Battery, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 lg:py-16">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight px-4 sm:px-6 lg:px-8">
            Power Your Future with
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              {' '}Clean Energy
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 lg:px-8">
            Transform your home or business with premium solar installations.
            Save money, reduce carbon footprint, and join the renewable energy revolution.
          </p>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 px-4 sm:px-6 lg:px-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 ${
                  animationActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <feature.icon className={`h-8 w-8 sm:h-10 sm:w-10 ${feature.color} group-hover:animate-bounce transition-all duration-300`} />
                  <div className={`absolute inset-0 bg-current rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                </div>
                <span className="text-xs sm:text-sm text-gray-400 mt-2 group-hover:text-white transition-colors text-center">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 px-4 sm:px-6 lg:px-8">
            <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center space-x-2 min-h-[44px] w-full sm:w-auto">
              <span className="font-semibold text-sm sm:text-base">Get Free Quote</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </button>

            <button
              onClick={() => navigate('/partners')}
              className="group bg-[#FF6600] text-white px-6 sm:px-8 py-4 rounded-full hover:bg-[#E55A00] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FF6600]/30 min-h-[44px] w-full sm:w-auto"
            >
              <span className="font-semibold text-sm sm:text-base">Our Channel Partners</span>
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </button>

            <button className="group border-2 border-teal-400 text-teal-400 px-6 sm:px-8 py-4 rounded-full hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-400/30 min-h-[44px] w-full sm:w-auto">
              <span className="font-semibold text-sm sm:text-base">Learn More</span>
              <div className="absolute inset-0 bg-teal-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center px-4 sm:px-6 lg:px-8">
            {[
              { number: '500+', label: 'Installations' },
              { number: '98%', label: 'Satisfaction' },
              { number: '25+', label: 'Years Warranty' },
              { number: '₹50L+', label: 'Savings Generated' }
            ].map((stat, index) => (
              <div
                key={index}
                className="group cursor-pointer hover:scale-105 transition-all duration-300 p-2 sm:p-4"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400 group-hover:text-orange-300">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
};



export default Hero;
