import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { create } from 'zustand';
import useReset from '../../hooks/useReset';
import { PasswordStore } from '../../types/component';

const usePasswordStore = create<PasswordStore>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
}));

const Password: React.FC = () => {
  const { email, setEmail } = usePasswordStore();
  const { resetPassword, error, successMessage } = useReset()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await resetPassword(email);
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
