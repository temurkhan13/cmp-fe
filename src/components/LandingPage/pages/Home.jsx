import { HeroSection, Main, Features, Team, FAQs } from '../components/ui';

const Home = () => {
  return (
    <div
      style={{
        maxWidth: '1580px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
      }}
    >
      <HeroSection />
      <Main />
      <Features />
      <Team />
      <FAQs />
    </div>
  );
};

export default Home;
