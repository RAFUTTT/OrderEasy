import React, { useState, useEffect } from 'react';
import { getCategories } from '../../../../../../api/categoryService';
import { createProduct } from '../../../../../../api/productService';
import '../inventario.css'

const CrearProducto = ({ toggleModalProducto }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioDeCompra, setPrecioDeCompra] = useState('');
  const [precioDeVenta, setPrecioDeVenta] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remover puntos y comas para obtener el valor numérico
    const precioDeCompraNumber = parseFloat(precioDeCompra.replace(/[^\d]/g, ''));
    const precioDeVentaNumber = parseFloat(precioDeVenta.replace(/[^\d]/g, ''));

    const producto = {
      nombre,
      descripcion,
      cantidad,
      precioDeVenta: precioDeVentaNumber,
      precioDeCompra: precioDeCompraNumber,
      categoriaNombre: categoria
    };

    try {
      const response = await createProduct(producto);
      console.log(response.data);
      toggleModalProducto(); // Cierra la ventana emergente después de enviar el formulario
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const formatPrice = (value) => {
    // Remover puntos y comas para formatear correctamente
    const numberValue = parseFloat(value.replace(/[^\d]/g, ''));
    if (isNaN(numberValue)) {
      return value;
    }
    return numberValue.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const handlePrecioDeCompraChange = (e) => {
    const formattedPrice = formatPrice(e.target.value);
    setPrecioDeCompra(formattedPrice);
  };

  const handlePrecioDeVentaChange = (e) => {
    const formattedPrice = formatPrice(e.target.value);
    setPrecioDeVenta(formattedPrice);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={toggleModalProducto}>×</button>
        <h2>Crear Producto</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <label>Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <label>Cantidad</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
          <label>Precio De Compra</label>
          <input
            type="text"
            value={precioDeCompra}
            onChange={handlePrecioDeCompraChange}
            required
          />
          <label>Precio De Venta</label>
          <input
            type="text"
            value={precioDeVenta}
            onChange={handlePrecioDeVentaChange}
            required
          />
          <label>Categoría</label>
          <select
            className='select-product'
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map(cat => (
              <option key={cat.nombre} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <button type="submit" className="button-submit">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default CrearProducto;
