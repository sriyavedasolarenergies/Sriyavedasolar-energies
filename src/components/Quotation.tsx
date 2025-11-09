import React, { useState } from 'react';
import { FileText, Download, User, Phone, Mail, MapPin, Zap, Settings, CheckCircle } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

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
  estimatedCost: number;
  subsidy: number;
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
    installationType: 'grid-tie',
    estimatedCost: 215000,
    subsidy: 0
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [quotationGenerated, setQuotationGenerated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

    if (!selectedPanel || !selectedInverter || !selectedWiring) return formData.estimatedCost;

    const panelCost = formData.systemSize * 1000 * selectedPanel.price; // per watt
    const inverterCost = Math.ceil(formData.systemSize / 5) * selectedInverter.price; // 5kW inverters
    const wiringCost = formData.systemSize * selectedWiring.price; // per kW
    const installationCost = formData.systemSize * 8000; // installation per kW
    const otherCosts = formData.systemSize * 5000; // mounting, earthing, etc.

    const calculatedTotal = panelCost + inverterCost + wiringCost + installationCost + otherCosts;
    return formData.estimatedCost || calculatedTotal;
  };

  const calculateSubsidy = () => {
    const total = calculateQuotation();
    // Assuming 30% subsidy for residential systems
    return Math.min(total * 0.3, 78000); // Max subsidy limit
  };

  const calculateNetPayable = () => {
    return calculateQuotation() - formData.subsidy;
  };

  const generateQuotation = async () => {
    setIsGenerating(true);
    setShowPreview(true);

    // Calculate subsidy
    const subsidyAmount = calculateSubsidy();
    setFormData(prev => ({ ...prev, subsidy: subsidyAmount }));

    // Prepare form data for Google Forms submission
    const formDataToSend = new URLSearchParams();
    formDataToSend.append('entry.1740945350', formData.name);
    formDataToSend.append('entry.500770270', formData.phone);
    formDataToSend.append('entry.939106288', formData.email);
    formDataToSend.append('entry.200772604', formData.address);
    formDataToSend.append('entry.614718639', formData.systemSize.toString());
    formDataToSend.append('entry.1982031410', formData.estimatedCost.toString());
    formDataToSend.append('entry.1760581862', panelBrands.find(p => p.value === formData.panelBrand)?.label || formData.panelBrand);
    formDataToSend.append('entry.983575224', inverterBrands.find(i => i.value === formData.inverterBrand)?.label || formData.inverterBrand);

    // Submit to Google Forms (CORS will cause error but submission may still work)
    try {
      console.log('Submitting to Google Forms...');
      console.log('Form data being sent:', Object.fromEntries(formDataToSend));

      // Use fetch with no-cors mode to avoid CORS errors
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSd4JzE-aPQrNSmz4bMS_t7bY3NNpZyWECv_x95sg3l7kg6Oaw/formResponse', {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('Form submission request sent (CORS may block response but data should be recorded)');

    } catch (error) {
      console.error('Form submission error:', error);
      console.log('This is normal due to CORS - data may still have been submitted successfully');
    }

    // Always proceed with quotation generation regardless of submission status
    setTimeout(() => {
      setIsGenerating(false);
      setQuotationGenerated(true);
    }, 2000);
  };

  const downloadBrochure = () => {
    // Open the two brochure images in new tabs
    window.open('/ai-images/1.png', '_blank');
    window.open('/ai-images/2.png', '_blank');
  };

  const downloadQuotation = async () => {
    const quotationData = {
      ...formData,
      totalCost: calculateQuotation(),
      subsidy: formData.subsidy,
      netPayable: calculateNetPayable(),
      generatedDate: new Date().toLocaleDateString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };

    // Client-side PDF generation using html2pdf.js
    const { default: html2pdf } = await import('html2pdf.js');

    const quotationHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Solar Quotation - Sriyaveda Solar Energies</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            :root {
              --brand-orange: #FF6600;
              --bg-dark: #1a1a1a;
              --card-bg: #2a2a2a;
            }
            * { box-sizing: border-box; }
            body {
              font-family: 'Inter', Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: var(--bg-dark);
              color: #ffffff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .quotation-container {
              max-width: 800px;
              margin: 0 auto;
              background: var(--card-bg);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .header {
              background: linear-gradient(135deg, var(--brand-orange), #ff8533);
              padding: 30px;
              text-align: center;
              color: white;
            }
            .logo-section {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
            }
            .company-name {
              font-size: 28px;
              font-weight: 700;
              margin: 0;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            .tagline {
              font-size: 16px;
              opacity: 0.9;
              margin: 5px 0 0 0;
            }
            .company-details {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-top: 20px;
              font-size: 12px;
            }
            .customer-section {
              padding: 30px;
              border-bottom: 1px solid #444;
            }
            .section-title {
              color: var(--brand-orange);
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .customer-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
            }
            .customer-field {
              background: #333;
              padding: 12px;
              border-radius: 8px;
              border-left: 4px solid var(--brand-orange);
            }
            .field-label {
              font-size: 11px;
              color: #ccc;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 4px;
            }
            .field-value {
              font-size: 14px;
              font-weight: 500;
              color: #fff;
            }
            .system-section {
              padding: 30px;
            }
            .component-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              background: #333;
              border-radius: 8px;
              overflow: hidden;
            }
            .component-table th,
            .component-table td {
              padding: 15px;
              text-align: left;
              border-bottom: 1px solid #444;
            }
            .component-table th {
              background: #2a2a2a;
              color: var(--brand-orange);
              font-weight: 600;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .component-table td {
              color: #fff;
              font-size: 14px;
            }
            .component-table tr:last-child {
              background: linear-gradient(135deg, var(--brand-orange), #ff8533);
              color: white;
            }
            .component-table tr:last-child td {
              font-weight: 700;
              font-size: 16px;
            }
            .totals-section {
              padding: 30px;
              background: #2a2a2a;
            }
            .totals-grid {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 20px;
            }
            .total-box {
              background: #333;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
            }
            .total-label {
              font-size: 12px;
              color: #ccc;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 8px;
            }
            .total-amount {
              font-size: 20px;
              font-weight: 700;
              color: var(--brand-orange);
            }
            .net-payable {
              background: linear-gradient(135deg, var(--brand-orange), #ff8533) !important;
              color: white !important;
            }
            .terms-section {
              padding: 30px;
              border-top: 1px solid #444;
            }
            .terms-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
            }
            .terms-box {
              background: #333;
              padding: 20px;
              border-radius: 8px;
            }
            .terms-title {
              color: var(--brand-orange);
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .terms-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .terms-list li {
              color: #ccc;
              font-size: 12px;
              margin-bottom: 5px;
              padding-left: 15px;
              position: relative;
            }
            .terms-list li:before {
              content: '✓';
              color: var(--brand-orange);
              font-weight: bold;
              position: absolute;
              left: 0;
            }
            .bank-details {
              background: #2a2a2a;
              padding: 20px;
              border-radius: 8px;
              margin-top: 15px;
            }
            .bank-title {
              color: var(--brand-orange);
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .bank-info {
              color: #ccc;
              font-size: 12px;
              line-height: 1.4;
            }
            .signature-section {
              padding: 30px;
              text-align: center;
              border-top: 1px solid #444;
            }
            .signature-line {
              width: 200px;
              height: 1px;
              background: var(--brand-orange);
              margin: 20px auto;
            }
            .signature-text {
              color: #ccc;
              font-size: 12px;
              margin-top: 10px;
            }
            .footer {
              background: linear-gradient(135deg, var(--brand-orange), #ff8533);
              padding: 20px;
              text-align: center;
              color: white;
              font-size: 12px;
            }
            @media print {
              body { margin: 0; }
              .quotation-container { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="quotation-container">
            <!-- Header -->
            <div class="header">
              <div class="logo-section">
                <div>
                  <h1 class="company-name">SRIYAVEDA SOLAR ENERGIES</h1>
                  <p class="tagline">Powering Your Future with Solar Energy</p>
                </div>
              </div>
              <div class="company-details">
                <div>
                  <strong>GST No:</strong> 37ABCDE1234F1Z5<br>
                  <strong>Phone:</strong> +91 9440788850<br>
                  <strong>Email:</strong> info@sriyavedasolar.com
                </div>
                <div>
                  <strong>Address:</strong> Vijayawada, Andhra Pradesh<br>
                  <strong>Website:</strong> www.sriyavedasolar.com<br>
                  <strong>Date:</strong> ${quotationData.generatedDate}
                </div>
              </div>
            </div>

            <!-- Customer Details -->
            <div class="customer-section">
              <h2 class="section-title">Customer Details</h2>
              <div class="customer-grid">
                <div class="customer-field">
                  <div class="field-label">Full Name</div>
                  <div class="field-value">${quotationData.name}</div>
                </div>
                <div class="customer-field">
                  <div class="field-label">Phone Number</div>
                  <div class="field-value">${quotationData.phone}</div>
                </div>
                <div class="customer-field">
                  <div class="field-label">Email Address</div>
                  <div class="field-value">${quotationData.email}</div>
                </div>
                <div class="customer-field">
                  <div class="field-label">Installation Address</div>
                  <div class="field-value">${quotationData.address}</div>
                </div>
              </div>
            </div>

            <!-- System Specification -->
            <div class="system-section">
              <h2 class="section-title">System Specification</h2>
              <table class="component-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Brand/Type</th>
                    <th>Specification</th>
                    <th>Cost (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Solar Panels</td>
                    <td>${panelBrands.find(p => p.value === formData.panelBrand)?.label}</td>
                    <td>${formData.systemSize} kW System</td>
                    <td>${(formData.systemSize * 1000 * (panelBrands.find(p => p.value === formData.panelBrand)?.price || 0)).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Inverter</td>
                    <td>${inverterBrands.find(i => i.value === formData.inverterBrand)?.label}</td>
                    <td>${Math.ceil(formData.systemSize / 5)} Units</td>
                    <td>${(Math.ceil(formData.systemSize / 5) * (inverterBrands.find(i => i.value === formData.inverterBrand)?.price || 0)).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Wiring & Cables</td>
                    <td>${wiringBrands.find(w => w.value === formData.wiringBrand)?.label}</td>
                    <td>Complete Set</td>
                    <td>${(formData.systemSize * (wiringBrands.find(w => w.value === formData.wiringBrand)?.price || 0)).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Installation</td>
                    <td>Professional</td>
                    <td>Complete Setup</td>
                    <td>${(formData.systemSize * 8000).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Other Components</td>
                    <td>Mounting, Earthing</td>
                    <td>Complete Kit</td>
                    <td>${(formData.systemSize * 5000).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colspan="3"><strong>Total System Cost</strong></td>
                    <td><strong>${quotationData.totalCost.toLocaleString()}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Totals -->
            <div class="totals-section">
              <div class="totals-grid">
                <div class="total-box">
                  <div class="total-label">Total Cost</div>
                  <div class="total-amount">₹${quotationData.totalCost.toLocaleString()}</div>
                </div>
                <div class="total-box">
                  <div class="total-label">Subsidy</div>
                  <div class="total-amount">₹${quotationData.subsidy.toLocaleString()}</div>
                </div>
                <div class="total-box net-payable">
                  <div class="total-label">Net Payable</div>
                  <div class="total-amount">₹${quotationData.netPayable.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <!-- Terms & Conditions -->
            <div class="terms-section">
              <div class="terms-grid">
                <div class="terms-box">
                  <div class="terms-title">Warranty & Terms</div>
                  <ul class="terms-list">
                    <li>Solar Panels: 25 years performance warranty</li>
                    <li>Inverter: 5 years comprehensive warranty</li>
                    <li>Installation: 2 years workmanship warranty</li>
                    <li>Valid for 30 days from quotation date</li>
                    <li>Payment terms: 50% advance, 50% on completion</li>
                  </ul>
                </div>
                <div class="terms-box">
                  <div class="terms-title">Bank Details</div>
                  <div class="bank-details">
                    <div class="bank-info">
                      <strong>Account Name:</strong> SRIYAVEDA SOLAR ENERGIES<br>
                      <strong>Account No:</strong> 123456789012<br>
                      <strong>IFSC Code:</strong> SBIN0001234<br>
                      <strong>Bank:</strong> State Bank of India<br>
                      <strong>Branch:</strong> Vijayawada Main
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Signature -->
            <div class="signature-section">
              <div class="signature-line"></div>
              <div class="signature-text">Authorized Signature</div>
              <div style="margin-top: 20px; font-size: 11px; color: #888;">
                This quotation is system generated and valid for 30 days.
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <strong>SRIYAVEDA SOLAR ENERGIES</strong> | Vijayawada, Andhra Pradesh | +91 9440788850 | www.sriyavedasolar.com
            </div>
          </div>
        </body>
      </html>
    `;

    const element = document.createElement('div');
    element.innerHTML = quotationHTML;
    document.body.appendChild(element);

    const options = {
      margin: 0.5,
      filename: `Quotation_${formData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    } as any;

    await html2pdf().set(options).from(element).save();
    document.body.removeChild(element);
  };

  return (
    <section id="quotation" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="fade" delay={0.2}>
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
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <ScrollAnimation direction="left" delay={0.3}>
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

                {/* Estimated Cost Input */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    <Settings className="inline h-4 w-4 mr-2" />
                    Estimated Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) => setFormData({...formData, estimatedCost: Number(e.target.value)})}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                    placeholder="Enter estimated cost"
                    min="0"
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
                      <option value="tata">Tata Solar</option>
                      <option value="adani">Adani Solar</option>
                      <option value="vikram">Vikram Solar</option>
                      <option value="waaree">Waaree Solar</option>
                      <option value="luminous">Luminous Solar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Inverter Brand</label>
                    <select
                      value={formData.inverterBrand}
                      onChange={(e) => setFormData({...formData, inverterBrand: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                    >
                      <option value="luminous">Luminous</option>
                      <option value="microtek">Microtek</option>
                      <option value="sukam">Sukam</option>
                      <option value="exide">Exide</option>
                      <option value="delta">Delta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Wiring Brand</label>
                    <select
                      value={formData.wiringBrand}
                      onChange={(e) => setFormData({...formData, wiringBrand: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                    >
                      <option value="polycab">Polycab</option>
                      <option value="havells">Havells</option>
                      <option value="finolex">Finolex</option>
                      <option value="kei">KEI</option>
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
          </ScrollAnimation>

          {/* Quotation Preview */}
          <ScrollAnimation direction="right" delay={0.4}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Quotation Preview</h3>
              </div>

              {showPreview ? (
                <div className="space-y-6">
                  {isGenerating ? (
                    <div className="text-center py-20">
                      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-300 text-lg">Generating your quotation...</p>
                      <p className="text-gray-400 text-sm mt-2">Submitting to Google Forms...</p>
                    </div>
                  ) : quotationGenerated ? (
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
                      <div className="flex justify-between">
                        <span className="text-gray-300">Estimated Cost:</span>
                        <span className="text-yellow-400">₹{formData.estimatedCost.toLocaleString()}</span>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="flex justify-between text-lg">
                        <span className="text-white">Total Cost:</span>
                        <span className="text-green-400">₹{calculateQuotation().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-white">Subsidy:</span>
                        <span className="text-blue-400">₹{formData.subsidy.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold">
                        <span className="text-white">Net Payable:</span>
                        <span className="text-orange-400">₹{calculateNetPayable().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadQuotation}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download PDF Quotation</span>
                  </button>

                  <button
                    onClick={downloadBrochure}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Brochure</span>
                  </button>

                  <div className="text-center text-gray-400 text-sm">
                    <p>Quotation valid for 30 days from generation date</p>
                    <p className="mt-2">Our team will contact you within 24 hours</p>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => {
                        const element = document.getElementById('partner-registration');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="bg-[#FF6600] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e55a00] transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Become Our Channel Partner
                    </button>
                  </div>
                    </div>
                  ) : null}
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
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Quotation;
