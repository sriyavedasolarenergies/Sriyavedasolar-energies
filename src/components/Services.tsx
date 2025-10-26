import React from 'react';
import { Home, Building, Factory, Wrench, MonitorSpeaker, Zap } from 'lucide-react';

const Services = () => {
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

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
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
          ))}
        </div>

        {/* Process Section */}
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
              <div key={index} className="text-center group cursor-pointer">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;