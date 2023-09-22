export type LoginStore = {
  email: string;
  password: string;
  rememberMe: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
  resetForm: () => void;
};

export type PasswordStore = {
  email: string;
  setEmail: (email: string) => void;
};

export type SignupStore = {
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
