const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div></div>
      <div></div>
      <div></div>

      <style>{`
        .loader-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          height: 100vh;
        }

        .loader-wrapper div {
          border-radius: 50%;
          width: 1rem;
          height: 1rem;
        }

        .loader-wrapper div:nth-child(1) {
          background-color: #dab637;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .loader-wrapper div:nth-child(2) {
          background-color: #86cac9;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 0.2s;
        }

        .loader-wrapper div:nth-child(3) {
          background-color: #40e0d0;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 0.4s;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
