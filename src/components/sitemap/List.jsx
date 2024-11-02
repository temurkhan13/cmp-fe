import { useEffect, useState } from 'react';
import { SitemapImg } from '../../assets/dashboard';
import { useNavigate } from 'react-router-dom';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';
import Loading from './Loading';
import NoData from './NoData';
import config from '../../config/config.js';
import { useSelector } from 'react-redux';

function List() {
  let navigate = useNavigate();
  const [sitemaps, setSitemaps] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const dataaaaaaaaaaaa = useSelector((state) => state.workspaces);
  console.log(dataaaaaaaaaaaa, '16666666666666')

  async function getData(url = `${config.apiURL}/dpb/sitemap`) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const onInit = async () => {
    setLoading(true);
    let res = await getData();

    if (res.results) {
      setSitemaps(res.results);
      setLoading(false);
    }
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
                    margin: '16px 0',
                  }}
                >
                  {sitemaps.slice(-4).map(({ id }) => {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                          marginRight: '16px',
                          marginBottom: '16px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          navigate(`/sitemap/${id}`);
                        }}
                      >
                        <img
                          src={SitemapImg}
                          height="120px"
                          width="268px"
                        ></img>
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
              )}
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
              <div
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
                {loading ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
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
                      margin: '16px 0',
                    }}
                  >
                    {sitemaps.map(({ id,name }) => {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            marginRight: '16px',
                            marginBottom: '16px',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            navigate(`/sitemap/${id}`);
                          }}
                        >
                          <img
                            src={SitemapImg}
                            height="120px"
                            width="268px"
                          ></img>
                          <span
                            style={{
                              fontSize: '16px',
                              fontWeight: '500',
                            }}
                          >
                            {name}
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
