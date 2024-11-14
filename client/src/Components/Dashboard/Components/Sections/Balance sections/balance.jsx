import React, { useState, useEffect } from 'react';
import './balance.css';
import { getProducts } from '../../../../../api/productService'; 
import { createIngreso, createEgreso } from '../../../../../api/movimientosService'; 

const Balance = () => {
  const [isModalVentaOpen, setIsModalVentaOpen] = useState(false);
  const [isModalEgresoOpen, setIsModalEgresoOpen] = useState(false);
  const [modalClass, setModalClass] = useState('');
  
  const [productos, setProductos] = useState([{ productoNombre: '', cantidad: '' }]);
  const [productosData, setProductosData] = useState({});
  const [ventaExitosa, setVentaExitosa] = useState(false);
  const [noHayProductos, setNoHayProductos] = useState(false);

  const rows = [
    { fecha: '2024-09-01', producto: 'Producto A', valor: '$100' },
    { fecha: '2024-09-02', producto: 'Producto B', valor: '$150' },
    { fecha: '2024-09-03', producto: 'Producto C', valor: '$200' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const productosAgrupados = response.data.reduce((acc, producto) => {
          const categoria = producto.categoriaNombre;
          if (!acc[categoria]) {
            acc[categoria] = [];
          }
          acc[categoria].push(producto);
          return acc;
        }, {});
        setProductosData(productosAgrupados);
        if (response.data.length === 0) {
          setNoHayProductos(true);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleModalVenta = () => {
    if (!isModalVentaOpen) {
      setModalClass('slide-in');
    } else {
      setModalClass('slide-out');
      setTimeout(() => {
        setIsModalVentaOpen(false);
        setModalClass('');
      }, 400);
    }
    setIsModalVentaOpen(!isModalVentaOpen);
  };

  const toggleModalEgreso = () => {
    if (!isModalEgresoOpen) {
      setModalClass('slide-in');
    } else {
      setModalClass('slide-out');
      setTimeout(() => {
        setIsModalEgresoOpen(false);
        setModalClass('');
      }, 400);
    }
    setIsModalEgresoOpen(!isModalEgresoOpen);
  };

  const handleProductoChange = (index, key, value) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][key] = value;
    setProductos(nuevosProductos);
  };

  const handleAddProducto = () => {
    setProductos([...productos, { productoNombre: '', cantidad: '' }]);
  };

  const handleRemoveProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  const handleVentaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createIngreso(productos);
      console.log(response.data);
      setVentaExitosa(true);
      toggleModalVenta();
      setProductos([{ productoNombre: '', cantidad: '' }]);
    } catch (error) {
      console.error('Error al crear el ingreso:', error);
    }
  };

  const handleEgresoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEgreso(productos);
      console.log(response.data);
      toggleModalEgreso();
      setProductos([{ productoNombre: '', cantidad: '' }]);
    } catch (error) {
      console.error('Error al crear el egreso:', error);
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="buttonDiv">
          <button className="button button-green" onClick={toggleModalVenta} disabled={noHayProductos}>
            Nueva Venta
          </button>
          <button className="button button-red" onClick={toggleModalEgreso}>
            Nuevo Egreso
          </button>
        </div>

        <div className="dashboard-card">
          <div className="balance-row">
            <div className="balance-item">
              <h3>Balance General</h3>
              <p>$0</p>
            </div>
            <div className="balance-item">
              <h3>Ingresos Totales</h3>
              <p>$0</p>
            </div>
            <div className="balance-item">
              <h3>Egresos Totales</h3>
              <p>$0</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="3">No hay datos disponibles</td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.fecha}</td>
                    <td>{row.producto}</td>
                    <td>{row.valor}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {noHayProductos && (
          <div className="mensaje-error">
            <p>No hay productos disponibles para vender</p>
          </div>
        )}

        {ventaExitosa && (
          <div className="mensaje-exito">
            <p>Venta hecha exitosamente</p>
          </div>
        )}

        {isModalVentaOpen && (
          <div className="modal-overlay">
            <div className={`modal ${modalClass}`}>
              <button className="close-button" onClick={toggleModalVenta}>
                X
              </button>
              <h2>Nueva Venta</h2>
              <form onSubmit={handleVentaSubmit}>
                <div>
                  <label>Productos:</label>
                  {productos.map((producto, index) => (
                    <div key={index} className="producto-fields">
                      <label>Nombre del Producto</label>
                      <select
                        className="select-producto"
                        value={producto.productoNombre}
                        onChange={(e) => handleProductoChange(index, 'productoNombre', e.target.value)}
                        required
                      >
                        <option value="">Seleccione un producto</option>
                        {Object.keys(productosData).map((categoria) => (
                          <optgroup key={categoria} label={categoria}>
                            {productosData[categoria].map((prod) => (
                              <option key={prod.nombre} value={prod.nombre}>
                                {prod.nombre} - Cantidad Disponible: {prod.cantidad}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>

                      <label>Cantidad</label>
                      <input
                        className="input-cantidad"
                        type="number"
                        value={producto.cantidad}
                        onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                        required
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn-eliminar"
                          onClick={() => handleRemoveProducto(index)}
                        >
                          Eliminar Producto
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleAddProducto}>Agregar Otro Producto</button>
                <button type="submit">Registrar Venta</button>
              </form>
            </div>
          </div>
        )}

        {isModalEgresoOpen && (
          <div className="modal-overlay">
            <div className={`modal ${modalClass}`}>
              <button className="close-button" onClick={toggleModalEgreso}>
                X
              </button>
              <h2>Registrar Egreso</h2>
              <form onSubmit={handleEgresoSubmit}>
                <div>
                  <label>Productos:</label>
                  {productos.map((producto, index) => (
                    <div key={index} className="producto-fields">
                      <label>Nombre del Producto</label>
                      <select
                        className="select-producto"
                        value={producto.productoNombre}
                        onChange={(e) => handleProductoChange(index, 'productoNombre', e.target.value)}
                        required
                      >
                        <option value="">Seleccione un producto</option>
                        {Object.keys(productosData).map((categoria) => (
                          <optgroup key={categoria} label={categoria}>
                            {productosData[categoria].map((prod) => (
                              <option key={prod.nombre} value={prod.nombre}>
                                {prod.nombre} - Cantidad Disponible: {prod.cantidad}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>

                      <label>Cantidad</label>
                      <input
                        className="input-cantidad"
                        type="number"
                        value={producto.cantidad}
                        onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                        required
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn-eliminar"
                          onClick={() => handleRemoveProducto(index)}
                        >
                          Eliminar Producto
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleAddProducto}>Agregar Otro Producto</button>
                <button type="submit">Registrar Egreso</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
