import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlineError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const PlanAndBilling = () => {
  const navigate = useNavigate();
  const planInfo = {
    name: 'Starter',
    status: 'Active',
    price: '29.99',
    description: [
      '3 users, 2 workspaces',
      'View user history up to 7 days',
      'Restore deleted data up to 7 days',
      'Email support',
      '3 brand styles per project',
      '2 ChangeAI Playbook projects, max 30,000 AI words',
    ],
  };

  const billingHistory = [
    {
      planName: 'Starter',
      status: 'Expired',
      price: '$29.99',
      purchased: '12/24',
      expiry: '01/25',
    },
    {
      planName: 'Pro',
      status: 'Expired',
      price: '$79.99',
      purchased: '11/24',
      expiry: '12/24',
    },
    {
      planName: 'Free',
      status: 'Expired',
      price: '$0.00',
      purchased: '10/24',
      expiry: '11/24',
    },
    {
      planName: 'Pro',
      status: 'Expired',
      price: '$79.99',
      purchased: '09/24',
      expiry: '10/24',
    },
    {
      planName: 'Starter',
      status: 'Expired',
      price: '$29.99',
      purchased: '08/24',
      expiry: '09/24',
    },
    {
      planName: 'Pro',
      status: 'Expired',
      price: '$79.99',
      purchased: '07/24',
      expiry: '08/24',
    },
    {
      planName: 'Free',
      status: 'Expired',
      price: '$0.00',
      purchased: '06/24',
      expiry: '07/24',
    },
    {
      planName: 'Pro',
      status: 'Expired',
      price: '$79.99',
      purchased: '05/24',
      expiry: '06/24',
    },
    {
      planName: 'Starter',
      status: 'Expired',
      price: '$29.99',
      purchased: '04/24',
      expiry: '05/24',
    },
    {
      planName: 'Free',
      status: 'Expired',
      price: '$0.00',
      purchased: '03/24',
      expiry: '04/24',
    },
  ];

  return (
    <div className="billing-page">
      <h2>Plan & Billing</h2>
      <div className="tabs">
        <div className="tab active">General</div>
      </div>

      <div className="plan-information">
        <div className="info">
          <h3>Information:</h3>
          <p>
            <strong>Plan Name:</strong> {planInfo.name}
          </p>
          <p>
            <strong>Status:</strong>
            <span className={`status ${planInfo.status.toLowerCase()}`}>
              {planInfo.status}
            </span>
          </p>
          <p>
            <strong>Price:</strong>
            <span className="price">${planInfo.price}</span>
          </p>
          <button
            className="renew-btn"
            onClick={() => {
              navigate('/choose-plain');
            }}
          >
            Renew
          </button>
        </div>

        <div className="description">
          <h3>Plan Description:</h3>
          <ul>
            {planInfo.description.map((item, index) => (
              <li key={index} className="feature-list">
                <AiOutlineCheckCircle /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="billing-history">
        <h3>Billing History:</h3>
        <table>
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>Purchased</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((record, index) => (
              <tr key={index}>
                <td className="plan-name">{record.planName}</td>
                <td>
                  <span className={`status ${record.status.toLowerCase()}`}>
                    {record.status === 'Expired' ? (
                      <MdOutlineError size={18} />
                    ) : (
                      <AiOutlineCheckCircle />
                    )}
                    {record.status}
                  </span>
                </td>
                <td className="price">{record.price}</td>
                <td>{record.purchased}</td>
                <td>{record.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .billing-page {
          padding: 1.25rem;
          font-size:1.4rem;
          background-color: #f9f9f9;
        }
        h2 {
          margin-bottom: 1.25rem;
        }
        .tabs {
          display: flex;
          margin-bottom: 1.25rem;
        }
        .tab {
          padding: 0.625rem 1.25rem; 
          cursor: pointer;
          border-bottom: 0.125rem solid transparent; 
        }
        .tab.active {
          border-color: #3f51b5;
        }
          .plan-name{
          font-weight:bold;
          }
        .plan-information {
          display: flex;
          background-color: #fff;
          padding: 1.5rem;
          border-radius: 1rem; 
          margin-bottom: 1.5rem;
          box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
        }
        .info {
          flex: 1;
          margin-left: 2rem;
          display: flex;
          gap: 1.5rem;
          flex-direction: column;
        }
        .description {
          flex: 1;
          list-style: none;
        }
          tr td {
          align-items: center;
          }
          .feature-list{
          list-style:none;
          font-size:1.4rem;
          display:flex;
          align-items: center;
          gap:1rem;
          }
        .status.active {
          background-color: rgba(4, 212, 0, 0.1);
          color:rgba(4, 212, 0, 1);
          border-radius:2rem;
          font-size:1.4rem;
          padding: 0.2rem 2rem;

        }
        .status.expired {
          background-color: rgba(203, 23, 12, 0.1);
          color:rgba(203, 23, 12, 1);
          border-radius:1.5rem;
          display:flex;
          align-items: center;
          justify-content: center;
          padding:0.5rem 0rem;

          gap:0.5rem;
        }
        .price {
          color: #3f51b5;
          font-weight: bold;
        }
        .renew-btn {
          padding: 0.625rem 1.25rem; 
          background-color:rgba(195, 225, 29, 1);
          color:rgba(11, 20, 68, 1);
          font-size: 1.5rem;
          font-weight: 500;
          border: none;
          width:15rem;
          border-radius: 1rem; 
          cursor: pointer;
          margin-top: 0.625rem; 
        }
        .billing-history {
          background-color: #fff;
          padding: 1.25rem;
          border-radius: 0.5rem; 
          box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 0.625rem; 
        }
        th,
        td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 0.0625rem solid #ddd;
        }
        th {
          background-color: #f1f1f1;
        }
        .price {
          color: #3f51b5;
        }
      `}</style>
    </div>
  );
};

export default PlanAndBilling;
