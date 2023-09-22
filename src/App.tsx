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
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route
          path="/password"
          element={user ? <Navigate to="/dashboard" replace /> : <Password />}
        />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
      </React.Fragment>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
