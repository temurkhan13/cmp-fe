import { HeroSection, Main, Features, Team, FAQs, Pricing } from '../components/ui';
import '../landing-page.scss';

const Home = () => {
  return (
    <div className="landing-home">
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
