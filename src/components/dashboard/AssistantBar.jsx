import PropTypes from 'prop-types';

const AssistantBar = () => {
  return (
    <>
      <main className="assistant-bar-main">
        <p className="assistant-tagline">
          As a change management assistant, I offer expert guidance and support
          to streamline and optimize organizational transformations.
        </p>
      </main>
      <section className="assistant-bar-generate">
        <div className="assistant-bar-container">
          <p className="assistant-bar-heading">AI Assistant</p>
        </div>
      </section>
    </>
  );
};

AssistantBar.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default AssistantBar;
