import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Password from "./pages/password/Password";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuthContext } from "./hooks/useAuthContext";

function App(): JSX.Element {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <React.Fragment>
        {
          !user
          ? <Route path="/" element={<Navigate to="/login" replace />} />
          : <Route path="/" element={<Navigate to="/dashboard" replace />} />
        }
        {
          !user
          ? <Route path="/signup" element={<Signup />} />
          : <Route path="/signup" element={<Dashboard />} />
        }
        {
          !user
          ? <Route path="/login" element={<Login />} />
          : <Route path="/login" element={<Dashboard />} />
        }
        {
          !user
          ? <Route path="/password" element={<Password />} />
          : <Route path="/password" element={<Dashboard />} />
        }
        {
          !user
          ? <Route path="/dashboard" element={<Login />} />
          : <Route path="/dashboard" element={<Dashboard />} />
        }
      </React.Fragment>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
