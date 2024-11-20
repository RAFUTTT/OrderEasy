import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getIngresos, getEgresos } from '../../../../../api/movimientosService';
import './estadisticas.css';

const Estadisticas = () => {
  const [productIncomeData, setProductIncomeData] = useState(null); // Gráfica de ingresos por producto
  const [monthlyBalanceData, setMonthlyBalanceData] = useState(null); // Gráfica de balance mensual

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamadas a las APIs
        const [ingresosResponse, egresosResponse] = await Promise.all([getIngresos(), getEgresos()]);

        // Procesar ingresos para los productos
        const ingresos = ingresosResponse.data;

        const ingresosPorProducto = ingresos.reduce((acc, ingreso) => {
          acc[ingreso.productoNombre] = (acc[ingreso.productoNombre] || 0) + ingreso.total;
          return acc;
        }, {});
        const productoLabels = Object.keys(ingresosPorProducto);
        const productoIngresos = Object.values(ingresosPorProducto);

        // Generar colores dinámicamente
        const colores = productoLabels.map(
          () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
        );

        setProductIncomeData({
          labels: productoLabels,
          datasets: [
            {
              label: 'Ingresos por Producto ($)',
              data: productoIngresos,
              backgroundColor: colores,
              borderColor: colores.map(color => color.replace('0.5', '1')), // Borde más sólido
              borderWidth: 1,
            },
          ],
        });

        // Procesar ingresos y egresos para balance mensual
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

  if (!productIncomeData || !monthlyBalanceData) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="main-content">
      {/* Gráfico de balance mensual */}
      <div className="chartContainer">
        <h2>BALANCE MENSUAL</h2>
        <Line data={monthlyBalanceData} />
      </div>

      {/* Gráfico de ingresos por producto */}
      <div className="chartContainer">
        <h2>INGRESOS GENERADOS POR PRODUCTO</h2>
        <Bar data={productIncomeData} />
      </div>
    </div>
  );
};

export default Estadisticas;
