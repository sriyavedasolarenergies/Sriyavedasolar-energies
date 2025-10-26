import React from 'react';
import { Shield, Award, Users, Wrench } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Premium solar panels with 25+ years warranty and certified installations.',
      color: 'text-blue-400'
    },
    {
      icon: Award,
      title: 'Expert Team',
      description: 'Certified solar engineers with decades of combined experience.',
      color: 'text-green-400'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Dedicated support from consultation to post-installation maintenance.',
      color: 'text-orange-400'
    },
    {
      icon: Wrench,
      title: 'Professional Service',
      description: 'Complete installation, maintenance, and monitoring services.',
      color: 'text-teal-400'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Sriyaveda Solar
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Leading solar energy solutions provider, transforming homes and businesses 
            with sustainable, cost-effective renewable energy systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To make clean, renewable energy accessible and affordable for everyone. 
                We're committed to reducing carbon footprints while maximizing savings 
                through innovative solar solutions.
              </p>
            </div>

            <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  Premium quality components from top manufacturers
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  End-to-end service from design to maintenance
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Competitive pricing with flexible financing options
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  24/7 monitoring and support services
                </li>
              </ul>
            </div>
          </div>

          {/* Stats/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-3xl font-bold text-orange-400 group-hover:text-orange-300">
                    500+
                  </div>
                  <div className="text-gray-400 group-hover:text-white transition-colors">
                    Happy Customers
                  </div>
                </div>
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-3xl font-bold text-teal-400 group-hover:text-teal-300">
                    5MW+
                  </div>
                  <div className="text-gray-400 group-hover:text-white transition-colors">
                    Installed Capacity
                  </div>
                </div>
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-3xl font-bold text-green-400 group-hover:text-green-300">
                    25+
                  </div>
                  <div className="text-gray-400 group-hover:text-white transition-colors">
                    Years Experience
                  </div>
                </div>
                <div className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-3xl font-bold text-yellow-400 group-hover:text-yellow-300">
                    98%
                  </div>
                  <div className="text-gray-400 group-hover:text-white transition-colors">
                    Satisfaction Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <div className="relative mb-4">
                <value.icon className={`h-12 w-12 ${value.color} group-hover:animate-bounce transition-all duration-300`} />
                <div className={`absolute inset-0 bg-current rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;