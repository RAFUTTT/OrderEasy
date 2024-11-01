import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Register/Register"
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta para Register */}
        <Route path="/register" element={<Register />} />


        {/* Ruta para el Dashboard, sin protección de autenticación */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
