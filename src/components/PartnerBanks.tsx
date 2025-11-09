import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const PartnerBanks = () => {
  const [showModal, setShowModal] = useState(false);

  const banks = [
    {
      name: 'State Bank of India',
      logo: '/banks/sbi.png',
      alt: 'State Bank of India logo'
    },
    {
      name: 'Union Bank of India',
      logo: '/banks/union bank.png',
      alt: 'Union Bank of India logo'
    },
    {
      name: 'Bank of Baroda',
      logo: '/banks/Bank of Baroda.png',
      alt: 'Bank of Baroda logo'
    },
    {
      name: 'Canara Bank',
      logo: '/banks/Canara bank.png',
      alt: 'Canara Bank logo'
    },
    {
      name: 'UCO Bank',
      logo: '/banks/uco bank.png',
      alt: 'UCO Bank logo'
    },
    {
      name: 'India Overseas Bank',
      logo: '/banks/India Overseas Bank.png',
      alt: 'India Overseas Bank logo'
    },
    {
      name: 'Indian Bank',
      logo: '/banks/Indian Bank.png',
      alt: 'Indian Bank logo'
    },
    {
      name: 'Bank of India',
      logo: '/banks/Bank of India.png',
      alt: 'Bank of India logo'
    }
  ];

  return (
    <section id="partner-banks" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="fade" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Partner Banks for{' '}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Solar Subsidy
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Partnering with leading banks to provide seamless financing and subsidy options
              for your solar energy investments.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.3}>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {banks.map((bank, index) => (
              <ScrollAnimation key={index} direction="up" delay={0.4 + index * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#ff7a00]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#ff7a00]/20 group cursor-pointer flex flex-col items-center justify-center min-h-[180px]">
                  <div className="relative mb-4">
                    <img
                      src={bank.logo}
                      alt={bank.alt}
                      className="h-16 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/80x80/ffffff/666666?text=${encodeURIComponent(bank.name.split(' ')[0])}`;
                        e.currentTarget.alt = `Placeholder for ${bank.name} logo`;
                      }}
                    />
                    <div className="absolute inset-0 bg-[#ff7a00] rounded-full blur-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center group-hover:text-[#ff7a00] transition-colors leading-tight">
                    {bank.name}
                  </h3>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="fade" delay={0.8}>
          <div className="text-center">
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
            >
              Know More
            </button>
          </div>
        </ScrollAnimation>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Solar Subsidy & Financing</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  Sriyaveda Solar Energies is proudly associated with leading nationalized and private banks that offer solar loans and government-backed subsidies for residential and commercial solar projects. These partnerships make switching to solar easy and affordable for everyone.
                </p>

                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Our Partner Banks</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {banks.map((bank, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img
                          src={bank.logo}
                          alt={bank.alt}
                          className="h-8 w-auto object-contain filter brightness-0 invert"
                        />
                        <span className="text-gray-300 text-sm">{bank.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">Government Subsidy</h4>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent font-semibold">
                      Government of India provides up to ₹78,000 subsidy for rooftop solar systems under the PM Surya Ghar: Muft Bijli Yojana.
                    </span>
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Want to know which bank suits your solar installation best? Contact our team for free subsidy and loan assistance.
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnerBanks;
