import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Components from '@components';
import useChatHistory from '@hooks/useChatHistory';
import NewChatModal from '../../customModal/NewChatModal';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiArrowLeftDoubleLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import { fetchSharedUsers, setCurrentChat } from '@store/chatSlice';

const NewChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showMenu, setShowMenu] = useState({ index: null, msgIndex: null });
  const { historyChat, error } = useChatHistory();
  const chatContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const sharedUsers = useSelector((state) => state.chat.sharedUsers);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

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
        console.error('Error occurred while fetching initial chat history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialChatHistory();
  }, []);

  useEffect(() => {
    if (Array.isArray(chatHistory) && chatHistory.length > 0) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

  useEffect(() => {
    console.log('Current chat ID:', currentChatId);
    if (currentChatId) {
      dispatch(fetchSharedUsers(currentChatId));
    }
  }, [currentChatId, dispatch]);

  const handleChatSelect = (chatId) => {
    console.log(chatId);
    dispatch(setCurrentChat({ chatId }));
  };



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
        const newHistoryItem = await historyChat();
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
    <div className="newChat" ref={chatContainerRef} style={{ overflowY: 'auto', height: '100vh' }}>
      <div>
        <div onClick={handleRefresh} style={{ cursor: 'pointer' }}>
          <HiOutlinePlusSm />
          <Components.Feature.Text className="secondry">New Chat</Components.Feature.Text>
        </div>
        <RiArrowLeftDoubleLine />
      </div>
      {Array.isArray(messages) &&
        messages.map((el, index) => (
          <section key={index} onClick={() => handleChatSelect(el.chatId)}>
            <Components.Feature.Text className="middium--light">{el.date}</Components.Feature.Text>
            <div>
              {Array.isArray(el.message) &&
                el.message.map((msg, msgIndex) => (
                  <Components.Feature.Text className="light" key={msgIndex}>
                    {msg.text}
                  </Components.Feature.Text>
                ))}
            </div>
            <div onClick={() => openModal(index)}>
              <BsThreeDots />
            </div>
            {isModalOpen && showMenu.index === index && (
              <NewChatModal onClose={closeModal} />
            )}
          </section>
        ))}
    </div>
  );
};

export default NewChat;
