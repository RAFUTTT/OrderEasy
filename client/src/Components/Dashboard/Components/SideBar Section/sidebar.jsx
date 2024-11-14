import React from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useAuth } from '../../../../auth/AuthContext'

// Importar Iconos y Logo
import logo from "../assets/logo2.png";
import { IoMdSpeedometer } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineBarChart } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { FaBalanceScale } from "react-icons/fa";

const Sidebar = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <NavLink to="/dashboard">
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">Menu Principal</h3>
        <ul className="menuList grid">
          <li className="listItem">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "menuLink flex active" : "menuLink flex"
              }
            >
              <IoMdSpeedometer className="icon" />
              <h3 className="smallText">Dashboard</h3>
            </NavLink>
          </li>

          <li className="listItem">
            <NavLink
              to="/dashboard/balance"
              className={({ isActive }) =>
                isActive ? "menuLink flex active" : "menuLink flex"
              }
            >
              <FaBalanceScale className="icon" />
              <h3 className="smallText">Balance</h3>
            </NavLink>
          </li>

          <li className="listItem">
            <NavLink
              to="/dashboard/inventario"
              className={({ isActive }) =>
                isActive ? "menuLink flex active" : "menuLink flex"
              }
            >
              <GoChecklist className="icon" />
              <h3 className="smallText">Inventario</h3>
            </NavLink>
          </li>

          <li className="listItem">
            <NavLink
              to="/dashboard/estadisticas"
              className={({ isActive }) =>
                isActive ? "menuLink flex active" : "menuLink flex"
              }
            >
              <MdOutlineBarChart className="icon" />
              <h3 className="smallText">Estadísticas</h3>
            </NavLink>
          </li>

          <li className="listItem" onClick={handleLogout}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "menuLink flex active" : "menuLink flex"
              }
            >
              <IoExitOutline className="icon" />
              <h3 className="smallText">Salir</h3>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
