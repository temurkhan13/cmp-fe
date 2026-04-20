import '../dashboard-inline.scss';

const Account = () => {
  return (
    <div className="payment-section">
      <div className="table">
        <section>
          <h1>Account information</h1>
          <h3 className="account-link-heading">
            Change payment details
          </h3>
        </section>
        <div className="account-info-grid">
          <div>
            <div className="account-info-row">
              <h3>Account title</h3>
              <h3>Account type</h3>
              <h3>Account number</h3>
            </div>
            <div className="account-info-row">
              <h2>Micheal Jack</h2>
              <h2>Visa</h2>
              <h2>2321 **** **** ****</h2>
            </div>
          </div>
          <div>
            <div className="account-info-row">
              <h3>CVC</h3>
              <h3>Bank Address</h3>
            </div>
            <div className="account-info-row">
              <h2>***</h2>
              <h2>4517 Washington Ave. Manchester, Kentucky 39495</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="account-plan-card">
        <h1 className="account-plan-title">Selected Plan</h1>
        <h3 className="account-plan-subtitle">
          Free
        </h3>
        <button className="account-upgrade-btn">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default Account;
