import { useState, useEffect, useRef } from 'react';
import Components from '@components';
import useChatHistory from '@hooks/useChatHistory';
import NewChatModal from '../../customModal/NewChatModal';

import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiArrowLeftDoubleLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';

const NewChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showMenu, setShowMenu] = useState({ index: null, msgIndex: null }); // Track which menu is open
  const { historyChat, error } = useChatHistory();
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index, msgIndex) => {
    setShowMenu({ index, msgIndex });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setShowMenu({ index: null, msgIndex: null });
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchInitialChatHistory = async () => {
      setLoading(true);
      try {
        const initialHistory = await historyChat();
        setChatHistory(Array.isArray(initialHistory) ? initialHistory : []);
      } catch (error) {
        console.error(
          'Error occurred while fetching initial chat history:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInitialChatHistory();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const loadMoreMock = async () => {
    const mockData = [
      {
        date: '2024-08-06',
        message: [
          { text: 'This is a mock chat message 1.' },
          { text: 'This is a mock chat message 2.' },
        ],
      },
      {
        date: '2024-09-05',
        message: [
          { text: 'Another mock chat message 1.' },
          { text: 'Another mock chat message 2.' },
          { text: 'Another mock chat message 3.' },
          { text: 'Another mock chat message 4.' },
        ],
      },
    ];
    return mockData;
  };

  useEffect(() => {
    if (Array.isArray(chatHistory) && chatHistory.length > 0) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleScroll = async () => {
    const chatContainer = chatContainerRef.current;
    if (
      chatContainer.scrollHeight - chatContainer.scrollTop <=
        chatContainer.clientHeight * 1.1 &&
      !loading
    ) {
      setLoading(true);
      try {
        const newHistoryItem = await loadMoreMock();
        setChatHistory((prevHistory) => [...prevHistory, ...newHistoryItem]);
      } catch (error) {
        console.error('Error occurred while loading more chat history:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.addEventListener('scroll', handleScroll);
    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div
      className="newChat"
      ref={chatContainerRef}
      style={{ overflowY: 'auto', height: '100vh' }}
    >
      <div>
        <div onClick={handleRefresh} style={{ cursor: 'pointer' }}>
          <HiOutlinePlusSm />
          <Components.Feature.Text className="secondry">
            New Chat
          </Components.Feature.Text>
        </div>
        <RiArrowLeftDoubleLine />
      </div>
      {Array.isArray(messages) &&
        messages.map((el, index) => (
          <section key={index}>
            <Components.Feature.Text className="middium--light">
              {el.date}
            </Components.Feature.Text>
            <div>
              {Array.isArray(el.message) &&
                el.message.map((msg, msgIndex) => (
                  <div
                    key={msgIndex}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Components.Feature.Text className="secondry">
                      {msg.text}
                    </Components.Feature.Text>
                    <BsThreeDots
                      onClick={() => openModal(index, msgIndex)}
                      style={{ cursor: 'pointer' }}
                    />
                    {showMenu.index === index &&
                      showMenu.msgIndex === msgIndex && (
                        <NewChatModal
                          isOpen={isModalOpen}
                          closeModal={closeModal}
                        />
                      )}
                  </div>
                ))}
            </div>
          </section>
        ))}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default NewChat;
