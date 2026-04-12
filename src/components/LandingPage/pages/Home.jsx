import { HeroSection, Main, Features, Team, FAQs, Pricing } from '../components/ui';

const Home = () => {
  return (
    <div
      style={{
        maxWidth: '1580px',
        margin: '0 auto',
        background: 'radial-gradient(circle at 50% 0%, rgba(195,225,29,0.08) 0%, transparent 50%), #f9f9f9',
        overflow: 'visible',
      }}
    >
      <HeroSection />
      <div data-aos="fade-up">
        <Main />
      </div>
      <div data-aos="fade-up">
        <Features />
      </div>
      <div data-aos="fade-up">
        <Pricing />
      </div>
      <div data-aos="fade-up">
        <Team />
      </div>
      <div data-aos="fade-up">
        <FAQs />
      </div>
    </div>
  );
};

export default Home;
