// CrearCategoria.js
import React, { useState } from 'react';
import { createCategory } from '../../../../../../api/categoryService';

const CrearCategoria = ({ toggleModalCategoria }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const category = { nombre, descripcion };
    try {
      await createCategory(category);
      alert('Categoría creada con éxito');
      toggleModalCategoria(); // Cierra el modal después de crear la categoría
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      alert('Hubo un error al crear la categoría');
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
              required
            />
          </label>
          <button type="submit" className="button-submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearCategoria;
