import React from 'react';

const ComingSoon = () => {
  const styles = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: 'white', // Semi-transparent black overlay
      position: 'fixed',
      top: 0,
      left: 0,
    },
    modal: {
      backgroundColor: '#000', // Black modal background
      color: '#C3E11D', // Lime green text
      padding: '2rem 3rem',
      borderRadius: '10px',
      textAlign: 'center',
      width: 'auto',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)', // Floating effect
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    description: {
      fontSize: '1.2rem',
      color: '#C3E11D',
      maxWidth: '400px',
      margin: '0 auto',
      lineHeight: '1.5',
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h1 style={styles.heading}>Coming Soon</h1>
        <p style={styles.description}>
          We're currently working hard to create something amazing for you. Stay
          tuned for updates and get ready for the launch of something truly
          special!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
