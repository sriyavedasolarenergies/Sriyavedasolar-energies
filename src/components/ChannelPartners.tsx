import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ScrollAnimation from './ScrollAnimation';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ChannelPartners = () => {
  const [showModal, setShowModal] = useState(false);

  const cities = [
    { name: 'Palakollu', lat: 16.5167, lng: 81.7333 },
    { name: 'Narasapuram', lat: 16.4333, lng: 81.6833 },
    { name: 'Mogalathuru', lat: 16.2833, lng: 81.2833 },
    { name: 'Bhimavaram', lat: 16.5333, lng: 81.5167 },
    { name: 'Gokavaram', lat: 17.2833, lng: 81.8833 },
    { name: 'Kakinada', lat: 16.9333, lng: 82.2167 },
    { name: 'JRG', lat: 16.7833, lng: 81.8333 },
    { name: 'Tenali', lat: 16.2333, lng: 80.6167 },
  ];

  const handleCityClick = (cityName: string) => {
    // Scroll to city section (to be implemented later)
    const element = document.getElementById(`city-${cityName.toLowerCase().replace(' ', '-')}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowModal(false);
  };

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
              onClick={() => setShowModal(true)}
              className="bg-[#FF6600] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#e55a00] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[#FF6600]/30"
            >
              View Partner Locations
            </button>
          </div>
        </ScrollAnimation>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-black">Our Channel Partners in Andhra Pradesh</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="h-96 rounded-lg overflow-hidden">
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
                  {cities.map((city, index) => (
                    <Marker
                      key={index}
                      position={[city.lat, city.lng]}
                      eventHandlers={{
                        click: () => handleCityClick(city.name),
                      }}
                    >
                      <Popup>
                        <div className="text-center">
                          <h4 className="font-semibold text-gray-800">{city.name}</h4>
                          <button
                            onClick={() => handleCityClick(city.name)}
                            className="mt-2 bg-[#FF6600] text-white px-3 py-1 rounded text-sm hover:bg-[#e55a00] transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              <div className="mt-4 text-sm text-gray-600 text-center">
                Click on any marker to view partner details for that city
              </div>
            </div>
          </div>
        )}

        {/* City sections (placeholders for future content) */}
        {cities.map((city) => (
          <div key={city.name} id={`city-${city.name.toLowerCase().replace(' ', '-')}`} className="mt-16">
            {/* City content will be added here later */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChannelPartners;
