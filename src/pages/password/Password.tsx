import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { auth, sendPasswordResetEmail } from '../../firebase/config';

const Password: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);

      console.log('Password reset email sent. Check your inbox.');
    }
    catch (error) {
      console.error('Error sending password reset email:', error);
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
    </form>
  );
};

export default Password;
