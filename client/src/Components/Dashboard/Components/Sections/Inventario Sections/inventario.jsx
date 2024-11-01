import React, { useEffect, useState } from "react";
import './inventario.css';

const Inventario = () => {
  // Controla la visibilidad de los modales
  const [isModalProductoOpen, setIsModalProductoOpen] = useState(false);
  const [isModalCategoriaOpen, setIsModalCategoriaOpen] = useState(false);
  const [modalClass, setModalClass] = useState('');

  // Datos de ejemplo para los productos
  const products = [
    { id: 1, name: "Producto A", available: 10 },
    { id: 2, name: "Producto B", available: 5 },
    { id: 3, name: "Producto C", available: 0 },
    { id: 4, name: "Producto D", available: 2 },
    { id: 5, name: "Producto E", available: 8 },
    { id: 6, name: "Producto F", available: 3 },
    { id: 7, name: "Producto G", available: 0 },
    { id: 8, name: "Producto H", available: 12 },
  ];

  // Función para alternar la visibilidad del modal de Crear Producto
  const toggleModalProducto = () => {
    if (!isModalProductoOpen) {
      setModalClass('slide-in');
    } else {
      setModalClass('slide-out');
      setTimeout(() => {
        setIsModalProductoOpen(false);
        setModalClass('');
      }, 400); // Duración de la animación
    }
    setIsModalProductoOpen(!isModalProductoOpen);
  };

  // Función para alternar la visibilidad del modal de Crear Categoria
  const toggleModalCategoria = () => {
    if (!isModalCategoriaOpen) {
      setModalClass('slide-in');
    } else {
      setModalClass('slide-out');
      setTimeout(() => {
        setIsModalCategoriaOpen(false);
        setModalClass('');
      }, 400); // Duración de la animación
    }
    setIsModalCategoriaOpen(!isModalCategoriaOpen);
  };

  const handleProductoSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos del producto a la BD
    console.log("Datos del producto enviados a la BD");
    toggleModalProducto();
  };

  const handleCategoriaSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos de la categoría a la BD
    console.log("Datos de la categoría enviados a la BD");
    toggleModalCategoria();
  };

  return (
    <div className="main-content">
      <div className="top-bar">
        <button className="create-product" onClick={toggleModalProducto}>
          Crear Producto
        </button>
        
        <div className="search-bar">
        <button className="create-category" onClick={toggleModalCategoria}>
          Crear Categoria
        </button>
          <select>
            <option>Categorías</option>
          </select>
          <input type="text" placeholder="Buscar Producto" />
        </div>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image"></div>
              <h3>{product.name}</h3>
              <p>Disponibles: {product.available}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal para crear producto */}
      {isModalProductoOpen && (
        <div className="modal-overlay">
          <div className={`modal ${modalClass}`}>
            <button className="close-button" onClick={toggleModalProducto}>
              X
            </button>
            <h2>Crear Producto</h2>
            <form onSubmit={handleProductoSubmit}>
              <label>
                Nombre:
                <input type="text" name="nombre" required />
              </label>
              <label>
                Precio:
                <input type="number" name="precio" required />
              </label>
              <label>
                Imagen:
                <input type="file" name="imagen" accept="image/*" required />
              </label>
              <label>
                Cantidad:
                <input type="number" name="cantidad" required />
              </label>
              <label>
                Categoría:
                <select name="categoria" required>
                  <option value="">Seleccionar Categoría</option>
                  {/* Aquí puedes agregar las opciones de categoría */}
                </select>
              </label>
              <button type="submit" className="button-submit">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para crear categoría */}
      {isModalCategoriaOpen && (
        <div className="modal-overlay">
          <div className={`modal ${modalClass}`}>
            <button className="close-button" onClick={toggleModalCategoria}>
              X
            </button>
            <h2>Crear Categoria</h2>
            <form onSubmit={handleCategoriaSubmit}>
              <label>
                Nombre:
                <input type="text" name="nombre" required />
              </label>
              <label>
                Descripción:
                <input type="text" name="descripcion" required />
              </label>
              <button type="submit" className="button-submit">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventario;
