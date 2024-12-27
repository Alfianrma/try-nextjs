"use client";

import { createContext, ReactNode, useState, useContext } from "react";

interface UserDataType {
  name: string;
  age: string;
  phoneNumber: string;
  date: Date;
  image: string;
}

interface UserContextType {
  user: UserDataType;
  addUser: (newUser: UserDataType) => void;
  updateUser: (updatedUser: UserDataType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDataType>({
    name: "",
    age: "",
    phoneNumber: "",
    date: new Date(),
    image: "",
  });

  const addUser = (newUser: UserDataType) => {
    setUser(newUser);
  };

  const updateUser = (updatedUser: UserDataType) => {
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider value={{ user, addUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used inside UserProvider");
  }
  return context;
};
