import { create } from 'zustand';
import { auth, sendPasswordResetEmail } from '../firebase/config';
import { ResetState } from '../types';

const useResetState = create<ResetState>((set) => ({
  error: null,
  successMessage: null,
  setError: (error) => set({ error }),
  setSuccessMessage: (message) => set({ successMessage: message })
}));

const useReset = () => {
  const { error, successMessage, setError, setSuccessMessage } = useResetState();

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
      setSuccessMessage('Password reset email sent. Check your inbox.');
    }
    catch (err: any) {
      setError(err.message);
      setSuccessMessage(null);
    }
};

  return { resetPassword, error, successMessage };
};

export default useReset;
