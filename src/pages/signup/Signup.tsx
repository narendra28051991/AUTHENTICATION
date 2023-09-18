import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const Signup: React.FC = () => {
  const [userType, setUserType] = useState<string>('Student');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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

      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>

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
