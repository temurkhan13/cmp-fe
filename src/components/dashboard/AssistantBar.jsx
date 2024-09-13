import PropTypes from 'prop-types';

const AssistantBar = () => {
  return (
    <>
      <main className="main">
        <p className="assistant-tagline">
          As a change management assistant, I offer expert guidance and support
          to streamline and optimize organizational transformations.
        </p>
      </main>
      <section className="generate">
        <div className="container">
          <p className="assistant-heading">AI Assistant</p>
        </div>
      </section>
      <style>{`
        .assistant-tagline {
          font-size: 2.5rem;
          font-weight: 600;
          text-align: center;
          transition: all 0.2s linear;
        }
        .main {
          background-color: rgba(184, 241, 86, 0.21);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30vh;
        }
        .generate {
          background-color: rgba(249, 249, 249, 1);
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 10vh;
        }
        .assistant-heading {
          font-size: 20px;
          font-weight: 600;
          color: black;
        }
      `}</style>
    </>
  );
};

AssistantBar.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default AssistantBar;
