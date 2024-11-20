// CrearCategoria.js
import React, { useState } from 'react';
import { createCategory } from '../../../../../../api/categoryService';
import Swal from 'sweetalert2';

const CrearCategoria = ({ toggleModalCategoria }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const category = { nombre, descripcion };
    try {
        await createCategory(category);
        Swal.fire({
            icon: 'success',
            title: 'Categoría creada con éxito',
            text: `La categoría "${nombre}" ha sido creada satisfactoriamente.`
        }).then(() => {
            window.location.reload(); // Recarga la página después de mostrar la alerta
        });
        toggleModalCategoria(); // Cierra el modal después de crear la categoría
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al crear la categoría. Por favor, inténtalo de nuevo más tarde.'
        });
    }
};

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={toggleModalCategoria}>
          X
        </button>
        <h2>Crear Categoria</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </label>
          <button type="submit" className="add">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearCategoria;
