import { createContext, ReactNode, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, onAuthStateChanged } from '../firebase/config';
import { create } from 'zustand';

export type AuthContextStore = {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthContextStore = create<AuthContextStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const AuthContext = createContext<AuthContextStore | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useAuthContextStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};
