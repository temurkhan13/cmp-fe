import '../landing-page.scss';

const Terms = () => {
  return (
    <div className="legal-page">
      <h1 className="legal-page__title">Terms & Conditions</h1>
      <p className="legal-page__date">Last updated: January 2025</p>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">1. Acceptance of Terms</h2>
        <p>By accessing or using the Change.ai platform ("Service"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Service.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">2. Description of Service</h2>
        <p>Change.ai is an AI-powered change management platform that provides:</p>
        <ul className="legal-page__list">
          <li>AI Assistant for change management guidance</li>
          <li>Structured assessments across change management phases</li>
          <li>Digital Playbook creation and management</li>
          <li>Sitemap planning and visualisation</li>
          <li>Document generation and export capabilities</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">3. User Accounts</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="legal-page__list">
          <li>Use the Service for any unlawful purpose</li>
          <li>Attempt to gain unauthorised access to any part of the Service</li>
          <li>Upload malicious content or attempt to compromise system security</li>
          <li>Reproduce, distribute, or create derivative works from the Service</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">5. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are owned by Change.ai and are protected by international copyright, trademark, and other intellectual property laws. Content you create using the platform remains your property.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">6. AI-Generated Content</h2>
        <p>The AI-generated content provided through our platform is intended as guidance and should be reviewed before use. We do not guarantee the accuracy, completeness, or suitability of AI-generated content for any particular purpose.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">7. Subscription & Billing</h2>
        <p>Certain features of the Service may require a paid subscription. Billing terms, pricing, and cancellation policies are detailed on our pricing page. We reserve the right to modify pricing with reasonable notice.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">8. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, Change.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">9. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the platform. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__heading">10. Contact</h2>
        <p>For questions about these Terms, please contact us at:</p>
        <p className="legal-page__contact">Email: support@changeai.com</p>
      </section>
    </div>
  );
};

export default Terms;
