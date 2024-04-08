import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [arrayData, setArrayData] = useState([]); // Agrega el nuevo estado aquí
  const [arrayDataO, setArrayDataO] = useState([]); // Agrega el nuevo estado aquí
  const handleLoginSuccess = (data) => {
    setUserData(data);
  };

  return (
    <AuthContext.Provider value={{ userData, onLoginSuccess: handleLoginSuccess, arrayData, setArrayData, arrayDataO, setArrayDataO }}>
      {children}
    </AuthContext.Provider>
  );
};