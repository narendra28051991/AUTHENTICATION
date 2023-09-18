import { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../firebase/config';

const useSignup = () => {
  const [error, setError] = useState<string | null>(null);

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { signup, error };
};

export default useSignup;
