// Email utility for sending notifications about contact inquiries
// Currently set up but not sending emails as requested

export interface ContactInquiryData {
  name: string;
  phone: string;
  vendorName: string;
  vendorSlug: string;
  inquiryId: string;
}

export async function sendContactInquiryEmail(inquiryData: ContactInquiryData) {
  const { name, phone, vendorName, vendorSlug, inquiryId } = inquiryData;

  // Email content
  const subject = `New Contact Inquiry for ${vendorName}`;
  const htmlContent = `
    <h2>New Contact Inquiry Received</h2>
    <p><strong>Customer Details:</strong></p>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Phone:</strong> ${phone}</li>
    </ul>
    <p><strong>Vendor:</strong> ${vendorName}</p>
    <p><strong>Vendor Slug:</strong> ${vendorSlug}</p>
    <p><strong>Inquiry ID:</strong> ${inquiryId}</p>
    <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
    <hr>
    <p>Please contact the customer at your earliest convenience.</p>
  `;

  const textContent = `
    New Contact Inquiry Received

    Customer Details:
    - Name: ${name}
    - Phone: ${phone}

    Vendor: ${vendorName}
    Vendor Slug: ${vendorSlug}
    Inquiry ID: ${inquiryId}
    Submitted At: ${new Date().toLocaleString()}

    Please contact the customer at your earliest convenience.
  `;

  // Email configuration (set up but not sending)
  const emailConfig = {
    to: 'mithramani003@gmail.com',
    subject,
    html: htmlContent,
    text: textContent,
  };

  // TODO: Implement actual email sending with nodemailer or similar service
  // For now, just log the email content
  console.log('📧 Email would be sent with configuration:', emailConfig);

  // Simulate successful email sending
  return {
    success: true,
    messageId: `simulated-${inquiryId}`,
    message: 'Email functionality set up but not sending (as requested)'
  };
}

// Function to send admin notification (can be expanded later)
export async function sendAdminNotification(inquiryData: ContactInquiryData) {
  console.log('📧 Admin notification for contact inquiry:', inquiryData);
  return sendContactInquiryEmail(inquiryData);
}
