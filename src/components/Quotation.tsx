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

  const getFreeQuote = async () => {
    // Generate a sample one-page quotation with customer details masked
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
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              margin-top: 10px;
              font-size: 10px;
              background: rgba(255,255,255,0.1);
              padding: 8px;
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
                  <strong>GST:</strong> 37AEUPE97947G1ZU<br>
                  <strong>Cell:</strong> 9440788850
                </div>
                <div>
                  <strong>Email:</strong> sriyavedasolarenergies@gmail.com<br>
                  <strong>Website:</strong> sriyavedasolarenergies.in
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
  };

  const downloadBrochure = () => {
    // Download the two brochure files
    const link1 = document.createElement('a');
    link1.href = '/brochure/1.jpeg';
    link1.download = 'Brochure1.jpeg';
    link1.click();

    const link2 = document.createElement('a');
    link2.href = '/brochure/2.jpg';
    link2.download = 'Brochure2.jpg';
    link2.click();
  };

  const downloadQuotation = async () => {
    const quotationData = {
      ...formData,
      totalCost: calculateQuotation(),
      subsidy: formData.subsidy,
      netPayable: calculateNetPayable(),
      generatedDate: new Date().toLocaleDateString('en-IN'),
      quotationNo: `Q-${Date.now().toString().slice(-6)}`,
      siteSurveyDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')
    };

    // Calculate BOM based on estimated cost
    const estimatedCost = formData.estimatedCost;
    const panelsCost = estimatedCost * 0.5;
    const inverterCost = estimatedCost * 0.18;
    const mountingWiringCost = estimatedCost * 0.12;
    const installationCost = estimatedCost * 0.1;
    const taxesCost = estimatedCost - (panelsCost + inverterCost + mountingWiringCost + installationCost);

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
              --brand-yellow: #FFB400;
              --brand-blue: #1B3B5F;
              --brand-teal: #0AA6F1;
              --bg-dark: linear-gradient(to bottom, #111827, #000000);
              --text-light: #ffffff;
            }
            * { box-sizing: border-box; }
            body {
              font-family: 'Inter', Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: var(--bg-dark);
              color: var(--text-light);
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .quotation-container {
              max-width: 800px;
              margin: 0 auto;
              background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
              border: 2px solid var(--brand-yellow);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
              page-break-inside: avoid;
              font-family: 'Inter', Arial, sans-serif;
              line-height: 1.4;
            }
            .header {
              background: linear-gradient(135deg, var(--brand-yellow), var(--brand-teal));
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
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              margin-top: 10px;
              font-size: 10px;
              background: rgba(255,255,255,0.1);
              padding: 8px;
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
              color: var(--brand-blue);
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
              border-left: 3px solid var(--brand-teal);
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
              color: var(--text-light);
            }
            .project-summary {
              padding: 15px;
              border-bottom: 1px solid #444;
            }
            .summary-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 12px;
            }
            .summary-item {
              background: #333;
              padding: 12px;
              border-radius: 6px;
              text-align: center;
            }
            .summary-label {
              font-size: 11px;
              color: #ccc;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 4px;
            }
            .summary-value {
              font-size: 14px;
              font-weight: 600;
              color: var(--brand-teal);
            }
            .bom-section {
              padding: 15px;
              page-break-inside: avoid;
            }
            .bom-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
              border: 1px solid #ddd;
              border-radius: 6px;
              overflow: hidden;
            }
            .bom-table th,
            .bom-table td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #444;
            }
            .bom-table th {
              background: var(--brand-blue);
              color: white;
              font-weight: 600;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .bom-table td {
              color: var(--text-light);
              font-size: 13px;
            }
            .bom-table tr:nth-child(even) {
              background: #333;
            }
            .bom-table .total-row {
              background: var(--brand-yellow);
              color: white;
              font-weight: 700;
            }
            .bom-table .subtotal-row {
              background: #444;
              font-weight: 600;
            }
            .payment-terms {
              padding: 15px;
              border-bottom: 1px solid #444;
              page-break-inside: avoid;
            }
            .terms-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .terms-box {
              background: #333;
              padding: 15px;
              border-radius: 6px;
            }
            .terms-title {
              color: var(--brand-blue);
              font-size: 13px;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .terms-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .terms-list li {
              color: #ccc;
              font-size: 11px;
              margin-bottom: 4px;
              padding-left: 12px;
              position: relative;
            }
            .terms-list li:before {
              content: '•';
              color: var(--brand-teal);
              font-weight: bold;
              position: absolute;
              left: 0;
            }
            .bank-details {
              background: var(--brand-blue);
              color: white;
              padding: 15px;
              border-radius: 6px;
              margin-top: 10px;
            }
            .bank-title {
              font-size: 13px;
              font-weight: 600;
              margin-bottom: 8px;
            }
            .bank-info {
              font-size: 11px;
              line-height: 1.4;
            }
            .notes-section {
              padding: 15px;
              border-bottom: 1px solid #444;
              page-break-inside: avoid;
            }
            .notes-box {
              background: #333;
              border: 1px solid #555;
              padding: 12px;
              border-radius: 6px;
            }
            .notes-title {
              color: var(--brand-yellow);
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
              page-break-inside: avoid;
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
              background: var(--brand-blue);
              padding: 10px;
              text-align: center;
              color: white;
              font-size: 10px;
              page-break-inside: avoid;
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
                  <strong>GST:</strong> 37AEUPE97947G1ZU<br>
                  <strong>Cell:</strong> 9440788850
                </div>
                <div>
                  <strong>Email:</strong> sriyavedasolarenergies@gmail.com<br>
                  <strong>Website:</strong> sriyavedasolarenergies.in
                </div>
              </div>
              <div class="quotation-meta">
                <div class="meta-item">
                  <strong>Quotation Date:</strong> ${quotationData.generatedDate}
                </div>
                <div class="meta-item">
                  <strong>Quotation No:</strong> ${quotationData.quotationNo}
                </div>
              </div>
            </div>

            <!-- Customer Details -->
            <div class="customer-section">
              <h2 class="section-title">Customer Details</h2>
              <div class="customer-grid">
                <div class="customer-field">
                  <div class="field-label">Name</div>
                  <div class="field-value">${quotationData.name}</div>
                </div>
                <div class="customer-field">
                  <div class="field-label">Address</div>
                  <div class="field-value">${quotationData.address}</div>
                </div>
                <div class="customer-field">
                  <div class="field-label">Phone</div>
                  <div class="field-value">${quotationData.phone}</div>
                </div>
                <div class="customer-field">
                  <div class="field-label">Email</div>
                  <div class="field-value">${quotationData.email}</div>
                </div>
              </div>
            </div>

            <!-- Project Summary -->
            <div class="project-summary">
              <h2 class="section-title">Project Summary</h2>
              <div class="summary-grid">
                <div class="summary-item">
                  <div class="summary-label">Project Title</div>
                  <div class="summary-value">Solar PV System</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">System Size</div>
                  <div class="summary-value">${formData.systemSize} kW</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Module Brand</div>
                  <div class="summary-value">${panelBrands.find(p => p.value === formData.panelBrand)?.label}</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Inverter Brand</div>
                  <div class="summary-value">${inverterBrands.find(i => i.value === formData.inverterBrand)?.label}</div>
                </div>
                <div class="summary-item">
                  <div class="summary-label">Wiring Brand</div>
                  <div class="summary-value">${wiringBrands.find(w => w.value === formData.wiringBrand)?.label}</div>
                </div>
              </div>
            </div>

            <!-- Bill of Materials -->
            <div class="bom-section">
              <h2 class="section-title">Bill of Materials (BOM)</h2>
              <table class="bom-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Solar Panels (${panelBrands.find(p => p.value === formData.panelBrand)?.label})</td>
                    <td>${Math.ceil(formData.systemSize * 1000 / 500)} Nos</td>
                    <td>*</td>
                    <td>*</td>
                  </tr>
                  <tr>
                    <td>Inverter (${inverterBrands.find(i => i.value === formData.inverterBrand)?.label})</td>
                    <td>${Math.ceil(formData.systemSize / 5)} Nos</td>
                    <td>*</td>
                    <td>*</td>
                  </tr>
                  <tr>
                    <td>Mounting Structure</td>
                    <td>1 Set</td>
                    <td>*</td>
                    <td>*</td>
                  </tr>
                  <tr>
                    <td>Cables, Junctions & Earthing</td>
                    <td>1 Set</td>
                    <td>*</td>
                    <td>*</td>
                  </tr>
                  <tr>
                    <td>Installation & Labour</td>
                    <td>1 Lot</td>
                    <td>*</td>
                    <td>*</td>
                  </tr>
                  <tr>
                    <td>Net Metering / Documentation</td>
                    <td>1 Lot</td>
                    <td>*</td>
                    <td>*</td>
                  </tr>
                  <tr class="subtotal-row">
                    <td colspan="3"><strong>Subtotal</strong></td>
                    <td><strong>*</strong></td>
                  </tr>
                  <tr>
                    <td>Taxes (GST)</td>
                    <td>-</td>
                    <td>-</td>
                    <td>*</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="3"><strong>Total Payable</strong></td>
                    <td><strong>*</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Payment Terms & Warranty -->
            <div class="payment-terms">
              <div class="terms-grid">
                <div class="terms-box">
                  <div class="terms-title">Payment Terms</div>
                  <ul class="terms-list">
                    <li>90% advance payment</li>
                    <li>10% on commissioning</li>
                  </ul>
                </div>
                <div class="terms-box">
                  <div class="terms-title">Warranty Summary</div>
                  <ul class="terms-list">
                    <li>Modules: 25 years</li>
                    <li>Inverter: 5 years</li>
                    <li>Mounting: 10 years</li>
                  </ul>
                </div>
              </div>
              <div class="terms-box" style="margin-top: 15px;">
                <div class="terms-title">Scope of Work</div>
                <ul class="terms-list">
                  <li>Site survey and assessment</li>
                  <li>Design and engineering</li>
                  <li>Supply and installation</li>
                  <li>Testing and commissioning</li>
                  <li>Documentation and net metering</li>
                </ul>
              </div>
              <div class="terms-box" style="margin-top: 15px;">
                <div class="terms-title">Project Timeline</div>
                <ul class="terms-list">
                  <li>Site survey: Within 7 days</li>
                  <li>Installation: 15-20 days</li>
                  <li>Commissioning: Within 30 days</li>
                </ul>
              </div>
              <div class="bank-details">
                <div class="bank-title">Bank Details (for advance payment)</div>
                <div class="bank-info">
                  <strong>Bank:</strong> CANARA BANK<br>
                  <strong>A/C Name:</strong> SRIYAVEDA SOLAR ENERGIES<br>
                  <strong>A/C No:</strong> 120036638728<br>
                  <strong>IFSC:</strong> CNRB0000660<br>
                  <strong>Branch:</strong> ELURU
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div class="notes-section">
              <div class="notes-box">
                <div class="notes-title">Additional Notes</div>
                <div class="notes-text">
                  • Prices are valid for 30 days from quotation date<br>
                  • All taxes and duties as applicable<br>
                  • Terms and conditions apply<br>
                  • Subject to site feasibility and approvals
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
    element.innerHTML = quotationHTML;
    document.body.appendChild(element);

    const options = {
      margin: 0.5,
      filename: `Quotation_${formData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', compress: true }
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
            <div className="mt-6">
              <button
                onClick={downloadBrochure}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download Brochure</span>
              </button>
            </div>
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
                        <span className="text-yellow-400">*</span>
                      </div>
                      <hr className="border-gray-600" />
                      <div className="flex justify-between text-lg">
                        <span className="text-white">Total Cost:</span>
                        <span className="text-green-400">*</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-white">Subsidy:</span>
                        <span className="text-blue-400">*</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold">
                        <span className="text-white">Net Payable:</span>
                        <span className="text-orange-400">*</span>
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
