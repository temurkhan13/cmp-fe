// ScreenContext.js
import React, { createContext, useState, useContext } from 'react';

const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('');
  const [sharedUsers, setSharedUsers] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const shareUser = (identifier) => {
    // Implement the logic to share the user
    // Update shared users state if needed
    setSharedUsers([...sharedUsers, { name: identifier, role: 'view' }]);
  };

  return (
    <ScreenContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        sharedUsers,
        setSharedUsers,
        popupVisible,
        setPopupVisible,
        shareUser,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => useContext(ScreenContext);
