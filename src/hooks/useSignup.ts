import { create } from 'zustand';
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase/config';

type SignupState = {
  error: string | null;
  setError: (error: string | null) => void;
};

const useSignupState = create<SignupState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));

const useSignup = () => {
  const { error, setError } = useSignupState();

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
