import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollAnimation from './ScrollAnimation';

const ChannelPartners = () => {
  const navigate = useNavigate();

  return (
    <section id="channel-partners" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="fade" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Channel Partners
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our extensive network of certified channel partners across Andhra Pradesh,
              ready to provide you with premium solar solutions in your area.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.3}>
          <div className="text-center">
            <button
              onClick={() => navigate('/partners')}
              className="bg-[#FF6600] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#e55a00] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[#FF6600]/30"
            >
              View Partner Locations
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ChannelPartners;
