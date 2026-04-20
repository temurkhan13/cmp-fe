import '../landing-page.scss';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <h1 className="legal-page__title">Privacy Policy</h1>
      <p className="legal-page__date">Last updated: January 2025</p>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">1. Introduction</h2>
        <p>Welcome to Change.ai ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our change management platform.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">2. Information We Collect</h2>
        <p>We collect information that you provide directly to us, including:</p>
        <ul className="legal-page__list">
          <li>Account information (name, email address, password)</li>
          <li>Workspace and project data</li>
          <li>Assessment responses and generated reports</li>
          <li>Documents you upload for AI processing</li>
          <li>Communication preferences</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="legal-page__list">
          <li>Provide, maintain, and improve our services</li>
          <li>Process your assessments and generate reports</li>
          <li>Power AI-assisted features including the AI Assistant and Digital Playbook</li>
          <li>Send you technical notices and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">4. Data Security</h2>
        <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">5. Data Retention</h2>
        <p>We retain your personal data for as long as your account is active or as needed to provide you with our services. You may request deletion of your data at any time by contacting us.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">6. Your Rights</h2>
        <p>Under applicable data protection legislation, you have the right to:</p>
        <ul className="legal-page__list">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request data portability</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">7. Cookies</h2>
        <p>We use essential cookies to ensure the proper functioning of our platform. These cookies are necessary for authentication and session management.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">8. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at:</p>
        <p className="legal-page__contact">Email: support@changeai.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
