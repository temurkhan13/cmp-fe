import React from 'react';
import { SitemapImg } from '../../assets/dashboard';

function List() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <span
          style={{
            fontSize: '16px',
            fontWeight: '500',
            color: 'rgba(10, 10, 10, 0.68)',
          }}
        >
          Recent files
        </span>
      </div>
      <div
        style={{
          margin: '16px 0',
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
      </div>

      <div>
        <span
          style={{
            fontSize: '16px',
            fontWeight: '500',
            color: 'rgba(10, 10, 10, 0.68)',
          }}
        >
          Folders
        </span>
      </div>

      <div>
        <span
          style={{
            fontSize: '16px',
            fontWeight: '500',
            color: 'rgba(10, 10, 10, 0.68)',
          }}
        >
          Files
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          width: '100%',
          margin: '16px 0',
        }}
      >
        {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map(() => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginRight: '16px',
                marginBottom: '16px',
              }}
            >
              <img src={SitemapImg} height="120px" width="268px"></img>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Filename
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: 'rgba(10, 10, 10, 0.46)',
                }}
              >
                Modifies 2 days ago
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
