import { useState, useContext, createContext } from "react";

const LoggedInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const LoggedInWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export const useIsLoggedIn = () => useContext(LoggedInContext);
