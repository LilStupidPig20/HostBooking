import React from "react";
import { Navbar } from "./components/Navbar";
import { useRoutes } from "./routes";
import {useAuth} from "./hooks/auth.hook"
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export const App = () => {
  const { token, login, logout } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, isAuthenticated
    }} >
      <Navbar />
      <Router>
        {routes}
      </Router>
      </AuthContext.Provider>
  );
};
