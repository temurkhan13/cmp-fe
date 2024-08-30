import PropTypes from 'prop-types';
import { TiPlus } from 'react-icons/ti';
import { TfiMenuAlt } from 'react-icons/tfi';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import { CgMenuGridR } from 'react-icons/cg';
import StartIcon from '../../assets/dashboard/StarICon.png';

const AssistantBar = ({ setView }) => {
  return (
    <>
      <main className="main">
        <input type="text" placeholder="Enter a prompt to generate new file" />
        <button className="assbtn">
          <img src={StartIcon} alt="StartIcon" />
          Generate
        </button>
      </main>
      <section className="generate">
        <div className="container">
          <div className="navContainer">
            <button className="arrowBtn">
              <SlArrowLeft />
            </button>
            <button className="arrowBtn">
              <SlArrowRight />
            </button>
            <p className="assistantHeading">AI Assistant</p>
          </div>
          <div className="controlContainer">
            <div className="menuContainer">
              <CgMenuGridR
                className="menuIcon"
                onClick={() => setView('grid')}
              />
              <TfiMenuAlt
                className="menuIconAlt"
                onClick={() => setView('list')}
              />
            </div>
            <button className="assbtnAss">
              <TiPlus />
              New Assistant
            </button>
          </div>
        </div>
      </section>
      <style>{`
        .main {
          background-color: rgba(184, 241, 86, 0.21);
          grid-area: main;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 30vh;
        }
        .main input {
          font-family: 'Poppins';
          width: 400px;
          height: 44px;
          border-radius: 8px;
          outline: none;
          border: none;
          padding: 10px;
          border: 1px solid lightgray;
        }
        .assbtn {
          background-color: rgba(10, 10, 10, 1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          height: 44px;
          width: 130px;
          border-radius: 8px;
          margin-left: 10px;
          padding: 10px 20px;
        }
        .generate {
          background-color: rgba(249, 249, 249, 1);
        }
        .generate .container {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          padding: 1%;
          height: 10vh;
        }
        .arrowBtn {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          border: none;
          outline: none;
          background: transparent;
        }
        .assistantHeading {
          font-family: 'Poppins';
          font-size: 20px;
          font-weight: 600;
          line-height: 36px;
          letter-spacing: 0.12px;
          text-align: left;
          color: black;
        }
        .assbtnAss {
          background-color: rgba(10, 10, 10, 1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          gap: 0.5rem;
          border-radius: 8px;
          padding: 10px 20px;
        }
        .navContainer {
          display: flex;
          text-align: center;
          justify-content: center;
        }
        .controlContainer {
          display: flex;
          text-align: center;
          justify-content: space-between;
          align-items: center;
        }
        .menuContainer {
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
        .menuIcon {
          font-size: 26px;
          cursor: pointer;
        }
        .menuIconAlt {
          margin: 0 30px 0 5px;
          font-size: 22px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

// Define prop types for the component
AssistantBar.propTypes = {
  setView: PropTypes.func.isRequired, // setView should be a function and is required
};

export default AssistantBar;
