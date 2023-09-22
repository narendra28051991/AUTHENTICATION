import { User } from 'firebase/auth';

export type AuthContextStore = {
  user: User | null;
  setUser: (user: User | null) => void;
}

export type LoginSignupState = {
  error: string | null;
  setError: (error: string | null) => void;
};

export type ResetState = {
  error: string | null;
  successMessage: string | null;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
};
