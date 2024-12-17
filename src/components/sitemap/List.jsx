import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import Loading from './Loading';
import NoData from './NoData';
import config from '../../config/config.js';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import { timeAgo } from './helper.js';
import { FaFolderTree } from 'react-icons/fa6';

function List() {
  let navigate = useNavigate();
  const [sitemaps, setSitemaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedWorkspace = useSelector(selectWorkspace);
  console.log(selectedWorkspace, '177777');

  async function getData(
    workSpaceId,
    url = `${config.apiURL}/workspace/user/sitemaps`
  ) {
    const authToken = localStorage.getItem('token');
    const response = await fetch(`${url}?workspaceId=${workSpaceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }

  const recentModifiedSiteMap = useMemo(() => {
    return sitemaps?.length > 0
      ? sitemaps?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      : [];
  }, [sitemaps]);
  const onInit = async () => {
    setLoading(true);
    let res = await getData(selectedWorkspace?.id);

    if (res?.length > 0) {
      setSitemaps(res);
    }

    setLoading(false);
  };

  useEffect(() => {
    onInit();
  }, []);
  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="selected-workspace-name">
        <p>
          Workspace <span>{selectedWorkspace?.workspaceName}</span>
        </p>
      </div>
      <>
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <section className="generate" style={{ marginTop: '2rem' }}>
            <div className="container">
              <div
                // className="left-buttons"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p className="assistant-heading">
                  <FaFolderTree />
                  Sitemaps
                </p>
                <div className="center-buttons">
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                    className="assiss-btn"
                    onClick={() => {
                      navigate('/sitemap/new');
                    }}
                  >
                    Create Sitemap
                    <BiPlus />
                  </button>
                </div>
              </div>
            </div>
          </section>
          {loading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                width: '100%',
                margin: '16px 0',
              }}
            >
              <Loading />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                width: '100%',
                margin: '16px 3rem',
              }}
            >
              {recentModifiedSiteMap
                ?.slice(0, 4)
                ?.map(({ _id, name, updatedAt }) => {
                  return (
                    <div
                      key={`${_id}-recent`}
                      style={{
                        width: '100%',
                        maxWidth: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        padding: '2rem',
                        borderRadius: '1rem',
                        margin: '0 1rem 1rem 0',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        navigate(`/sitemap/${_id}`);
                      }}
                    >
                      {/* <img src={SitemapImg} height="120px" width="268px" /> */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <FaFolderTree size={18} />
                        <span
                          style={{
                            fontSize: '1.5rem',
                            fontWeight: '500',
                          }}
                        >
                          {name}
                        </span>
                      </div>

                      {updatedAt ? (
                        <span
                          style={{
                            fontSize: '1.2rem',
                            color: 'rgba(10, 10, 10, 0.46)',
                          }}
                        >
                          Modifies {timeAgo(updatedAt)}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
            </div>
          )}

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
          ></div>
        </div>
      </>

      <style>
        {`
        .selected-workspace-name{
      position:absolute;
      top:2rem;
      left:4rem;
    p{
    font-size:1.5rem;
    font-weight:600;
    span{
    padding:1rem;
    background-color:#f5f5f5;
    border-radius:1rem;
    border:1px solid gray;
    }
    }
      }`}
      </style>
    </div>
  );
}

export default List;
