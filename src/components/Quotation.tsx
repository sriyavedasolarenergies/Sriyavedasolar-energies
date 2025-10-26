import React, { useState } from 'react';
import { FileText, Download, User, Phone, Mail, MapPin, Home, Zap, Settings, CheckCircle } from 'lucide-react';

interface QuotationData {
  name: string;
  email: string;
  phone: string;
  address: string;
  systemSize: number;
  panelBrand: string;
  inverterBrand: string;
  wiringBrand: string;
  roofType: string;
  installationType: string;
}

const Quotation = () => {
  const [formData, setFormData] = useState<QuotationData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    systemSize: 5,
    panelBrand: 'tata',
    inverterBrand: 'luminous',
    wiringBrand: 'polycab',
    roofType: 'concrete',
    installationType: 'grid-tie'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [quotationGenerated, setQuotationGenerated] = useState(false);

  const panelBrands = [
    { value: 'tata', label: 'Tata Solar', price: 25, warranty: '25 years' },
    { value: 'adani', label: 'Adani Solar', price: 28, warranty: '25 years' },
    { value: 'vikram', label: 'Vikram Solar', price: 24, warranty: '25 years' },
    { value: 'waaree', label: 'Waaree Solar', price: 26, warranty: '25 years' },
    { value: 'luminous', label: 'Luminous Solar', price: 27, warranty: '25 years' }
  ];

  const inverterBrands = [
    { value: 'luminous', label: 'Luminous', price: 15000, warranty: '5 years' },
    { value: 'microtek', label: 'Microtek', price: 14000, warranty: '3 years' },
    { value: 'sukam', label: 'Sukam', price: 16000, warranty: '5 years' },
    { value: 'exide', label: 'Exide', price: 15500, warranty: '4 years' },
    { value: 'delta', label: 'Delta', price: 18000, warranty: '5 years' }
  ];

  const wiringBrands = [
    { value: 'polycab', label: 'Polycab', price: 2000, warranty: '10 years' },
    { value: 'havells', label: 'Havells', price: 2200, warranty: '10 years' },
    { value: 'finolex', label: 'Finolex', price: 1800, warranty: '8 years' },
    { value: 'kei', label: 'KEI', price: 2100, warranty: '10 years' }
  ];

  const calculateQuotation = () => {
    const selectedPanel = panelBrands.find(p => p.value === formData.panelBrand);
    const selectedInverter = inverterBrands.find(i => i.value === formData.inverterBrand);
    const selectedWiring = wiringBrands.find(w => w.value === formData.wiringBrand);

    if (!selectedPanel || !selectedInverter || !selectedWiring) return 0;

    const panelCost = formData.systemSize * 1000 * selectedPanel.price; // per watt
    const inverterCost = Math.ceil(formData.systemSize / 5) * selectedInverter.price; // 5kW inverters
    const wiringCost = formData.systemSize * selectedWiring.price; // per kW
    const installationCost = formData.systemSize * 8000; // installation per kW
    const otherCosts = formData.systemSize * 5000; // mounting, earthing, etc.

    return panelCost + inverterCost + wiringCost + installationCost + otherCosts;
  };

  const generateQuotation = async () => {
    setIsGenerating(true);
    
    // Simulate Google Forms submission
    const googleFormData = new FormData();
    googleFormData.append('entry.name', formData.name);
    googleFormData.append('entry.email', formData.email);
    googleFormData.append('entry.phone', formData.phone);
    googleFormData.append('entry.address', formData.address);
    googleFormData.append('entry.systemSize', formData.systemSize.toString());
    googleFormData.append('entry.panelBrand', formData.panelBrand);
    googleFormData.append('entry.inverterBrand', formData.inverterBrand);

    setTimeout(() => {
      setIsGenerating(false);
      setQuotationGenerated(true);
    }, 2000);
  };

  const downloadQuotation = () => {
    const quotationData = {
      ...formData,
      totalCost: calculateQuotation(),
      generatedDate: new Date().toLocaleDateString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };

    const quotationHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Solar Quotation - Sriyaveda Solar Energies</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .content { margin: 20px 0; }
            .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .table th { background-color: #f4f4f4; }
            .total { background-color: #fff3cd; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SRIYAVEDA SOLAR ENERGIES</h1>
            <h2>Solar Installation Quotation</h2>
          </div>
          <div class="content">
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${quotationData.name}</p>
            <p><strong>Email:</strong> ${quotationData.email}</p>
            <p><strong>Phone:</strong> ${quotationData.phone}</p>
            <p><strong>Address:</strong> ${quotationData.address}</p>
            
            <h3>System Specification</h3>
            <table class="table">
              <tr><th>Component</th><th>Brand/Type</th><th>Specification</th><th>Cost</th></tr>
              <tr><td>Solar Panels</td><td>${panelBrands.find(p => p.value === formData.panelBrand)?.label}</td><td>${formData.systemSize} kW</td><td>₹${(formData.systemSize * 1000 * (panelBrands.find(p => p.value === formData.panelBrand)?.price || 0)).toLocaleString()}</td></tr>
              <tr><td>Inverter</td><td>${inverterBrands.find(i => i.value === formData.inverterBrand)?.label}</td><td>${Math.ceil(formData.systemSize / 5)} units</td><td>₹${(Math.ceil(formData.systemSize / 5) * (inverterBrands.find(i => i.value === formData.inverterBrand)?.price || 0)).toLocaleString()}</td></tr>
              <tr><td>Wiring & Cables</td><td>${wiringBrands.find(w => w.value === formData.wiringBrand)?.label}</td><td>Complete set</td><td>₹${(formData.systemSize * (wiringBrands.find(w => w.value === formData.wiringBrand)?.price || 0)).toLocaleString()}</td></tr>
              <tr><td>Installation</td><td>Professional</td><td>Complete setup</td><td>₹${(formData.systemSize * 8000).toLocaleString()}</td></tr>
              <tr><td>Other Components</td><td>Mounting, Earthing</td><td>Complete kit</td><td>₹${(formData.systemSize * 5000).toLocaleString()}</td></tr>
              <tr class="total"><td colspan="3"><strong>Total System Cost</strong></td><td><strong>₹${quotationData.totalCost.toLocaleString()}</strong></td></tr>
            </table>
            
            <p><strong>Quotation Date:</strong> ${quotationData.generatedDate}</p>
            <p><strong>Valid Until:</strong> ${quotationData.validUntil}</p>
            
            <h3>Contact Information</h3>
            <p>SRIYAVEDA SOLAR ENERGIES<br>
            Phone: +91 9999999999<br>
            Email: info@sriyavedasolar.com</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([quotationHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sriyaveda_Solar_Quotation_${formData.name.replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="quotation" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Your{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Custom Quotation
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Customize your solar system with premium components and get an instant quotation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">System Configuration</h3>
            </div>

            <div className="space-y-6">
              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                    placeholder="+91 9999999999"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  Installation Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors h-24"
                  placeholder="Enter complete address"
                />
              </div>

              {/* System Configuration */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  <Zap className="inline h-4 w-4 mr-2" />
                  System Size: {formData.systemSize} kW
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={formData.systemSize}
                  onChange={(e) => setFormData({...formData, systemSize: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Component Selection */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Panel Brand</label>
                  <select
                    value={formData.panelBrand}
                    onChange={(e) => setFormData({...formData, panelBrand: e.target.value})}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  >
                    {panelBrands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Inverter Brand</label>
                  <select
                    value={formData.inverterBrand}
                    onChange={(e) => setFormData({...formData, inverterBrand: e.target.value})}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  >
                    {inverterBrands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Wiring Brand</label>
                  <select
                    value={formData.wiringBrand}
                    onChange={(e) => setFormData({...formData, wiringBrand: e.target.value})}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  >
                    {wiringBrands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={generateQuotation}
                disabled={isGenerating || !formData.name || !formData.email || !formData.phone}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Quotation...</span>
                  </>
                ) : (
                  <>
                    <Settings className="h-5 w-5" />
                    <span>Generate Quotation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quotation Preview */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Quotation Preview</h3>
            </div>

            {quotationGenerated ? (
              <div className="space-y-6">
                <div className="flex items-center text-green-400 mb-4">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span className="font-semibold">Quotation Generated Successfully!</span>
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4">System Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">System Size:</span>
                      <span className="text-orange-400 font-semibold">{formData.systemSize} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Solar Panels:</span>
                      <span className="text-teal-400">{panelBrands.find(p => p.value === formData.panelBrand)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Inverter:</span>
                      <span className="text-teal-400">{inverterBrands.find(i => i.value === formData.inverterBrand)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Wiring:</span>
                      <span className="text-teal-400">{wiringBrands.find(w => w.value === formData.wiringBrand)?.label}</span>
                    </div>
                    <hr className="border-gray-600" />
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">Total Cost:</span>
                      <span className="text-green-400">₹{calculateQuotation().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={downloadQuotation}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Quotation</span>
                </button>

                <div className="text-center text-gray-400 text-sm">
                  <p>Quotation valid for 30 days from generation date</p>
                  <p className="mt-2">Our team will contact you within 24 hours</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  Fill out the form to generate your custom quotation
                </p>
                <div className="mt-6 text-gray-500">
                  <p>Estimated Cost: ₹{calculateQuotation().toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quotation;