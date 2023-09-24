import { createContext, ReactNode, useEffect } from 'react';
import { auth, onAuthStateChanged } from '../firebase/config';
import { create } from 'zustand';
import { AuthContextStore } from '../types';

const useAuthContextStore = create<AuthContextStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const AuthContext = createContext<AuthContextStore | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useAuthContextStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser?.emailVerified) {
        setUser(authUser);
      } else {
        setUser(null);
        auth.signOut;
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};
