import { useState, useEffect , useRef} from "react";
import Components from "@components";
import { HiOutlinePlusSm } from "react-icons/hi";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import useChatHistory from "@hooks/useChatHistory";

const NewChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const { historyChat, error } = useChatHistory();
  const chatContainerRef = useRef(null);

  // useEffect with empty dependency array to run only once after the initial render
  useEffect(() => {
    const fetchInitialChatHistory = async () => {
      setLoading(true);
      try {
        const initialHistory = await historyChat();
        setChatHistory(Array.isArray(initialHistory) ? initialHistory : []);
      } catch (error) {
        console.error("Error occurred while fetching initial chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialChatHistory();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const addNewChatHistoryItem = async () => {
    setLoading(true);
    try {
      const newHistoryItem = await historyChat(); // Fetch new chat history item
      setChatHistory(prevHistory => [
        ...prevHistory,
        ...(Array.isArray(newHistoryItem) ? newHistoryItem : [])
      ]);
    } catch (error) {
      console.error("Error occurred while adding new chat history item:", error);
    } finally {
      setLoading(false);
    }
  };


  // Mock function to load more chat history
  const loadMoreMock = async () => {
    const mockData = [
      {
        date: "2024-08-06",
        message: [
          { text: "This is a mock chat message 1." },
          { text: "This is a mock chat message 2." }
        ]
      },
      {
        date: "2024-09-05",
        message: [
          { text: "Another mock chat message 1." },
          { text: "Another mock chat message 2." },
          { text: "Another mock chat message 3." },
          { text: "Another mock chat message 4." }
        ]
      }
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


  
  // Handle scroll event to load more data
  const handleScroll = async () => {
    // if (chatContainerRef.current.scrollTop === 0 && !loading) 
    const chatContainer = chatContainerRef.current;
    console.log("s1: "+(chatContainer.scrollHeight - chatContainer.scrollTop) +" S2:" + chatContainer.clientHeight * 1.2)
    if (
      chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight * 1.1 && 
      !loading
    ) 
    {
      setLoading(true);
      try {
        const newHistoryItem = await loadMoreMock(); // Call loadMoreMock for testing
        setChatHistory(prevHistory => [
          ...prevHistory,
          ...newHistoryItem         
        ]);
      } catch (error) {
        console.error("Error occurred while loading more chat history:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Attach scroll event listener
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
          <Components.Feature.Text className="secondry">
            New Chat
          </Components.Feature.Text>
        </div>
        <RiArrowLeftDoubleLine />
      </div>
      {Array.isArray(messages) && messages.map((el, index) => (
        <section key={index}>
          <Components.Feature.Text className="middium--light">
            {el.date}
          </Components.Feature.Text>
          <div>
            {Array.isArray(el.message) && el.message.map((msg, idx) => (
              <Components.Feature.Text className="secondry" key={idx}>
                {msg.text}
              </Components.Feature.Text>
            ))}
          </div>
        </section>
      ))}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

{/* {loading && <div>Loading...</div>}
      <button onClick={addNewChatHistoryItem}>Load More</button>
      {error && <div>Error: {error}</div>} */}
    </div>
  );
};

export default NewChat;
