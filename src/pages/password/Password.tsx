import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { auth, sendPasswordResetEmail } from '../../firebase/config';
import { create } from 'zustand';

type PasswordStore = {
  email: string;
  error: string | null;
  successMessage: string | null;
  setEmail: (email: string) => void;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
};

const usePasswordStore = create<PasswordStore>((set) => ({
  email: '',
  error: null,
  successMessage: null,
  setEmail: (email) => set({ email }),
  setError: (error) => set({ error }),
  setSuccessMessage: (message) => set({ successMessage: message }),
}));

const Password: React.FC = () => {
  const { email, setEmail, error, setError, successMessage, setSuccessMessage } = usePasswordStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>

      <label>
        <span>Enter your email:</span>
        <input
          required
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <button className="btn" type="submit">
        Reset Password
      </button>

      <p>
        <Link to="/login">Go Back to Login</Link>
      </p>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Password;
