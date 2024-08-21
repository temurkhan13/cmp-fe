import React from 'react';
import { BiFolder } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';

function NoData() {
  let navigate = useNavigate();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: '28px',
            fontWeight: '600',
            color: 'rgba(10, 10, 10, 1)',
          }}
        >
          Digital Playbook
        </span>
        <div style={{}}>
          <button
            style={{
              width: '100%',
              background: '#C3E11B',
              border: 'none',
              padding: '5px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '5px',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => {
              navigate('/sitemap/new');
            }}
          >
            <BiPlus></BiPlus>
            Create Template
          </button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <BiFolder size={100} />
        <span
          style={{
            fontSize: '18px',
            fontweight: '500',
            color: 'rgba(10, 10, 10, 1)',
          }}
        >
          No recent activity here
        </span>
        <span
          style={{
            fontSize: '16px',
            fontweight: '400',
            color: 'rgba(10, 10, 10, 0.46)',
            textAlign: 'center',
          }}
        >
          Organize your folders and files, and see <br></br>them show up here.
        </span>
      </div>
    </div>
  );
}

export default NoData;
