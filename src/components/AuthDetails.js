import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Create a context for the auth state
const AuthContext = createContext();

// Create a provider component to manage the auth state
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signout is successful"))
      .catch((error) => console.log("Error signing out",error));
  };

  return (
    <AuthContext.Provider value={{ authUser, userSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to access the auth state
export function useAuth() {
    return useContext(AuthContext);
  }
