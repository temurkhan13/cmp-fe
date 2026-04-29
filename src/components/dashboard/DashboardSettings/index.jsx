import PersonalInfo from './PersonalInfo';
// import PaymentMethod from './PaymentMethod';

const SettingsTabs = () => {
  return (
    <div className='settings-page'>
      {/* When reviving these tabs, use className="settings-tabs" on the wrapper,
          and the active modifier "settings-tabs--active" instead of "active".
          Parked styles live in dashboard-inline.scss. */}
      {/* <div className="settings-tabs">
        <button
          className={activeTab === 'personal-info' ? 'settings-tabs--active' : ''}
          onClick={() => setActiveTab('personal-info')}
        >
          Personal Information
        </button> */}
      {/* <button
          className={activeTab === 'payment-method' ? 'settings-tabs--active' : ''}
          onClick={() => setActiveTab('payment-method')}
        >
          Payment Method
        </button> */}
      {/* <button
          className={activeTab === 'change-password' ? 'settings-tabs--active' : ''}
          onClick={() => setActiveTab('change-password')}
        >
          Change Password
        </button> */}
      {/* <button
          className={activeTab === 'notifications' ? 'settings-tabs--active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button> */}
      {/* </div>
      <div className="tab-content">{renderContent()}</div> */}
      <div><PersonalInfo /></div>
    </div>
  );
};

export default SettingsTabs;
