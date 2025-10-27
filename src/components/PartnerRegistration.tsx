import React, { useState } from 'react';
import { Award, TrendingUp, Users, Star, CheckCircle, MapPin } from 'lucide-react';

const PartnerRegistration: React.FC = () => {
  const [showMap, setShowMap] = useState(false);

  const benefits = [
    {
      icon: Award,
      title: 'Premium Products',
      description: 'Access to high-quality solar panels and components'
    },
    {
      icon: TrendingUp,
      title: 'Attractive Margins',
      description: 'Competitive pricing with excellent profit margins'
    },
    {
      icon: Users,
      title: 'Training & Support',
      description: 'Comprehensive training and ongoing technical support'
    },
    {
      icon: Star,
      title: 'Marketing Support',
      description: 'Co-branded marketing materials and promotional support'
    }
  ];

  const whyPartner = [
    'Exclusive territory rights and protection',
    'Comprehensive product training programs',
    'Marketing and sales support materials',
    'Technical assistance and after-sales support',
    'Attractive incentive and reward programs',
    'Fast-track certification processes'
  ];

  const requirements = [
    'Minimum 2 years experience in solar/electrical industry',
    'Valid business registration and GST certificate',
    'Dedicated showroom or office space',
    'Commitment to quality and customer service'
  ];

  return (
    <section id="partner-registration" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Become Our{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Channel Partner
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join India's fastest-growing solar energy network and build a sustainable business with us
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <div className="relative mb-4">
                <benefit.icon className="h-12 w-12 text-orange-400 group-hover:text-orange-300 transition-colors" />
                <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Map Section - Shows when button is clicked */}
        {showMap && (
          <div className="mb-16 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our{' '}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Location
                </span>
              </h2>
              <p className="text-gray-300 text-lg">
                Visit us at our headquarters in Chennai, Tamil Nadu
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20 overflow-hidden animate-slide-up">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 animate-pulse"></div>

              {/* Map Container */}
              <div className="relative z-10">
                <div className="aspect-video bg-gray-700 rounded-2xl overflow-hidden relative">
                  {/* Placeholder Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-800">
                    {/* Grid lines for map effect */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(10)].map((_, i) => (
                        <div key={`h-${i}`} className="absolute w-full h-px bg-white/20" style={{ top: `${i * 10}%` }}></div>
                      ))}
                      {[...Array(10)].map((_, i) => (
                        <div key={`v-${i}`} className="absolute h-full w-px bg-white/20" style={{ left: `${i * 10}%` }}></div>
                      ))}
                    </div>

                    {/* Location Pin */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
                      <div className="relative">
                        <MapPin className="h-16 w-16 text-orange-400 drop-shadow-lg" />
                        <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-50 animate-ping"></div>
                      </div>
                    </div>

                    {/* Location Info */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 animate-fade-in">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">Sriyaveda Solar Energies</h3>
                          <p className="text-gray-300 text-sm">Chennai, Tamil Nadu, India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">Head Office</h4>
                    <div className="space-y-2 text-gray-300">
                      <p><strong>Address:</strong> Chennai, Tamil Nadu, India</p>
                      <p><strong>Phone:</strong> +91 9999999999</p>
                      <p><strong>Email:</strong> info@sriyavedasolar.com</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-500/10 to-green-500/10 border border-teal-500/30 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">Service Areas</h4>
                    <div className="space-y-2 text-gray-300">
                      <p>• Tamil Nadu</p>
                      <p>• Karnataka</p>
                      <p>• Andhra Pradesh</p>
                      <p>• Kerala</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Partner Registration */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">Partner Registration</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  placeholder="+91 9999999999"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">City/Place</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  placeholder="Enter your city"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Complete Address</label>
                <textarea
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors h-24"
                  placeholder="Enter complete business address"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Business Type</label>
                <select className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors">
                  <option>Solar Dealer</option>
                  <option>Installation Partner</option>
                  <option>Distributor</option>
                  <option>Solar Consultant</option>
                </select>
              </div>

              <button
                onClick={() => setShowMap(!showMap)}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105"
              >
                {showMap ? 'Hide Location' : 'Show Our Location'}
              </button>
            </div>
          </div>

          {/* Why Partner & Requirements */}
          <div className="space-y-8">
            {/* Why Partner With Us */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Why Partner With Us?</h3>
              <ul className="space-y-3">
                {whyPartner.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partner Requirements */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Partner Requirements</h3>
              <ul className="space-y-3">
                {requirements.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckCircle className="h-5 w-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerRegistration;
