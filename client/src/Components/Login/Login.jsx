import React, { useState } from "react";
import "./Login.css"; // Asegúrate de que el CSS se importe correctamente
import "../../App.css";
import Swal from 'sweetalert2';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // Importa el contexto de autenticación
import { login as loginApi } from "../../api/auth"; // Importa tu función de login de la API


// Importar archivos
import video from "../../LoginAssets/video.mp4";
import logo from "../../LoginAssets/logo.png";

// Importar iconos
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa el método login del contexto de autenticación

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      Swal.fire({
        title: 'Iniciando sesión...',
        text: 'Por favor espera un momento',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    
      const response = await loginApi(loginUsername, loginPassword);
      Swal.close(); // Cierra la alerta de carga
    
      login(response.data.token); // Guarda el token en el contexto de autenticación
      setLoginStatus("Inicio de sesión exitoso");
    
      // Muestra un mensaje de éxito después de cerrar la alerta de carga
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "Bienvenido al panel de control"
      });
    
      navigate("/dashboard");
    } catch (error) {
      Swal.close(); // Cierra la alerta de carga en caso de error
    
      // Muestra una alerta de error si el inicio de sesión falla
      Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.",
        footer: '<a href="#">¿Necesitas ayuda con tu cuenta?</a>'
      });
    
      setLoginStatus("Error en el inicio de sesión");
    }
    
    
    
    
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h4 className='title'>¡Descubre la forma más cómoda y segura de comprar productos tecnológicos con nuestra página web!</h4>
            <p></p>
          </div>

          <div className="footerDiv flex">
            <span className="text">No tienes cuenta aún?</span>
            <Link to={'/register'}>
              <button className='btn'>Regístrate aquí!</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headDiv">
            <img src={logo} alt="Logo" />
            <h3>Bienvenido!</h3>
          </div>

          <form className="form grid" onSubmit={onSubmit}>
            <span className={loginStatus ? "statusHolder" : ""}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Ingrese su usuario"
                  value={loginUsername}
                  onChange={(event) => setLoginUsername(event.target.value)}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn flex">
              <span>Iniciar sesión </span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>

          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
