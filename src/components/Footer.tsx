import React from 'react';
import { Sun, Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  const services = [
    'Residential Solar',
    'Commercial Solar', 
    'Industrial Solar',
    'Battery Storage',
    'System Monitoring',
    'Maintenance'
  ];

  const quickLinks = [
    'About Us',
    'Our Services',
    'Calculator',
    'Get Quote',
    'Track Order',
    'Contact'
  ];

  const locations = [
    'Palakollu',
    'Narasapuram', 
    'Mogalathuru',
    'Bhimavaram',
    'Gokavaram',
    'Kakinada',
    'Tenali',
    'Jangareddygudem',
  ];

  return (
    <footer id="contact" className="bg-gradient-to-t from-black to-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
              <div className="relative">
                <Sun className="h-10 w-10 text-orange-500 animate-pulse group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                  SRIYAVEDA
                </h1>
                <p className="text-sm text-teal-400 -mt-1">SOLAR ENERGIES</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Leading solar energy solutions provider, transforming homes and businesses 
              with sustainable, cost-effective renewable energy systems across India.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">+91 9440788850</p>
                  <p className="text-sm text-gray-400">24/7 Customer Support</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">@sriyavedasolarenergies.com</p>
                  <p className="text-sm text-gray-400">Get Free Consultation</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Eluru, Andhra Pradesh</p>
                  <p className="text-sm text-gray-400">Headquarters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Our Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center group">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Locations */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
            </h3>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold text-white mb-4">Service Areas</h4>
            <div className="grid grid-cols-2 gap-2">
              {locations.map((location, index) => (
                <span key={index} className="text-gray-400 text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media & CTA */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-white font-semibold">Follow Us:</span>
              {[
                { icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61581907915074', color: 'hover:text-blue-400' },
                { icon: MessageCircle, url: 'https://wa.me/9440788850', color: 'hover:text-green-400' },
                { icon: Instagram, url: 'https://www.instagram.com/sriyavedasolarenergies?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', color: 'hover:text-pink-400' },
                { icon: MapPin, url: 'https://maps.google.com/?q=F No-403, Yalakkaya Street, Near Clock Tower, Eluru - 534001, Andhra Pradesh', color: 'hover:text-red-400' }
              ].map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700`}>
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={async () => {
                  // Generate sample quotation PDF
                  const sampleQuotationHTML = `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <title>Free Quote - Sriyaveda Solar Energies</title>
                        <style>
                          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                          * { box-sizing: border-box; }
                          body {
                            font-family: 'Inter', Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                            background: linear-gradient(to bottom, #111827, #000000);
                            color: #ffffff;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                          }
                          .quotation-container {
                            max-width: 800px;
                            margin: 0 auto;
                            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                            border: 2px solid #FFB400;
                            border-radius: 12px;
                            overflow: hidden;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                            page-break-inside: avoid;
                            font-family: 'Inter', Arial, sans-serif;
                            line-height: 1.4;
                          }
                          .header {
                            background: linear-gradient(135deg, #FFB400, #0AA6F1);
                            padding: 15px;
                            text-align: center;
                            color: white;
                            position: relative;
                          }
                          .logo-section {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-bottom: 15px;
                          }
                          .logo {
                            width: 60px;
                            height: 60px;
                            margin-right: 15px;
                            border-radius: 8px;
                            background: white;
                            padding: 5px;
                          }
                          .company-name {
                            font-size: 24px;
                            font-weight: 700;
                            margin: 0;
                            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
                          }
                          .company-address {
                            font-size: 12px;
                            opacity: 0.9;
                            margin: 5px 0 0 0;
                          }
                          .company-details {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-top: 10px;
                            font-size: 12px;
                            background: rgba(255,255,255,0.1);
                            padding: 10px;
                            border-radius: 6px;
                          }
                          .quotation-meta {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 8px;
                            font-size: 11px;
                            margin-top: 8px;
                          }
                          .meta-item {
                            background: rgba(255,255,255,0.1);
                            padding: 8px;
                            border-radius: 4px;
                          }
                          .customer-section {
                            padding: 15px;
                            border-bottom: 1px solid #444;
                          }
                          .section-title {
                            color: #1B3B5F;
                            font-size: 16px;
                            font-weight: 600;
                            margin-bottom: 12px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                          }
                          .customer-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 12px;
                          }
                          .customer-field {
                            background: #333;
                            padding: 10px;
                            border-radius: 6px;
                            border-left: 3px solid #0AA6F1;
                          }
                          .field-label {
                            font-size: 10px;
                            color: #ccc;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            margin-bottom: 3px;
                            font-weight: 600;
                          }
                          .field-value {
                            font-size: 13px;
                            font-weight: 500;
                            color: #ffffff;
                          }
                          .solar-info-section {
                            padding: 15px;
                            border-bottom: 1px solid #444;
                          }
                          .solar-info-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 12px;
                          }
                          .solar-info-item {
                            background: #333;
                            padding: 12px;
                            border-radius: 6px;
                            text-align: center;
                          }
                          .solar-info-label {
                            font-size: 11px;
                            color: #ccc;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            margin-bottom: 4px;
                          }
                          .solar-info-value {
                            font-size: 14px;
                            font-weight: 600;
                            color: #0AA6F1;
                          }
                          .benefits-section {
                            padding: 15px;
                            border-bottom: 1px solid #444;
                          }
                          .benefits-list {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                          }
                          .benefits-list li {
                            background: #333;
                            padding: 12px;
                            margin-bottom: 8px;
                            border-radius: 6px;
                            border-left: 3px solid #FFB400;
                            font-size: 13px;
                            color: #ffffff;
                          }
                          .benefits-list li:before {
                            content: '☀️';
                            margin-right: 8px;
                            font-size: 14px;
                          }
                          .pricing-section {
                            padding: 15px;
                            border-bottom: 1px solid #444;
                          }
                          .pricing-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 12px;
                          }
                          .pricing-item {
                            background: #333;
                            padding: 12px;
                            border-radius: 6px;
                            text-align: center;
                          }
                          .pricing-label {
                            font-size: 11px;
                            color: #ccc;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            margin-bottom: 4px;
                          }
                          .pricing-value {
                            font-size: 16px;
                            font-weight: 700;
                            color: #FFB400;
                          }
                          .notes-section {
                            padding: 15px;
                            border-bottom: 1px solid #444;
                          }
                          .notes-box {
                            background: #333;
                            border: 1px solid #555;
                            padding: 12px;
                            border-radius: 6px;
                          }
                          .notes-title {
                            color: #FFB400;
                            font-size: 12px;
                            font-weight: 600;
                            margin-bottom: 6px;
                          }
                          .notes-text {
                            color: #ccc;
                            font-size: 11px;
                            line-height: 1.4;
                          }
                          .signature-section {
                            padding: 15px;
                          }
                          .signature-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 40px;
                          }
                          .signature-box {
                            text-align: center;
                          }
                          .signature-line {
                            border-bottom: 1px solid #666;
                            margin: 40px 0 10px 0;
                          }
                          .signature-label {
                            color: #ccc;
                            font-size: 12px;
                            font-weight: 500;
                          }
                          .footer {
                            background: #1B3B5F;
                            padding: 10px;
                            text-align: center;
                            color: white;
                            font-size: 10px;
                          }
                          @media print {
                            body { margin: 0; }
                            .quotation-container { box-shadow: none; border: none; }
                          }
                        </style>
                      </head>
                      <body>
                        <div class="quotation-container">
                          <!-- Header -->
                          <div class="header">
                            <div class="logo-section">
                              <img src="/logo.png" alt="Sriyaveda Solar Energies Logo" class="logo">
                              <div>
                                <h1 class="company-name">SRIYAVEDA SOLAR ENERGIES</h1>
                                <p class="company-address">F No-403, Yalakkaya Street, Near Clock Tower, Eluru - 534001, Andhra Pradesh</p>
                              </div>
                            </div>
                            <div class="company-details">
                              <div>
                                <strong>Cell:</strong> 9440788850 | <strong>Email:</strong> sriyavedasolarenergies@gmail.com | <strong>Website:</strong> sriyavedasolarenergies.in
                              </div>
                            </div>
                            <div class="quotation-meta">
                              <div class="meta-item">
                                <strong>Quote Date:</strong> ${new Date().toLocaleDateString('en-IN')}
                              </div>
                              <div class="meta-item">
                                <strong>Quote No:</strong> FQ-${Date.now().toString().slice(-6)}
                              </div>
                            </div>
                          </div>

                          <!-- Customer Details -->
                          <div class="customer-section">
                            <h2 class="section-title">Customer Details</h2>
                            <div class="customer-grid">
                              <div class="customer-field">
                                <div class="field-label">Name</div>
                                <div class="field-value">********</div>
                              </div>
                              <div class="customer-field">
                                <div class="field-label">Address</div>
                                <div class="field-value">********</div>
                              </div>
                              <div class="customer-field">
                                <div class="field-label">Phone</div>
                                <div class="field-value">********</div>
                              </div>
                              <div class="customer-field">
                                <div class="field-label">Email</div>
                                <div class="field-value">********</div>
                              </div>
                            </div>
                          </div>

                          <!-- Solar Information -->
                          <div class="solar-info-section">
                            <h2 class="section-title">Solar System Information</h2>
                            <div class="solar-info-grid">
                              <div class="solar-info-item">
                                <div class="solar-info-label">System Type</div>
                                <div class="solar-info-value">Grid-Tied Solar PV</div>
                              </div>
                              <div class="solar-info-item">
                                <div class="solar-info-label">Average Generation</div>
                                <div class="solar-info-value">4-5 kWh/day</div>
                              </div>
                              <div class="solar-info-item">
                                <div class="solar-info-label">Installation Time</div>
                                <div class="solar-info-value">15-20 Days</div>
                              </div>
                              <div class="solar-info-item">
                                <div class="solar-info-label">Warranty</div>
                                <div class="solar-info-value">25 Years</div>
                              </div>
                            </div>
                          </div>

                          <!-- Benefits -->
                          <div class="benefits-section">
                            <h2 class="section-title">Benefits of Solar Energy</h2>
                            <ul class="benefits-list">
                              <li>Reduce your electricity bills by up to 90%</li>
                              <li>Generate clean, renewable energy for your home</li>
                              <li>25-year warranty on solar panels</li>
                              <li>Government subsidies available</li>
                              <li>Low maintenance and long-lasting system</li>
                              <li>Increase your property value</li>
                              <li>Contribute to environmental sustainability</li>
                              <li>Energy independence and security</li>
                            </ul>
                          </div>

                          <!-- Pricing -->
                          <div class="pricing-section">
                            <h2 class="section-title">Pricing Information</h2>
                            <div class="pricing-grid">
                              <div class="pricing-item">
                                <div class="pricing-label">System Cost</div>
                                <div class="pricing-value">********</div>
                              </div>
                              <div class="pricing-item">
                                <div class="pricing-label">Government Subsidy</div>
                                <div class="pricing-value">********</div>
                              </div>
                              <div class="pricing-item">
                                <div class="pricing-label">Net Amount</div>
                                <div class="pricing-value">********</div>
                              </div>
                              <div class="pricing-item">
                                <div class="pricing-label">Monthly Savings</div>
                                <div class="pricing-value">₹2,000-3,000</div>
                              </div>
                            </div>
                          </div>

                          <!-- Notes -->
                          <div class="notes-section">
                            <div class="notes-box">
                              <div class="notes-title">Important Notes</div>
                              <div class="notes-text">
                                • This is a sample quotation for informational purposes<br>
                                • Actual pricing will be provided after site survey<br>
                                • Government subsidies are subject to eligibility and availability<br>
                                • Terms and conditions apply<br>
                                • Contact us for detailed project proposal
                              </div>
                            </div>
                          </div>

                          <!-- Signature -->
                          <div class="signature-section">
                            <div class="signature-grid">
                              <div class="signature-box">
                                <div class="signature-line"></div>
                                <div class="signature-label">Customer Signature</div>
                              </div>
                              <div class="signature-box">
                                <div class="signature-line"></div>
                                <div class="signature-label">Authorized Signatory</div>
                                <div style="margin-top: 15px; font-size: 10px; color: #ccc;">
                                  Sriyaveda Solar Energies
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Footer -->
                          <div class="footer">
                            <strong>SRIYAVEDA SOLAR ENERGIES</strong> | F No-403, Yalakkaya Street, Near Clock Tower, Eluru - 534001 | Cell: 9440788850
                          </div>
                        </div>
                      </body>
                    </html>
                  `;

                  const element = document.createElement('div');
                  element.innerHTML = sampleQuotationHTML;
                  document.body.appendChild(element);

                  const { default: html2pdf } = await import('html2pdf.js');

                  const options = {
                    margin: 0.5,
                    filename: `Free_Quote_Sriyaveda_Solar_${new Date().toISOString().split('T')[0]}.pdf`,
                    image: { type: 'jpeg' as const, quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', compress: true }
                  } as any;

                  await html2pdf().set(options).from(element).save();
                  document.body.removeChild(element);
                }}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 group font-semibold"
              >
                <span className="flex items-center space-x-2">
                  <span>Get Free Quote</span>
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => {
                  const link1 = document.createElement('a');
                  link1.href = '/brochure/1.jpeg';
                  link1.download = 'Brochure1.jpeg';
                  link1.click();

                  const link2 = document.createElement('a');
                  link2.href = '/brochure/2.jpg';
                  link2.download = 'Brochure2.jpg';
                  link2.click();
                }}
                className="border-2 border-teal-400 text-teal-400 px-8 py-3 rounded-full hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 font-semibold"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 Sriyaveda Solar Energies. All rights reserved. | 
              <span className="text-orange-400 ml-1">Powering India's Solar Revolution</span>
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Warranty</a>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg px-4 py-2">
              <span className="text-green-400 text-sm font-semibold">ISO 9001:2015</span>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg px-4 py-2">
              <span className="text-blue-400 text-sm font-semibold">MNRE Approved</span>
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg px-4 py-2">
              <span className="text-orange-400 text-sm font-semibold">BIS Certified</span>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg px-4 py-2">
              <span className="text-purple-400 text-sm font-semibold">25 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;