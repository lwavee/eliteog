import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.SMTP_PORT || '2525'),
    auth: {
      user: process.env.SMTP_USER || 'testuser',
      pass: process.env.SMTP_PASS || 'testpass',
    },
  });
};

export const sendEnquiryEmail = async (enquiry: any): Promise<void> => {
  const transporter = createTransporter();
  const mailOptions = {
    from: `"${enquiry.name} via EOG" <${process.env.FROM_EMAIL || 'noreply@eliteopsglobal.com'}>`,
    to: process.env.NOTIFICATION_EMAIL || 'admin@eliteopsglobal.com',
    subject: `New Enterprise Inquiry: ${enquiry.service || 'General inquiry'}`,
    html: `
      <h2>New Enterprise Enquiry Received</h2>
      <p><strong>Name:</strong> ${enquiry.name}</p>
      <p><strong>Company:</strong> ${enquiry.company || 'N/A'}</p>
      <p><strong>Email:</strong> ${enquiry.email}</p>
      <p><strong>Phone:</strong> ${enquiry.phone || 'N/A'}</p>
      <p><strong>Country:</strong> ${enquiry.country || 'N/A'}</p>
      <p><strong>Industry:</strong> ${enquiry.industry || 'N/A'}</p>
      <p><strong>Service Required:</strong> ${enquiry.service || 'General'}</p>
      <hr />
      <h3>Message:</h3>
      <p>${enquiry.message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Enquiry notification email sent for ${enquiry.email}`);
  } catch (error) {
    console.error('Error sending enquiry email:', error);
  }
};

export const sendJobApplicationEmail = async (application: any): Promise<void> => {
  const transporter = createTransporter();
  const mailOptions = {
    from: `"${application.name} via EOG Careers" <${process.env.FROM_EMAIL || 'noreply@eliteopsglobal.com'}>`,
    to: process.env.NOTIFICATION_EMAIL || 'admin@eliteopsglobal.com',
    subject: `New Job Application: ${application.position}`,
    html: `
      <h2>New Job Application Received</h2>
      <p><strong>Applicant Name:</strong> ${application.name}</p>
      <p><strong>Email:</strong> ${application.email}</p>
      <p><strong>Phone:</strong> ${application.phone}</p>
      <p><strong>Position:</strong> ${application.position}</p>
      <p><strong>Resume Path:</strong> ${application.resumeUrl}</p>
      <hr />
      <h3>Cover Message:</h3>
      <p>${application.message ? application.message.replace(/\n/g, '<br>') : 'No message provided.'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Job application email sent for ${application.email}`);
  } catch (error) {
    console.error('Error sending job application email:', error);
  }
};
