import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './Home';
import User from './User';
import Settings from './Settings';
import Help from './Help';
import '../../style/chat/ChatMenu.scss';
import { MdOutlineMoreTime } from 'react-icons/md';
import { MdPermMedia } from 'react-icons/md';
import { BiSolidCommentMinus } from 'react-icons/bi';
import { BiSolidSave } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

const ChatMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const renderActiveMenu = () => {
    switch (activeMenu) {
      case 'home':
        return <Home />;
      case 'user':
        return <User />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <Help />;
      default:
        return null;
    }
  };

  return (
    <div className="chat-menu">
      <div className="menu-icons">
        <MdOutlineMoreTime onClick={() => setActiveMenu('home')} />
        <MdPermMedia onClick={() => setActiveMenu('user')} />
        <BiSolidCommentMinus onClick={() => setActiveMenu('settings')} />
        <BiSolidSave onClick={() => setActiveMenu('help')} />
      </div>
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key={activeMenu}
            initial={{ height: 0 }}
            animate={{ height: '100%', width: '350px' }}
            exit={{ height: 0, width: 0 }}
            transition={{ duration: 0.5 }}
            className="menu-content"
          >
            <div style={{ backgroundColor: 'white' }}>
              <IoMdClose
                onClick={() => setActiveMenu(null)}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 3,
                  fontSize: '20px',
                  backgroundColor: 'lightgray',
                  borderRadius: '10px',
                  color: 'gray',
                }}
              />
              <div className="content">{renderActiveMenu()}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatMenu;
