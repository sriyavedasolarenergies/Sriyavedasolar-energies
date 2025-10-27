import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const PartnerBanks = () => {
  const [showModal, setShowModal] = useState(false);

  const banks = [
    {
      name: 'SBI',
      logo: '/banks logos/sbi.png',
      alt: 'State Bank of India'
    },
    {
      name: 'Union Bank',
      logo: '/banks logos/union bank.png',
      alt: 'Union Bank of India'
    },
    {
      name: 'Bank of Baroda',
      logo: '/banks logos/Bank of Baroda.png',
      alt: 'Bank of Baroda'
    },
    {
      name: 'Canara Bank',
      logo: '/banks logos/Canara bank.png',
      alt: 'Canara Bank'
    },
    {
      name: 'UCO Bank',
      logo: '/banks logos/uco bank.png',
      alt: 'UCO Bank'
    },
    {
      name: 'India Overseas Bank',
      logo: '/banks logos/India Overseas Bank.png',
      alt: 'India Overseas Bank'
    },
    {
      name: 'Indian Bank',
      logo: '/banks logos/Indian Bank.png',
      alt: 'Indian Bank'
    },
    {
      name: 'Bank of India',
      logo: '/banks logos/Bank of India.png',
      alt: 'Bank of India'
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {banks.map((bank, index) => (
              <ScrollAnimation key={index} direction="up" delay={0.4 + index * 0.1}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer flex flex-col items-center justify-center min-h-[160px]">
                  <div className="relative mb-4">
                    <img
                      src={bank.logo}
                      alt={bank.alt}
                      className="h-16 w-auto object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/64x64?text=' + bank.name;
                      }}
                    />
                    <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-white text-center group-hover:text-orange-400 transition-colors">
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
