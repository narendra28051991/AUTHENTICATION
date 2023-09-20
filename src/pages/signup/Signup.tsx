import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { create } from 'zustand';
import useSignup from '../../hooks/useSignup';

type SignupStore = {
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  setUserType: (type: string) => void;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};

const useSignupStore = create<SignupStore>((set) => ({
  userType: 'Student',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  setUserType: (type) => set({ userType: type }),
  setFirstName: (name) => set({ firstName: name }),
  setLastName: (name) => set({ lastName: name }),
  setEmail: (email) => set({ email: email }),
  setPassword: (password) => set({ password: password }),
}));

const Signup: React.FC = () => {
  const {
    userType,
    setUserType,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
  } = useSignupStore();

  const { signup, error } = useSignup();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <div>
        <label>
          <input
            type="radio"
            value="Student"
            checked={userType === 'Student'}
            onChange={() => setUserType('Student')}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            value="Mentor"
            checked={userType === 'Mentor'}
            onChange={() => setUserType('Mentor')}
          />
          Mentor
        </label>
      </div>

      <label>
        <span>First name:</span>
        <input
          required
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          value={firstName}
        />
      </label>

      <label>
        <span>Last name:</span>
        <input
          required
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          value={lastName}
        />
      </label>

      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <button className="btn" type="submit">
        Sign up
      </button>

      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>

      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
