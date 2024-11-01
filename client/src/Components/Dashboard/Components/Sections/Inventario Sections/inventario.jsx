import React, { useEffect } from "react";
import './inventario.scss';

const Inventario = () => {
  useEffect(() => {
    // Función para manejar el clic en "Crear Producto"
    const createProductButton = document.querySelector(".create-product");
    createProductButton.addEventListener("click", () => {
      alert("Funcionalidad de crear producto aún no implementada");
    });

    // Función para manejar la activación de los elementos del menú
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        menuItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      });
    });

    // Cleanup de los event listeners
    return () => {
      createProductButton.removeEventListener("click", () => {});
      menuItems.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
    };
  }, []);

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

  return (
    <div className="main-content">
      <div className="top-bar">
        <button className="create-product">Crear Producto</button>
        <div className="search-bar">
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
    </div>
  );
};

export default Inventario;
