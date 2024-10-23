import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Importante para que Chart.js funcione correctamente

const Estadisticas = () => {
  // Datos para el gráfico de barras de productos vendidos
  const productData = {
    labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
    datasets: [
      {
        label: 'Ventas de Productos',
        data: [12, 19, 3, 5, 2],  // Datos de ventas por producto
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de comparación de categorías
  const categoryData = {
    labels: ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros'],
    datasets: [
      {
        label: 'Categorías',
        data: [15, 9, 13, 7, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='mainContent'>
      <h1>Estadísticas</h1>

      {/* Gráfico de ventas de productos */}
      <div className='chartContainer'>
        <h2>Ventas de Productos</h2>
        <Bar data={productData} />
      </div>

      {/* Gráfico de comparación de categorías */}
      <div className='chartContainer'>
        <h2>Comparación de Categorías</h2>
        <Bar data={categoryData} />
      </div>
    </div>
  );
}

export default Estadisticas;
