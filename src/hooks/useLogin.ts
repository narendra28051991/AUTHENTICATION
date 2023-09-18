import { useState } from 'react';
import { auth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      if (rememberMe) {
        await setPersistence(auth, browserSessionPersistence);
      }
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { login, error, user };
};

export default useLogin;
