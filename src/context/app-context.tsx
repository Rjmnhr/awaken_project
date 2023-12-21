import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProps {
  isSignIn: boolean;
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  isEmailVerified: boolean;
  setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<AppContextProps | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value: AppContextProps = {
    isSignIn,
    setIsSignIn,
    isEmailVerified,
    setIsEmailVerified,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = (): AppContextProps => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useApplicationContext must be used within an AppContextProvider");
  }
  return context;
};
