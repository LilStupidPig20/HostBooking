import React from "react";
import { Navbar } from "./components/Navbar";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook"
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export const App = () => {
  const { login, logout, token, userId, fullName } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
      <AuthContext.Provider value={{ login, logout, token, userId, fullName, isAuthenticated }}>
      
      <Router>
        {routes}
      </Router>
      </AuthContext.Provider>
  );
};
