import React, { useState } from 'react';
import { Home, Building, Factory, Wrench, MonitorSpeaker, Zap, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

const Services = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const services = [
    {
      icon: Home,
      title: 'Residential Solar',
      description: 'Complete rooftop solar solutions for homes with grid-tie and off-grid options.',
      features: ['Rooftop Installation', 'Net Metering', 'Battery Backup', 'Monitoring System'],
      color: 'from-orange-500 to-red-500',
      glowColor: 'orange-500'
    },
    {
      icon: Building,
      title: 'Commercial Solar',
      description: 'Scalable solar energy systems for offices, schools, and commercial buildings.',
      features: ['Large Scale Systems', 'Cost Optimization', 'Tax Benefits', 'Maintenance'],
      color: 'from-blue-500 to-teal-500',
      glowColor: 'blue-500'
    },
    {
      icon: Factory,
      title: 'Industrial Solar',
      description: 'High-capacity solar installations for manufacturing and industrial facilities.',
      features: ['Mega Watt Systems', 'Grid Integration', 'Power Purchase', 'Performance'],
      color: 'from-green-500 to-emerald-500',
      glowColor: 'green-500'
    },
    {
      icon: Wrench,
      title: 'Installation & Maintenance',
      description: 'Professional installation and ongoing maintenance services for all solar systems.',
      features: ['Expert Installation', '24/7 Support', 'Regular Maintenance', 'Warranty'],
      color: 'from-yellow-500 to-orange-500',
      glowColor: 'yellow-500'
    },
    {
      icon: MonitorSpeaker,
      title: 'System Monitoring',
      description: 'Advanced monitoring solutions to track performance and optimize efficiency.',
      features: ['Real-time Monitoring', 'Performance Analytics', 'Alert System', 'Mobile App'],
      color: 'from-purple-500 to-pink-500',
      glowColor: 'purple-500'
    },
    {
      icon: Zap,
      title: 'Energy Storage',
      description: 'Battery storage solutions for energy independence and backup power.',
      features: ['Lithium Batteries', 'Backup Power', 'Load Management', 'Grid Support'],
      color: 'from-teal-500 to-cyan-500',
      glowColor: 'teal-500'
    }
  ];

  const images = Array.from({ length: 17 }, (_, i) => `/ai-images/${i + 1}.png`);

  const openImageModal = (index: number) => {
    setSelectedImage(images[index]);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="fade" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive solar energy solutions tailored to your specific needs and requirements
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.3}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollAnimation key={index} direction="up" delay={0.4 + index * 0.1}>
                <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                  {/* Icon with glow effect */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 group-hover:animate-pulse transition-all duration-300`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-${service.glowColor} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300 group-hover:text-white transition-colors">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:animate-pulse"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-gray-700 group-hover:border-orange-500/30 transition-colors">
                    <button className="text-orange-400 hover:text-orange-300 font-semibold group-hover:underline transition-all duration-300">
                      Learn More →
                    </button>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        {/* Horizontal Scrolling Image Gallery */}
        <ScrollAnimation direction="up" delay={0.6}>
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-white mb-12">
              Our Solar Installations
            </h3>
            
            {/* Scrolling Container */}
            <div className="relative overflow-hidden bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6">
              <div className="flex gap-6 md:animate-scroll-right-to-left">
                {/* First set of images */}
                {images.map((image, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-64 sm:w-72 md:w-80 h-56 cursor-pointer group overflow-hidden rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                    onClick={() => openImageModal(index)}
                  >
                    <img
                      src={image}
                      alt={`Solar Installation ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {images.map((image, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-64 sm:w-72 md:w-80 h-56 cursor-pointer group overflow-hidden rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                    onClick={() => openImageModal(index)}
                  >
                    <img
                      src={image}
                      alt={`Solar Installation ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={selectedImage}
                alt={`Solar Installation ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded-full px-4 py-2 text-white text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}

        {/* Process Section */}
        <ScrollAnimation direction="up" delay={0.8}>
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-white mb-12">
              Our Installation Process
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Site Survey', description: 'Free site assessment and energy audit' },
                { step: '02', title: 'Design & Quote', description: 'Custom system design with detailed quotation' },
                { step: '03', title: 'Installation', description: 'Professional installation by certified team' },
                { step: '04', title: 'Commissioning', description: 'Testing, grid connection, and handover' }
              ].map((process, index) => (
                <ScrollAnimation key={index} direction="up" delay={0.9 + index * 0.1}>
                  <div className="text-center group cursor-pointer">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                        <span className="text-xl font-bold text-white">{process.step}</span>
                      </div>
                      <div className="absolute inset-0 w-16 h-16 bg-orange-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity mx-auto"></div>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {process.title}
                    </h4>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {process.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>

      <style jsx>{`
        @keyframes scroll-right-to-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-right-to-left {
          animation: scroll-right-to-left 40s linear infinite;
        }

        .animate-scroll-right-to-left:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-scroll-right-to-left {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
