import { create } from 'zustand';
import { auth, signInWithEmailAndPassword } from '../firebase/config';
import { LoginSignupState } from '../types';

const useLoginState = create<LoginSignupState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));

const useLogin = () => {
  const { error, setError } = useLoginState();

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  return { login, error };
};

export default useLogin;