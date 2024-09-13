import { useState } from 'react';
import PersonalInfo from './PersonalInfo';
// import PaymentMethod from './PaymentMethod';
import Notifications from './Notifications';

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState('personal-info');

  const renderContent = () => {
    switch (activeTab) {
      case 'personal-info':
        return <PersonalInfo />;
      // case 'payment-method':
      //   return <PaymentMethod />;
      // case 'change-password':
      //   return <ChangePassword />;
      case 'notifications':
        return <Notifications />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div>
      <div className="setting-heading">Settings</div>
      <div className="tabs">
        <button
          className={activeTab === 'personal-info' ? 'active' : ''}
          onClick={() => setActiveTab('personal-info')}
        >
          Personal Information
        </button>
        {/* <button
          className={activeTab === 'payment-method' ? 'active' : ''}
          onClick={() => setActiveTab('payment-method')}
        >
          Payment Method
        </button> */}
        {/* <button
          className={activeTab === 'change-password' ? 'active' : ''}
          onClick={() => setActiveTab('change-password')}
        >
          Change Password
        </button> */}
        <button
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
      <style>{`
      .setting-heading{
      font-size: 2.25rem;
      font-weight: bold;
      margin:2rem 2rem;
      }
        .tabs {
          display: flex;
          justify-content: space-around;
          border-bottom: 0.0625rem solid #0B1444;
          margin-bottom: 1rem;
        }

        .tabs button {
          padding: 0.625rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: 400;
          color: #555;
          transition: color 0.3s ease;
        }

        .tabs button:hover {
          color: #0B1444;
        }

        .tabs button.active {
          color: #000;
          border-bottom: 0.125rem solid #0B1444;
        }

        .tab-content {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default SettingsTabs;
