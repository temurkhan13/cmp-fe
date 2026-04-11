const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', fontSize: '1.4rem', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Last updated: January 2025</p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>1. Introduction</h2>
        <p>Welcome to Change.ai ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our change management platform.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>2. Information We Collect</h2>
        <p>We collect information that you provide directly to us, including:</p>
        <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Account information (name, email address, password)</li>
          <li>Workspace and project data</li>
          <li>Assessment responses and generated reports</li>
          <li>Documents you upload for AI processing</li>
          <li>Communication preferences</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Provide, maintain, and improve our services</li>
          <li>Process your assessments and generate reports</li>
          <li>Power AI-assisted features including the AI Assistant and Digital Playbook</li>
          <li>Send you technical notices and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>4. Data Security</h2>
        <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>5. Data Retention</h2>
        <p>We retain your personal data for as long as your account is active or as needed to provide you with our services. You may request deletion of your data at any time by contacting us.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>6. Your Rights</h2>
        <p>Under applicable data protection legislation, you have the right to:</p>
        <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request data portability</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>7. Cookies</h2>
        <p>We use essential cookies to ensure the proper functioning of our platform. These cookies are necessary for authentication and session management.</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>8. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at:</p>
        <p style={{ marginTop: '0.5rem' }}>Email: support@changeai.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
