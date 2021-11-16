import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";
// import Auth from "../components/Auth/Auth";
import { loadState } from "./LocalStorage";

export const AuthContext = createContext();

export default ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, loadState());
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
