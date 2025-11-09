const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Quotation template function
function generateQuotationHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Solar Quotation - Sriyaveda Solar Energies</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          body {
            font-family: 'Inter', Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #1a1a1a;
            color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .quotation-container {
            max-width: 800px;
            margin: 0 auto;
            background: #2a2a2a;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          .header {
            background: linear-gradient(135deg, #FF6600, #ff8533);
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
            color: #FF6600;
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
            border-left: 4px solid #FF6600;
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
            color: #FF6600;
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
            background: linear-gradient(135deg, #FF6600, #ff8533);
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
            color: #FF6600;
          }
          .net-payable {
            background: linear-gradient(135deg, #FF6600, #ff8533) !important;
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
            color: #FF6600;
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
            color: #FF6600;
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
            color: #FF6600;
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
            background: #FF6600;
            margin: 20px auto;
          }
          .signature-text {
            color: #ccc;
            font-size: 12px;
            margin-top: 10px;
          }
          .footer {
            background: linear-gradient(135deg, #FF6600, #ff8533);
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
                <strong>Date:</strong> ${data.generatedDate}
              </div>
            </div>
          </div>

          <!-- Customer Details -->
          <div class="customer-section">
            <h2 class="section-title">Customer Details</h2>
            <div class="customer-grid">
              <div class="customer-field">
                <div class="field-label">Full Name</div>
                <div class="field-value">${data.name}</div>
              </div>
              <div class="customer-field">
                <div class="field-label">Phone Number</div>
                <div class="field-value">${data.phone}</div>
              </div>
              <div class="customer-field">
                <div class="field-label">Email Address</div>
                <div class="field-value">${data.email}</div>
              </div>
              <div class="customer-field">
                <div class="field-label">Installation Address</div>
                <div class="field-value">${data.address}</div>
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
                  <td>${data.panelBrand}</td>
                  <td>${data.systemSize} kW System</td>
                  <td>${data.panelCost}</td>
                </tr>
                <tr>
                  <td>Inverter</td>
                  <td>${data.inverterBrand}</td>
                  <td>${data.inverterUnits} Units</td>
                  <td>${data.inverterCost}</td>
                </tr>
                <tr>
                  <td>Wiring & Cables</td>
                  <td>${data.wiringBrand}</td>
                  <td>Complete Set</td>
                  <td>${data.wiringCost}</td>
                </tr>
                <tr>
                  <td>Installation</td>
                  <td>Professional</td>
                  <td>Complete Setup</td>
                  <td>${data.installationCost}</td>
                </tr>
                <tr>
                  <td>Other Components</td>
                  <td>Mounting, Earthing</td>
                  <td>Complete Kit</td>
                  <td>${data.otherCosts}</td>
                </tr>
                <tr>
                  <td colspan="3"><strong>Total System Cost</strong></td>
                  <td><strong>${data.totalCost}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Totals -->
          <div class="totals-section">
            <div class="totals-grid">
              <div class="total-box">
                <div class="total-label">Total Cost</div>
                <div class="total-amount">₹${data.totalCost}</div>
              </div>
              <div class="total-box">
                <div class="total-label">Subsidy</div>
                <div class="total-amount">₹${data.subsidy}</div>
              </div>
              <div class="total-box net-payable">
                <div class="total-label">Net Payable</div>
                <div class="total-amount">₹${data.netPayable}</div>
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
}

// API endpoint to generate PDF
app.post('/api/generate-quotation', async (req, res) => {
  try {
    const data = req.body;

    // Calculate costs
    const panelCost = (data.systemSize * 1000 * data.panelPrice).toLocaleString();
    const inverterCost = (Math.ceil(data.systemSize / 5) * data.inverterPrice).toLocaleString();
    const wiringCost = (data.systemSize * data.wiringPrice).toLocaleString();
    const installationCost = (data.systemSize * 8000).toLocaleString();
    const otherCosts = (data.systemSize * 5000).toLocaleString();
    const totalCost = data.estimatedCost.toLocaleString();
    const subsidy = Math.min(data.estimatedCost * 0.3, 78000).toLocaleString();
    const netPayable = (data.estimatedCost - parseInt(subsidy.replace(/,/g, ''))).toLocaleString();

    const quotationData = {
      ...data,
      panelCost,
      inverterCost,
      inverterUnits: Math.ceil(data.systemSize / 5),
      wiringCost,
      installationCost,
      otherCosts,
      totalCost,
      subsidy,
      netPayable,
      generatedDate: new Date().toLocaleDateString()
    };

    const htmlContent = generateQuotationHTML(quotationData);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });

    await browser.close();

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Quotation_${data.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf"`);

    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Google Apps Script webhook endpoint
app.post('/api/webhook/quotation', (req, res) => {
  const data = req.body;
  console.log('Received quotation data:', data);

  // Here you can process the data, save to database, send emails, etc.

  res.json({ success: true, message: 'Quotation data received' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
