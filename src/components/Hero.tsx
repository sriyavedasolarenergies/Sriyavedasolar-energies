import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Sun, Moon, Battery, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [animationActive, setAnimationActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  useEffect(() => {
    setAnimationActive(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const features = [
    { icon: Sun, text: 'Solar Installation', color: 'text-orange-400' },
    { icon: Battery, text: 'Energy Storage', color: 'text-green-400' },
    { icon: Leaf, text: 'Eco-Friendly', color: 'text-teal-400' },
    { icon: Zap, text: 'Grid Connection', color: 'text-yellow-400' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Theme Toggle Button */}
      <div className="absolute top-20 right-4 z-30">
        <button
          onClick={toggleTheme}
          className={`relative group p-3 rounded-full border-2 transition-all duration-300 hover:scale-110 ${isDarkMode ? 'border-black' : 'border-orange-500'}`}
        >
          <div className="relative">
            {isDarkMode ? (
              <Moon className="h-6 w-6 text-white group-hover:animate-spin transition-all duration-500" />
            ) : (
              <Sun className="h-6 w-6 text-orange-500 group-hover:animate-spin transition-all duration-500" />
            )}
          </div>
        </button>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Solar Panels */}
        <div className="hidden lg:block absolute top-20 left-10 w-16 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md transform rotate-12 animate-pulse opacity-20"></div>
        <div className="hidden lg:block absolute top-40 right-20 w-20 h-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md transform -rotate-12 animate-pulse opacity-20 animation-delay-1000"></div>
        <div className="hidden lg:block absolute bottom-40 left-20 w-14 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md transform rotate-45 animate-pulse opacity-20 animation-delay-2000"></div>

        {/* Sun Rays */}
        <div className="hidden lg:block absolute top-20 right-10 w-32 h-32">
          <div className="absolute inset-0 bg-gradient-radial from-orange-400 to-transparent opacity-10 rounded-full animate-ping animation-delay-500"></div>
        </div>

        {/* Energy Flow Lines */}
        <div className="absolute inset-0 hidden lg:block">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 bg-gradient-to-t from-transparent via-orange-400 to-transparent opacity-30 animate-pulse`}
              style={{
                left: `${20 + i * 15}%`,
                height: '100%',
                animationDelay: `${i * 500}ms`,
                transform: `rotate(${Math.random() * 20 - 10}deg)`
              }}
            ></div>
          ))}
        </div>

        {/* Mobile-friendly background elements */}
        <div className="absolute inset-0 md:hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-20 bg-gradient-to-t from-transparent via-orange-400 to-transparent opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-16 bg-gradient-to-t from-transparent via-teal-400 to-transparent opacity-20 animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-12 bg-gradient-to-t from-transparent via-yellow-400 to-transparent opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 lg:py-16">
        <div className={`transition-all duration-1000 ${animationActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Logo Area */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="relative group">
                <Sun className="h-16 w-16 text-orange-500 animate-pulse group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">SRIYAVEDA</span>
                  <span className="text-2xl md:text-4xl" style={{color: '#17D4C9'}}> SOLAR ENERGIES</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight px-4 sm:px-6 lg:px-8">
            Power Your Future with
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              {' '}Clean Energy
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 lg:px-8">
            Transform your home or business with premium solar installations.
            Save money, reduce carbon footprint, and join the renewable energy revolution.
          </p>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 px-4 sm:px-6 lg:px-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 ${
                  animationActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <feature.icon className={`h-8 w-8 sm:h-10 sm:w-10 ${feature.color} group-hover:animate-bounce transition-all duration-300`} />
                  <div className={`absolute inset-0 bg-current rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                </div>
                <span className="text-xs sm:text-sm text-gray-400 mt-2 group-hover:text-white transition-colors text-center">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 px-4 sm:px-6 lg:px-8">
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
              className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center space-x-2 min-h-[44px] w-full sm:w-auto"
            >
              <span className="font-semibold text-sm sm:text-base">Get Free Quote</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </button>

            <button
              onClick={() => navigate('/partners')}
              className="group bg-[#FF6600] text-white px-6 sm:px-8 py-4 rounded-full hover:bg-[#E55A00] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FF6600]/30 min-h-[44px] w-full sm:w-auto"
            >
              <span className="font-semibold text-sm sm:text-base">Our Channel Partners</span>
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </button>

            <button
              onClick={async () => {
                // Generate brochure PDF
                const brochureHTML = `
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <title>Company Brochure - Sriyaveda Solar Energies</title>
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
                        .brochure-container {
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
                          padding: 20px;
                          text-align: center;
                          color: white;
                        }
                        .logo-section {
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          margin-bottom: 15px;
                        }
                        .logo {
                          width: 80px;
                          height: 80px;
                          margin-right: 20px;
                          border-radius: 8px;
                          background: white;
                          padding: 5px;
                        }
                        .company-name {
                          font-size: 28px;
                          font-weight: 700;
                          margin: 0;
                          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
                        }
                        .company-address {
                          font-size: 14px;
                          opacity: 0.9;
                          margin: 8px 0 0 0;
                        }
                        .company-details {
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          margin-top: 15px;
                          font-size: 12px;
                          background: rgba(255,255,255,0.1);
                          padding: 10px;
                          border-radius: 6px;
                        }
                        .hero-section {
                          padding: 30px;
                          text-align: center;
                          background: linear-gradient(135deg, #0AA6F1, #FFB400);
                          color: white;
                        }
                        .hero-title {
                          font-size: 32px;
                          font-weight: 700;
                          margin-bottom: 15px;
                        }
                        .hero-subtitle {
                          font-size: 18px;
                          opacity: 0.9;
                        }
                        .content-section {
                          padding: 25px;
                        }
                        .section-title {
                          color: #FFB400;
                          font-size: 20px;
                          font-weight: 600;
                          margin-bottom: 15px;
                          text-transform: uppercase;
                          letter-spacing: 0.5px;
                        }
                        .section-content {
                          color: #ffffff;
                          font-size: 14px;
                          line-height: 1.6;
                          margin-bottom: 20px;
                        }
                        .features-grid {
                          display: grid;
                          grid-template-columns: 1fr 1fr;
                          gap: 20px;
                          margin-bottom: 25px;
                        }
                        .feature-item {
                          background: #333;
                          padding: 15px;
                          border-radius: 8px;
                          border-left: 4px solid #0AA6F1;
                          text-align: center;
                        }
                        .feature-icon {
                          font-size: 24px;
                          margin-bottom: 8px;
                        }
                        .feature-title {
                          font-size: 16px;
                          font-weight: 600;
                          color: #0AA6F1;
                          margin-bottom: 5px;
                        }
                        .feature-desc {
                          font-size: 12px;
                          color: #ccc;
                        }
                        .stats-section {
                          background: #1a1a1a;
                          padding: 20px;
                          text-align: center;
                        }
                        .stats-grid {
                          display: grid;
                          grid-template-columns: 1fr 1fr 1fr 1fr;
                          gap: 15px;
                        }
                        .stat-item {
                          background: #333;
                          padding: 15px;
                          border-radius: 8px;
                        }
                        .stat-number {
                          font-size: 24px;
                          font-weight: 700;
                          color: #FFB400;
                          margin-bottom: 5px;
                        }
                        .stat-label {
                          font-size: 12px;
                          color: #ccc;
                          text-transform: uppercase;
                          letter-spacing: 0.5px;
                        }
                        .footer {
                          background: #1B3B5F;
                          padding: 15px;
                          text-align: center;
                          color: white;
                          font-size: 12px;
                        }
                        @media print {
                          body { margin: 0; }
                          .brochure-container { box-shadow: none; border: none; }
                        }
                      </style>
                    </head>
                    <body>
                      <div class="brochure-container">
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
                        </div>

                        <!-- Hero Section -->
                        <div class="hero-section">
                          <h2 class="hero-title">Power Your Future with Clean Energy</h2>
                          <p class="hero-subtitle">Leading Solar Solutions for Homes and Businesses</p>
                        </div>

                        <!-- About Section -->
                        <div class="content-section">
                          <h3 class="section-title">About Sriyaveda Solar Energies</h3>
                          <div class="section-content">
                            Sriyaveda Solar Energies is a premier provider of solar energy solutions in Andhra Pradesh. We specialize in designing, installing, and maintaining high-quality solar photovoltaic systems for residential and commercial applications. Our mission is to make renewable energy accessible and affordable for everyone.
                          </div>
                        </div>

                        <!-- Services Section -->
                        <div class="content-section">
                          <h3 class="section-title">Our Services</h3>
                          <div class="features-grid">
                            <div class="feature-item">
                              <div class="feature-icon">☀️</div>
                              <div class="feature-title">Solar Installation</div>
                              <div class="feature-desc">Complete solar PV system installation for homes and businesses</div>
                            </div>
                            <div class="feature-item">
                              <div class="feature-icon">🔋</div>
                              <div class="feature-title">Energy Storage</div>
                              <div class="feature-desc">Battery storage solutions for energy independence</div>
                            </div>
                            <div class="feature-item">
                              <div class="feature-icon">🔧</div>
                              <div class="feature-title">Maintenance</div>
                              <div class="feature-desc">Regular maintenance and support services</div>
                            </div>
                            <div class="feature-item">
                              <div class="feature-icon">💰</div>
                              <div class="feature-title">Consultation</div>
                              <div class="feature-desc">Free site assessment and energy consultation</div>
                            </div>
                          </div>
                        </div>

                        <!-- Benefits Section -->
                        <div class="content-section">
                          <h3 class="section-title">Benefits of Solar Energy</h3>
                          <div class="section-content">
                            • Reduce electricity bills by up to 90%<br>
                            • Generate clean, renewable energy<br>
                            • 25-year warranty on solar panels<br>
                            • Government subsidies available<br>
                            • Low maintenance and long-lasting<br>
                            • Increase property value<br>
                            • Contribute to environmental sustainability<br>
                            • Energy independence and security
                          </div>
                        </div>

                        <!-- Stats Section -->
                        <div class="stats-section">
                          <div class="stats-grid">
                            <div class="stat-item">
                              <div class="stat-number">500+</div>
                              <div class="stat-label">Installations</div>
                            </div>
                            <div class="stat-item">
                              <div class="stat-number">98%</div>
                              <div class="stat-label">Satisfaction</div>
                            </div>
                            <div class="stat-item">
                              <div class="stat-number">25+</div>
                              <div class="stat-label">Years Warranty</div>
                            </div>
                            <div class="stat-item">
                              <div class="stat-number">₹50L+</div>
                              <div class="stat-label">Savings Generated</div>
                            </div>
                          </div>
                        </div>

                        <!-- Footer -->
                        <div class="footer">
                          <strong>SRIYAVEDA SOLAR ENERGIES</strong><br>
                          F No-403, Yalakkaya Street, Near Clock Tower, Eluru - 534001 | Cell: 9440788850<br>
                          Email: sriyavedasolarenergies@gmail.com | Website: sriyavedasolarenergies.in
                        </div>
                      </div>
                    </body>
                  </html>
                `;

                const element = document.createElement('div');
                element.innerHTML = brochureHTML;
                document.body.appendChild(element);

                const { default: html2pdf } = await import('html2pdf.js');

                const options = {
                  margin: 0.5,
                  filename: `Brochure_Sriyaveda_Solar_Energies.pdf`,
                  image: { type: 'jpeg' as const, quality: 0.98 },
                  html2canvas: { scale: 2, useCORS: true },
                  jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', compress: true }
                } as any;

                await html2pdf().set(options).from(element).save();
                document.body.removeChild(element);
              }}
              className="group border-2 border-teal-400 text-teal-400 px-6 sm:px-8 py-4 rounded-full hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-400/30 min-h-[44px] w-full sm:w-auto"
            >
              <span className="font-semibold text-sm sm:text-base">Download Brochure</span>
              <div className="absolute inset-0 bg-teal-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center px-4 sm:px-6 lg:px-8">
            {[
              { number: '500+', label: 'Installations' },
              { number: '98%', label: 'Satisfaction' },
              { number: '25+', label: 'Years Warranty' },
              { number: '₹50L+', label: 'Savings Generated' }
            ].map((stat, index) => (
              <div
                key={index}
                className="group cursor-pointer hover:scale-105 transition-all duration-300 p-2 sm:p-4"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400 group-hover:text-orange-300">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
