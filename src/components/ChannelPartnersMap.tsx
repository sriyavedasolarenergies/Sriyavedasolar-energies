import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import ScrollAnimation from './ScrollAnimation';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ChannelPartnersMap = () => {
  const navigate = useNavigate();

  // Partner locations data - can be loaded from JSON API
  const partnerLocations = [
    {
      id: 1,
      name: 'Palakollu',
      lat: 16.5167,
      lng: 81.7333,
      address: 'Palakollu, Andhra Pradesh',
      phone: '+91-9876543210',
      email: 'palakollu@sriyavedasolar.com',
      services: ['Residential', 'Commercial'],
      rating: 4.8
    },
    {
      id: 2,
      name: 'Narasapuram',
      lat: 16.4333,
      lng: 81.6833,
      address: 'Narasapuram, Andhra Pradesh',
      phone: '+91-9876543211',
      email: 'narasapuram@sriyavedasolar.com',
      services: ['Residential', 'Commercial', 'Industrial'],
      rating: 4.9
    },
    {
      id: 3,
      name: 'Mogalathuru',
      lat: 16.2833,
      lng: 81.2833,
      address: 'Mogalathuru, Andhra Pradesh',
      phone: '+91-9876543212',
      email: 'mogalathuru@sriyavedasolar.com',
      services: ['Residential'],
      rating: 4.7
    },
    {
      id: 4,
      name: 'Bhimavaram',
      lat: 16.5333,
      lng: 81.5167,
      address: 'Bhimavaram, Andhra Pradesh',
      phone: '+91-9876543213',
      email: 'bhimavaram@sriyavedasolar.com',
      services: ['Residential', 'Commercial', 'Industrial'],
      rating: 4.8
    },
    {
      id: 5,
      name: 'Gokavaram',
      lat: 17.2833,
      lng: 81.8833,
      address: 'Gokavaram, Andhra Pradesh',
      phone: '+91-9876543214',
      email: 'gokavaram@sriyavedasolar.com',
      services: ['Commercial', 'Industrial'],
      rating: 4.9
    },
    {
      id: 6,
      name: 'Kakinada',
      lat: 16.9333,
      lng: 82.2167,
      address: 'Kakinada, Andhra Pradesh',
      phone: '+91-9876543215',
      email: 'kakinada@sriyavedasolar.com',
      services: ['Residential', 'Commercial', 'Industrial'],
      rating: 4.8
    },
    {
      id: 7,
      name: 'Jangareddygudem',
      lat: 16.7833,
      lng: 81.8333,
      address: 'Jangareddygudem, Andhra Pradesh',
      phone: '+91-9876543216',
      email: 'jrg@sriyavedasolar.com',
      services: ['Residential', 'Commercial'],
      rating: 4.7
    },
    {
      id: 8,
      name: 'Tenali',
      lat: 16.2333,
      lng: 80.6167,
      address: 'Tenali, Andhra Pradesh',
      phone: '+91-9876543217',
      email: 'tenali@sriyavedasolar.com',
      services: ['Residential', 'Commercial'],
      rating: 4.6
    }
  ];

  const getDirections = (lat: number, lng: number, address: string) => {
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="fade" delay={0.2}>
          <div className="text-center mb-16">
            <button
              onClick={() => navigate('/')}
              className="mb-8 bg-[#FF6600] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e55a00] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[#FF6600]/30"
            >
              ← Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Channel Partners
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our extensive network of certified channel partners across Andhra Pradesh,
              ready to provide you with premium solar solutions in your area.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.3}>
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="h-[70vh] rounded-lg overflow-hidden">
              <MapContainer
                center={[16.5, 81.5]}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {partnerLocations.map((partner, index) => (
                  <Marker
                    key={partner.id}
                    position={[partner.lat, partner.lng]}
                  >
                    <Popup>
                      <div className="p-3 min-w-[250px]">
                        <h4 className="font-bold text-gray-800 text-lg mb-2">{partner.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{partner.address}</p>

                        <div className="flex items-center mb-2">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm text-gray-700">{partner.rating}/5.0</span>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-gray-600 mb-1">Services:</p>
                          <div className="flex flex-wrap gap-1">
                            {partner.services.map((service, idx) => (
                              <span key={idx} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <button
                            onClick={() => getDirections(partner.lat, partner.lng, partner.address)}
                            className="w-full bg-teal-500 text-white px-3 py-2 rounded text-sm hover:bg-teal-600 transition-colors"
                          >
                            Get Directions
                          </button>
                          <button className="w-full bg-[#FF6600] text-white px-3 py-2 rounded text-sm hover:bg-[#e55a00] transition-colors">
                            Contact Partner
                          </button>
                        </div>

                        <div className="mt-3 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Phone:</span> {partner.phone}
                          </p>
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Email:</span> {partner.email}
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="mt-6 text-sm text-gray-600 text-center">
              Click on any marker to view partner details and get directions
            </div>
          </div>
        </ScrollAnimation>

        {/* Partner Statistics */}
        <ScrollAnimation direction="up" delay={0.4}>
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{partnerLocations.length}</div>
              <div className="text-white font-semibold">Partner Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">8</div>
              <div className="text-white font-semibold">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">4.8</div>
              <div className="text-white font-semibold">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-white font-semibold">Support Available</div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Partner Locations List */}
        <ScrollAnimation direction="up" delay={0.5}>
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-white mb-12">
              All Partner Locations
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerLocations.map((partner, index) => (
                <ScrollAnimation key={partner.id} direction="up" delay={0.6 + index * 0.1}>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{partner.name}</h4>
                        <p className="text-gray-300 text-sm">{partner.address}</p>
                      </div>
                      <div className="flex items-center bg-yellow-500/10 px-2 py-1 rounded-full">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-white font-semibold text-sm">{partner.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-white font-semibold mb-2 text-sm">Services Offered:</h5>
                      <div className="flex flex-wrap gap-1">
                        {partner.services.map((service, idx) => (
                          <span key={idx} className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-300 text-sm">
                        <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {partner.phone}
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {partner.email}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => getDirections(partner.lat, partner.lng, partner.address)}
                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                      >
                        Directions
                      </button>
                      <button className="flex-1 bg-[#FF6600] hover:bg-[#e55a00] text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105">
                        Contact
                      </button>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ChannelPartnersMap;
