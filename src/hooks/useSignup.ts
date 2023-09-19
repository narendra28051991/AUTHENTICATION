import { useState } from 'react';
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase/config';

const useSignup = () => {
  const [error, setError] = useState<string | null>(null);

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await sendEmailVerification(user);
      }
      setError(null);
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  return { signup, error };
};

export default useSignup;
