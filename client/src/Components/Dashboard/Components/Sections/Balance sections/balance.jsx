import React, { useState } from 'react';
import './balance.css';

const Balance = () => {
  // Controla la visibilidad de los modales
  const [isModalVentaOpen, setIsModalVentaOpen] = useState(false);
  const [isModalGastoOpen, setIsModalGastoOpen] = useState(false);
  const [modalClass, setModalClass] = useState('');

  // Datos de ejemplo para las filas de la tabla
  const rows = [
    { fecha: '2024-09-01', producto: 'Producto A', valor: '$100' },
    { fecha: '2024-09-02', producto: 'Producto B', valor: '$150' },
    { fecha: '2024-09-03', producto: 'Producto C', valor: '$200' },
  ];

  // Función para alternar la visibilidad del modal de Nueva Venta
  const toggleModalVenta = () => {
    if (!isModalVentaOpen) {
      setModalClass('slide-in');
    } else {
      setModalClass('slide-out');
      setTimeout(() => {
        setIsModalVentaOpen(false);
        setModalClass('');
      }, 400); // Duración de la animación
    }
    setIsModalVentaOpen(!isModalVentaOpen);
  };

  // Función para alternar la visibilidad del modal de Nuevo Gasto
  const toggleModalGasto = () => {
    if (!isModalGastoOpen) {
      setModalClass('slide-in');
    } else {
      setModalClass('slide-out');
      setTimeout(() => {
        setIsModalGastoOpen(false);
        setModalClass('');
      }, 400); // Duración de la animación
    }
    setIsModalGastoOpen(!isModalGastoOpen);
  };

  const handleVentaSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos a la BD
    console.log("Datos de la venta enviados a la BD");
    toggleModalVenta();
  };

  const handleGastoSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos a la BD
    console.log("Datos del gasto enviados a la BD");
    toggleModalGasto();
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="buttonDiv">
          <button className="button button-green" onClick={toggleModalVenta}>
            Nueva Venta
          </button>
          <button className="button button-red" onClick={toggleModalGasto}>
            Nuevo Gasto
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

        {/* Modal para nueva venta */}
        {isModalVentaOpen && (
          <div className="modal-overlay">
            <div className={`modal ${modalClass}`}>
              <button className="close-button" onClick={toggleModalVenta}>
                X
              </button>
              <h2>Nueva Venta</h2>
              <form onSubmit={handleVentaSubmit}>
                <label>
                  Producto:
                  <input type="text" name="producto" required />
                </label>
                <label>
                  Cantidad:
                  <input type="number" name="cantidad" required />
                </label>
                <label>
                  $ Valor:
                  <input type="number" name="valor" required />
                </label>
                <button type="submit" className="button-submit">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal para nuevo gasto */}
        {isModalGastoOpen && (
          <div className="modal-overlay">
            <div className={`modal ${modalClass}`}>
              <button className="close-button" onClick={toggleModalGasto}>
                X
              </button>
              <h2>Nuevo Gasto</h2>
              <form onSubmit={handleGastoSubmit}>
                <label>
                  Descripción:
                  <input type="text" name="descripcion" required />
                </label>
                <label>
                  $ Valor:
                  <input type="number" name="valorGasto" required />
                </label>
                <button type="submit" className="button-submit">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
