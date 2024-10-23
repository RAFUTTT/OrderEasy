import React, { useEffect } from 'react';
import './balance.css';

const Estadisticas = () => {
  useEffect(() => {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', function () {
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
      });
    });

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        alert('Funcionalidad en desarrollo: ' + this.textContent);
      });
    });
  }, []);

  // Datos de ejemplo para las filas de la tabla
  const rows = [
    { fecha: '2024-09-01', producto: 'Producto A', valor: '$100' },
    { fecha: '2024-09-02', producto: 'Producto B', valor: '$150' },
    { fecha: '2024-09-03', producto: 'Producto C', valor: '$200' },
    // Puedes agregar más filas aquí según sea necesario
  ];

  return (
    <div className="container">
      {/* Main Content */}
      <div className="main-content">
      <div className="buttonDiv">
      <button className="button button-green">Nueva Venta</button>
      <button className="button button-red">Nuevo Gasto</button>
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

          <div className="button-row">
            <button className="ingresos">Ingresos</button>
            <button className="egresos">Egresos</button>
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
      </div>
    </div>
  );
};

export default Estadisticas;
