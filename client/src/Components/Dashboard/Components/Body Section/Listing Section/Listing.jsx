import React from 'react';
import './Listing.css';

const Listing = () => {
  return (
    <div className="main-content">
      <div className='listingSection'>
      <h1>Order Easy 1.0!</h1>
      <div>
        <p>NOTAS DE VERSIÓN (PROYECTO EN DESARROLLO)</p>
        <p>VERSION 1.0 (BETA):</p>
        <ul>
          <li>Vistas Agregadas:
            <ul>
              <li>Vista de Inventario</li>
              <li>Vista de Balance</li>
              <li>Vista de Estadísticas</li>
            </ul>
          </li>
          <li>Funcionalidades Agregadas:
            <ul>
              <li>Categorías:
                <ul>
                  <li>Creación de Categorías</li>
                  <li>Edición de Categorías</li>
                  <li>Eliminación de Categorías</li>
                  <li>Filtro por Categorías</li>
                </ul>
              </li>
              <li>Productos:
                <ul>
                  <li>Creación de Productos</li>
                  <li>Edición de Productos</li>
                  <li>Eliminación de Productos</li>
                  <li>Barra de búsqueda de productos</li>
                </ul>
              </li>
              <li>Balance:
                <ul>
                  <li>Agregación de ingresos del negocio</li>
                  <li>Agregación de egresos del negocio</li>
                  <li>Tabla de visualización de ingresos y egresos</li>
                  <li>Visualización de ingresos totales, egresos totales y balance</li>
                </ul>
              </li>
              <li>Visualizaciones de barras y de líneas:
                <ul>
                  <li>Visualización de diagrama de líneas con un balance mensual</li>
                  <li>Visualización de diagrama de barras con la información de ventas de productos</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    </div>
    
  );
};

export default Listing;
