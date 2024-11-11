import { useEffect, useMemo, useState } from 'react';
import { SitemapImg } from '../../assets/dashboard';
import { useNavigate } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import Loading from './Loading';
import NoData from './NoData';
import config from '../../config/config.js';
import { useSelector } from 'react-redux';
import { selectWorkspace } from '../../redux/slices/workspacesSlice.js';
import { timeAgo } from './helper.js';
import { BsFilePlayFill } from 'react-icons/bs';
import { FaFolderTree } from 'react-icons/fa6';
import NoDataAvailable from '../common/NoDataAvailable.jsx';

function List() {
  let navigate = useNavigate();
  const [sitemaps, setSitemaps] = useState([]);
  const [pagination, setPagination] = useState({});
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
      {!loading ? (
        <>
          {sitemaps.length ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* <section className="generate" style={{ marginTop: '2rem' }}>
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
                        Create Template
                        <BiPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </section> */}

              {/* <div>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: 'rgba(10, 10, 10, 0.68)',
                  }}
                >
                  Recent files
                </span>
              </div> */}

              {/* <div
                style={{
                  margin: '16px 0',
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <div style={{}}>
                  <a
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
                      color: 'black',
                      textDecoration: 'none',
                    }}
                    href="http://139.59.4.99:3500/"
                  >
                    <BiPlus></BiPlus>
                    Create Wireframe
                  </a>
                </div>
              </div> */}
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
                      <BsFilePlayFill />
                      Digital Playbook
                    </p>
                    ``
                    <a
                      style={{
                        padding: '0.9rem 1rem',
                        borderRadius: '1rem',
                        background: '#C3E11B',
                        fontWeight: '500',
                        fontSize: '1.5rem',
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                        color: 'black',
                        textDecoration: 'none',
                      }}
                      href="http://139.59.4.99:3500/"
                      target="_blank"
                    >
                      Create Wireframe
                      <BiPlus />
                    </a>
                  </div>
                </div>
              </section>

              {/* <div
                style={{
                  margin: '16px 0',
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
              </div> */}

              {/* <div>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: 'rgba(10, 10, 10, 0.68)',
                  }}
                >
                  Folders
                </span>
              </div> */}

              {/* <div>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: 'rgba(10, 10, 10, 0.68)',
                  }}
                >
                  Files
                </span>
              </div> */}

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
                {loading ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      width: '100%',
                      margin: '1rem 0',
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
                      margin: '1rem 3rem',
                    }}
                  >
                    {/* {sitemaps.map(({ _id, name, updatedAt }) => {
                      return (
                        <div
                          key={`${_id}-files`}
                          style={{
                            width: '100%',
                            maxWidth: '400px',
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
                    {/* <span
                            style={{
                              fontSize: '16px',
                              fontWeight: '500',
                            }}
                          >
                            {name}
                          </span>
                          {updatedAt ? (
                            <span
                              style={{
                                fontSize: '14px',
                                color: 'rgba(10, 10, 10, 0.46)',
                              }}
                            >
                              Modifies {timeAgo(updatedAt)}
                            </span>
                          ) : null}
                        </div>
                      );
                    })}  */}
                    <NoDataAvailable message="No Digital play book available" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <NoData />
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default List;
