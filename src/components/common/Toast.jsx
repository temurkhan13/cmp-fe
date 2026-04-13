import { Toaster } from 'react-hot-toast';

const Toast = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        borderRadius: '10px',
        padding: '12px 16px',
      },
      success: {
        style: {
          background: '#f0fff0',
          border: '1px solid #C3E11D',
          color: '#15803d',
        },
        iconTheme: { primary: '#C3E11D', secondary: '#fff' },
      },
      error: {
        style: {
          background: '#fff5f5',
          border: '1px solid #fcc',
          color: '#c00',
        },
      },
    }}
  />
);

export default Toast;
