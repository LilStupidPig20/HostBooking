import React from "react";
import { Navbar } from "./components/Navbar";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

export const App = () => {
  const routes = useRoutes(true);

  return (
    <div>
      <Navbar />
      <Router>
        {routes}
      </Router>
    </div>
  );
};
