import React, { useState } from 'react';
import './Register.scss'; // Asegúrate de que la ruta es correcta

import { Link } from 'react-router-dom';
import Axios from 'axios';

// importar archivos
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';

// importar iconos
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';

const Register = () => {
  // useState para guardar nuestras entradas
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [apellido, setApellido] = useState('');
  const [numero, setNumero] = useState('');

  // onclick obtener lo que el usuario ha ingresado
  const createUser = () => {
    Axios.post('http://localhost:3002/register', {
      // crea variable para enviar al servidor a través de la ruta
      Email: email,
      UserName: userName,
      Password: password,
      Apellido: apellido,
      Numero: numero,
    }).then(() => {
      console.log('User has been created');
    });
  };

  return (
    <div className='registerPage flex'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h4 className='title'>¡Descubre la forma más cómoda y segura de comprar productos tecnológicos con nuestra página web!</h4>
          </div>
          <div className="footerDiv flex">
            <span className="text">¿Tienes una cuenta?</span>
            <Link to={'/'}>
              <button className='btn'>Iniciar sesión</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headDiv">
            <img src={logo} alt="Logo" />
            <h3>Ingresa los siguientes datos!</h3>
          </div>

          <form className='form grid'>
  

            <div className="inputDiv">
              <label htmlFor="username">Información personal</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input type="text" id='username' placeholder='Ingrese su nombre' onChange={(event) => setUserName(event.target.value)} />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="apellido">Apellido</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input type="text" id='apellido' placeholder='Ingrese su apellido' onChange={(event) => setApellido(event.target.value)} />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="numero">Número Telefónico</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input type="text" id='numero' placeholder='Ingrese su número telefónico' onChange={(event) => setNumero(event.target.value)} />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input type="password" id='password' placeholder='Ingrese una contraseña' onChange={(event) => setPassword(event.target.value)} />
              </div>
            </div>

            <button type='button' className='btn flex' onClick={createUser}>
              <span>Registrar</span>
              <AiOutlineSwapRight className='icon' />
            </button>

            <span className='forgotPassword'>
              ¿Olvidaste tu contraseña? <a className='forgotpassword' href="">Click Aquí</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register; // Cambia el nombre del componente a Register
