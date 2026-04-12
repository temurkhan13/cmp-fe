import { FaArrowRight } from 'react-icons/fa';

const Accordian = (props) => {
  const { title, desc, isOpen, onClick } = props;

  return (
    <div
      style={{
        borderRadius: '8px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={onClick}
        style={{
          padding: '15px 25px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          backgroundColor: '#fff',
          borderBottom: '1px solid #ddd',
          position: 'relative',
          fontSize: '1.5rem',
        }}
      >
        {title}
        <FaArrowRight
          style={{
            fontSize: '18px',
            position: 'absolute',
            right: '15px',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>
      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
          padding: isOpen ? '15px 25px' : '0 25px',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease',
          fontSize: '1.4rem',
          lineHeight: '1.6',
        }}
      >
        {desc}
      </div>
    </div>
  );
};

export default Accordian;
