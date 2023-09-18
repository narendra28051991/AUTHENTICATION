import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const { login, error } = useLogin();
  const navigate = useNavigate();

  // Check if the user is already authenticated based on localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await login(email, password, rememberMe);

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <label>
        <input
          type="checkbox"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
          checked={rememberMe}
        />
        <span>Remember me</span>
      </label>

      <p>
        <Link to="/password">Forgot password?</Link>
      </p>

      <button className="btn" type="submit">
        Login
      </button>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>

      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
