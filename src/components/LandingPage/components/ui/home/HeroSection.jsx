import { DottedBg, heroBg, heroBg2, MainBg } from '../../../assets';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div class="container">
      <img class="main-bg" src={MainBg} alt="" />
      <img class="dotted-bg" src={DottedBg} alt="" />
      <div class="content">
        <h1 class="hero-text">
          Transforming the <br /> future of <br /> Documentation
        </h1>
        <button class="demo-button" onClick={() => {
          navigate('/sign-up');
        }}>
          Get Free Demo <FaArrowRight className="rotate-icon" />
        </button>
      </div>
      <style>
        {`
      .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: auto auto;
    }

      .main-bg {
          position: absolute;
          z-index: 10;
          top: 0px;
          width: 95%;
      }

      .dotted-bg {
          position: absolute;
          width: 100%;
          z-index: 0;
      }

      .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 30px;
          z-index: 10;
      }

      .hero-text {
          background-image: url(${heroBg}); 
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          padding: 5px; 
          user-select: none;
          text-align: center;
          font-weight: 900;
          font-size: 30px; 
          line-height: 40px; 
      }

      /* Responsive adjustments */

        @media (min-width: 340px) {
          .hero-text {
              font-size: 30px;
              line-height: 40px;
          }
          .content{
          margin-top: 0;
          gap: 0;
          }
      }


      @media (min-width: 640px) {
          .hero-text {
              font-size: 30px;
              line-height: 40px;
          }
          .content{
          margin-top: 0;
          }
      }

      @media (min-width: 768px) {
          .hero-text {
              font-size: 40px;
              line-height: 50px;
          }
          .content{
          margin-top: 50px;
          }
      }

      @media (min-width: 1280px) {
          .hero-text {
              font-size: 90px;
              line-height: 90px;
          }
          .content{
          margin-top: 100px;
          gap:50px; 
          }
      }

      .demo-button {
          display: flex;
          align-items: center;
          gap: 2px;
          background-color: #C3E11D;
          padding: 10px 30px;
          font-weight: 600;
          padding: 10px 30px;
          font-size: 1.4rem !important; 
          border-radius: 9999px;
          z-index: 10;
          border:none;
      }

      /* Responsive adjustments */

      @media (min-width: 360px) {
                .demo-button {
                font-size: 0.3rem;
                padding: 2px 15px;
                }

            }

      @media (min-width: 768px) {
          .demo-button {
              font-size: 1rem;
          padding: 5px 20px;
          }

      }
      @media (min-width: 1024px) {
          .demo-button {
              font-size: 1rem;
              padding: 10px 30px;
          }

      }

      .rotate-icon {
          transform: rotate(-50deg);
          font-size: 0.75rem; /* Adjust for responsive font-size */
      }

      @media (min-width: 768px) {
          .rotate-icon {
              font-size: 1rem;
          }
      }


      `}
      </style>
    </div>
  );
};

export default HeroSection;
