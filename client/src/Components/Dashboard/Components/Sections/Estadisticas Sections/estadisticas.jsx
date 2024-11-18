import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getProducts } from '../../../../../api/productService';
import { getIngresos, getEgresos } from '../../../../../api/movimientosService';
import { getCategories } from '../../../../../api/categoryService';
import './estadisticas.css'

const Estadisticas = () => {
  const [productData, setProductData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [monthlyBalanceData, setMonthlyBalanceData] = useState(null); // Estado para balance mensual

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamadas a las APIs
        const [productsResponse, ingresosResponse, egresosResponse, categoriesResponse] = await Promise.all([
          getProducts(),
          getIngresos(),
          getEgresos(),
          getCategories(),
        ]);

        // Procesar productos
        const products = productsResponse.data;
        const productLabels = products.map((product) => product.nombre);
        const productSales = products.map((product) => product.cantidad * product.precioDeVenta);

        setProductData({
          labels: productLabels,
          datasets: [
            {
              label: 'Ventas de Productos',
              data: productSales,
              backgroundColor: productLabels.map(() => 'rgba(54, 162, 235, 0.2)'),
              borderColor: productLabels.map(() => 'rgba(54, 162, 235, 1)'),
              borderWidth: 1,
            },
          ],
        });

        // Procesar ingresos por producto
        const ingresos = ingresosResponse.data;
        const ingresoAgrupado = ingresos.reduce((acc, ingreso) => {
          acc[ingreso.productoNombre] = (acc[ingreso.productoNombre] || 0) + ingreso.total;
          return acc;
        }, {});
        const ingresoLabels = Object.keys(ingresoAgrupado);
        const ingresoTotals = Object.values(ingresoAgrupado);

        setCategoryData({
          labels: ingresoLabels,
          datasets: [
            {
              label: 'Ingresos por Producto',
              data: ingresoTotals,
              backgroundColor: ingresoLabels.map(() => 'rgba(255, 159, 64, 0.2)'),
              borderColor: ingresoLabels.map(() => 'rgba(255, 159, 64, 1)'),
              borderWidth: 1,
            },
          ],
        });

        // Procesar ingresos y egresos por mes para calcular el balance mensual
        const egresos = egresosResponse.data;

        const calcularBalanceMensual = () => {
          const ingresosPorMes = ingresos.reduce((acc, ingreso) => {
            const fecha = new Date(ingreso.fecha);
            const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
            acc[mes] = (acc[mes] || 0) + ingreso.total;
            return acc;
          }, {});

          const egresosPorMes = egresos.reduce((acc, egreso) => {
            const fecha = new Date(egreso.fecha);
            const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
            acc[mes] = (acc[mes] || 0) + egreso.total;
            return acc;
          }, {});

          // Calcular balance combinando ingresos y egresos
          const allMonths = Array.from(new Set([...Object.keys(ingresosPorMes), ...Object.keys(egresosPorMes)]));
          allMonths.sort(); // Ordenar los meses en formato YYYY-MM

          const balanceMensual = allMonths.map((mes) => {
            const ingreso = ingresosPorMes[mes] || 0;
            const egreso = egresosPorMes[mes] || 0;
            return ingreso - egreso;
          });

          return { labels: allMonths, data: balanceMensual };
        };

        const balanceMensual = calcularBalanceMensual();

        setMonthlyBalanceData({
          labels: balanceMensual.labels,
          datasets: [
            {
              label: 'Balance Mensual (Ingresos - Egresos)',
              data: balanceMensual.data,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1, // Curvatura de las líneas
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!productData || !categoryData || !monthlyBalanceData) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="main-content">
      {/* Gráfico de balance mensual */}
      <div className="chartContainer">
        <h2>BALANCE MENSUAL</h2>
        <Line data={monthlyBalanceData} />
      </div>

      {/* Gráfico de ventas de productos */}
      <div className="chartContainer">
        <h2>TOTAL DE VENTAS POR PRODUCTO</h2>
        <Bar data={productData} />
      </div>
    </div>
  );
};

export default Estadisticas;
