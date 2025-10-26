import React, { useState } from 'react';
import { Users, MapPin, Phone, Mail, Building, Star, Award, Handshake, Plus } from 'lucide-react';

interface PartnerData {
  name: string;
  phone: string;
  place: string;
  address: string;
  email: string;
  businessType: string;
}

const ChannelPartners = () => {
  const [formData, setFormData] = useState<PartnerData>({
    name: '',
    phone: '',
    place: '',
    address: '',
    email: '',
    businessType: 'dealer'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const businessTypes = [
    { value: 'dealer', label: 'Solar Dealer', icon: Building },
    { value: 'installer', label: 'Installation Partner', icon: Award },
    { value: 'distributor', label: 'Distributor', icon: Handshake },
    { value: 'consultant', label: 'Solar Consultant', icon: Star }
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Premium Products',
      description: 'Access to high-quality solar panels and components',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Handshake,
      title: 'Attractive Margins',
      description: 'Competitive pricing with excellent profit margins',
      color: 'from-blue-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'Training & Support',
      description: 'Comprehensive training and ongoing technical support',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Star,
      title: 'Marketing Support',
      description: 'Co-branded marketing materials and promotional support',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-6 animate-bounce">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Become Our{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Channel Partner
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join India's fastest-growing solar energy network and build a sustainable business with us
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 cursor-pointer transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${benefit.color} p-3 group-hover:animate-pulse transition-all duration-300 group-hover:scale-110`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Registration Form */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4 animate-pulse">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Partner Registration</h3>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-green-400 mb-2">Registration Successful!</h4>
                <p className="text-gray-300 mb-6">
                  Thank you for your interest. Our team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      place: '',
                      address: '',
                      email: '',
                      businessType: 'dealer'
                    });
                  }}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105"
                >
                  Register Another Partner
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                      <Users className="inline h-4 w-4 mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-orange-500/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-orange-500/20"
                      placeholder="+91 9999999999"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                      <MapPin className="inline h-4 w-4 mr-2" />
                      City/Place
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.place}
                      onChange={(e) => setFormData({...formData, place: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-orange-500/20"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-orange-500/20"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                    <Building className="inline h-4 w-4 mr-2" />
                    Complete Address
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-all duration-300 focus:scale-105 focus:shadow-lg focus:shadow-orange-500/20 h-24"
                    placeholder="Enter complete business address"
                  />
                </div>

                <div className="group">
                  <label className="block text-white font-semibold mb-3 group-hover:text-orange-400 transition-colors">
                    Business Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {businessTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({...formData, businessType: type.value})}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          formData.businessType === type.value
                            ? 'border-orange-400 bg-orange-500/20 text-orange-400 shadow-lg shadow-orange-500/20'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                        }`}
                      >
                        <type.icon className="h-5 w-5 mx-auto mb-1" />
                        <div className="text-sm font-semibold">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Handshake className="h-5 w-5" />
                      <span>Join as Partner</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Partner Benefits */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20 transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Star className="h-6 w-6 mr-2 text-yellow-400 animate-pulse" />
                Why Partner With Us?
              </h3>
              <div className="space-y-4">
                {[
                  'Exclusive territory rights and protection',
                  'Comprehensive product training programs',
                  'Marketing and sales support materials',
                  'Technical assistance and after-sales support',
                  'Attractive incentive and reward programs',
                  'Fast-track certification processes'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:animate-pulse"></div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500/10 to-green-500/10 border border-teal-500/30 rounded-3xl p-8 transform hover:scale-[1.02] transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2 text-teal-400 animate-bounce" />
                Partner Requirements
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  Minimum 2 years experience in solar/electrical industry
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  Valid business registration and GST certificate
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  Dedicated showroom or office space
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  Commitment to quality and customer service
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelPartners;