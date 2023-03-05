import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigate from './src/misc/Navigator';
import React, { createContext, useState } from "react";
import { IUserListArray } from './src/logic/Interfaces/IUserListArray';

export const UserListsContext = createContext<{
  lists: IUserListArray,
  setLists: React.Dispatch<React.SetStateAction<IUserListArray>>
} | null>(null)

export default function App() {
  const [userLists, setUserLists] = useState<IUserListArray | null>(null)
  return (
    <UserListsContext.Provider value={{ lists: userLists, setLists: setUserLists }}>
      <Navigate />
    </UserListsContext.Provider>
  );
}

