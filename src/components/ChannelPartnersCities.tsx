import React from 'react';
import { MapPin, Phone, Mail, Star } from 'lucide-react';

const ChannelPartnersCities: React.FC = () => {
  const cities = [
    {
      name: 'Palakollu',
      location: 'Palakollu, Andhra Pradesh',
      partner: 'Sri Solar Solutions',
      phone: '+91 9876543210',
      email: 'palakollu@srisolarsolutions.com',
      rating: 4.8,
      experience: '8+ years',
      specializations: ['Residential Installations', 'Commercial Projects', 'Maintenance Services']
    },
    {
      name: 'Narasapuram',
      location: 'Narasapuram, Andhra Pradesh',
      partner: 'Green Energy Partners',
      phone: '+91 9876543211',
      email: 'narasapuram@greenenergypartners.com',
      rating: 4.9,
      experience: '10+ years',
      specializations: ['Industrial Installations', 'Solar Farms', 'Grid Tie Systems']
    },
    {
      name: 'Mogalathuru',
      location: 'Mogalathuru, Andhra Pradesh',
      partner: 'SunPower Technologies',
      phone: '+91 9876543212',
      email: 'mogalathuru@sunpowertech.com',
      rating: 4.7,
      experience: '6+ years',
      specializations: ['Home Solar Systems', 'Battery Storage', 'Energy Audits']
    },
    {
      name: 'Bhimavaram',
      location: 'Bhimavaram, Andhra Pradesh',
      partner: 'EcoSolar Systems',
      phone: '+91 9876543213',
      email: 'bhimavaram@ecosolarsystems.com',
      rating: 4.6,
      experience: '7+ years',
      specializations: ['Agricultural Solar', 'Water Pumping', 'Hybrid Systems']
    },
    {
      name: 'Gokavaram',
      location: 'Gokavaram, Andhra Pradesh',
      partner: 'Bright Future Solar',
      phone: '+91 9876543214',
      email: 'gokavaram@brightfuturesolar.com',
      rating: 4.8,
      experience: '9+ years',
      specializations: ['Commercial Buildings', 'Institutional Projects', 'Solar Consulting']
    },
    {
      name: 'Kakinada',
      location: 'Kakinada, Andhra Pradesh',
      partner: 'Coastal Solar Solutions',
      phone: '+91 9876543215',
      email: 'kakinada@coastalsolarsolutions.com',
      rating: 4.9,
      experience: '12+ years',
      specializations: ['Coastal Installations', 'Marine Applications', 'Large Scale Projects']
    },
    {
      name: 'JRG',
      location: 'JRG, Andhra Pradesh',
      partner: 'NextGen Solar',
      phone: '+91 9876543216',
      email: 'jrg@nextgensolar.com',
      rating: 4.5,
      experience: '5+ years',
      specializations: ['Smart Home Integration', 'IoT Solutions', 'Energy Monitoring']
    },
    {
      name: 'Tenali',
      location: 'Tenali, Andhra Pradesh',
      partner: 'Sustainable Energy Hub',
      phone: '+91 9876543217',
      email: 'tenali@sustainableenergyhub.com',
      rating: 4.7,
      experience: '8+ years',
      specializations: ['Educational Institutions', 'Government Projects', 'Community Solar']
    }
  ];

  return (
    <section id="channel-partners-cities" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Channel Partners in{' '}
            <span className="bg-gradient-to-r from-[#FF6600] to-[#E55A00] bg-clip-text text-transparent">
              Andhra Pradesh
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with our trusted channel partners across Andhra Pradesh for expert solar installation services,
            maintenance, and support in your local area.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <div
              key={city.name}
              id={`city-${city.name.toLowerCase()}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden group"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FF6600] to-[#E55A00] p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">{city.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="text-sm font-semibold">{city.rating}</span>
                  </div>
                </div>
                <p className="text-orange-100 text-sm">{city.location}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{city.partner}</h4>
                  <p className="text-gray-600 text-sm">{city.experience} experience</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-3 text-[#FF6600]" />
                    <span className="text-sm">{city.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-3 text-[#FF6600]" />
                    <span className="text-sm">{city.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 mr-3 text-[#FF6600]" />
                    <span className="text-sm">{city.location}</span>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">Specializations:</h5>
                  <div className="flex flex-wrap gap-2">
                    {city.specializations.map((spec, specIndex) => (
                      <span
                        key={specIndex}
                        className="bg-orange-50 text-[#FF6600] text-xs px-3 py-1 rounded-full border border-orange-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-[#FF6600] text-white py-2 px-4 rounded-lg hover:bg-[#E55A00] transition-colors text-sm font-semibold">
                    Contact Now
                  </button>
                  <button className="flex-1 border-2 border-[#FF6600] text-[#FF6600] py-2 px-4 rounded-lg hover:bg-[#FF6600] hover:text-white transition-colors text-sm font-semibold">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#FF6600] to-[#E55A00] rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Go Solar?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Contact our channel partners today and start your journey towards clean, renewable energy.
            </p>
            <button className="bg-white text-[#FF6600] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelPartnersCities;
