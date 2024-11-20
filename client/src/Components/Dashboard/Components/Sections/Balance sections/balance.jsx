import React, { useState, useEffect } from 'react';
import './balance.css';
import Swal from 'sweetalert2';
import { getProducts } from '../../../../../api/productService';
import { createIngreso, createEgreso, getIngresos, getEgresos, deleteIngreso, deleteEgreso } from '../../../../../api/movimientosService';
import { FaRegTrashAlt } from "react-icons/fa";
import { PiNotePencilLight } from "react-icons/pi";
import { IoMdTrendingUp } from "react-icons/io";
import { PiTrendDownBold } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";

const Balance = () => {
  const [isModalVentaOpen, setIsModalVentaOpen] = useState(false);
  const [isModalEgresoOpen, setIsModalEgresoOpen] = useState(false);
  const [mostrarIngresos, setMostrarIngresos] = useState(true); // Muestra ingresos por defecto
  const [mostrarEgresos, setMostrarEgresos] = useState(false); // No muestra egresos inicialmente
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [productos, setProductos] = useState([{ productoNombre: '', cantidad: '' }]);
  const [productosData, setProductosData] = useState({});
  const [ventaExitosa, setVentaExitosa] = useState(false);
  const [noHayProductos, setNoHayProductos] = useState(false);


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

    const fetchMovimientos = async () => {
      try {
        // Cargar ingresos
        const ingresosResponse = await getIngresos();
        setIngresos(ingresosResponse.data);

        // Cargar egresos
        const egresosResponse = await getEgresos();
        setEgresos(egresosResponse.data);

        // Mostrar ingresos por defecto
        setMostrarIngresos(true);
        setMostrarEgresos(false);
      } catch (error) {
        console.error('Error al obtener los movimientos:', error);
      }
    };

    fetchProducts();
    fetchMovimientos(); // Cargar ingresos y egresos por defecto al cargar la página
  }, []);


  const cargarIngresos = async () => {
    try {
      const response = await getIngresos();
      setIngresos(response.data);
      setMostrarIngresos(true); // Muestra los ingresos cuando se carga la página
      setMostrarEgresos(false); // Oculta los egresos
    } catch (error) {
      console.error('Error al obtener los ingresos:', error);
    }
  };

  const cargarEgresos = async () => {
    try {
      const response = await getEgresos();
      setEgresos(response.data);
      setMostrarEgresos(true); // Muestra los egresos
      setMostrarIngresos(false); // Oculta los ingresos
    } catch (error) {
      console.error('Error al obtener los egresos:', error);
    }
  };

  const handleEliminarIngreso = async (id) => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esta acción!',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
  
      if (result.isConfirmed) {
        await deleteIngreso(id);  // Eliminar el ingreso de la API
        setIngresos(ingresos.filter(ingreso => ingreso.id !== id));  // Actualiza el estado de los ingresos
        Swal.fire({
          icon: 'success',
          title: 'Ingreso eliminado',
          text: 'El ingreso ha sido eliminado correctamente.',
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Acción cancelada',
          text: 'El ingreso no fue eliminado.',
        });
      }
    } catch (error) {
      console.error('Error al eliminar el ingreso:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar el ingreso.',
      });
    }
  };
  

  const handleEliminarEgreso = async (id) => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esta acción!',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
  
      if (result.isConfirmed) {
        await deleteEgreso(id);  // Eliminar el egreso de la API
        setEgresos(egresos.filter(egreso => egreso.id !== id));  // Actualiza el estado de los egresos
        Swal.fire({
          icon: 'success',
          title: 'Egreso eliminado',
          text: 'El egreso ha sido eliminado correctamente.',
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Acción cancelada',
          text: 'El egreso no fue eliminado.',
        });
      }
    } catch (error) {
      console.error('Error al eliminar el egreso:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar el egreso.',
      });
    }
  };
  
  
  const toggleModalVenta = () => {
    setIsModalVentaOpen(!isModalVentaOpen);
  };

  const toggleModalEgreso = () => {
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
      for (const producto of productos) {
        const categoria = Object.keys(productosData).find((cat) =>
          productosData[cat].some((p) => p.nombre === producto.productoNombre)
        );
        const productoSeleccionado = productosData[categoria]?.find(
          (p) => p.nombre === producto.productoNombre
        );

        if (productoSeleccionado?.cantidad <= 0) {
          Swal.fire({
            icon: 'error',
            title: 'Producto sin stock',
            text: `El producto ${producto.productoNombre} no tiene unidades disponibles.`,
          });
          return;
        }
      }

      await createIngreso(productos);
      setVentaExitosa(true);
      toggleModalVenta();
      setProductos([{ productoNombre: '', cantidad: '' }]);
      Swal.fire({
        icon: 'success',
        title: 'Venta registrada',
        text: 'La venta se ha registrado correctamente.',
      }).then(() => {
        window.location.reload(); // Refresca la página después del éxito
      });
    } catch (error) {
      console.error('Error al crear el ingreso:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar la venta.',
      });
    }
  };

  const handleEgresoSubmit = async (e) => {
    e.preventDefault();
    try {
      // Recorre los productos y valida que se pueda realizar la operación
      for (const producto of productos) {
        const categoria = Object.keys(productosData).find((cat) =>
          productosData[cat].some((p) => p.nombre === producto.productoNombre)
        );
        const productoSeleccionado = productosData[categoria]?.find(
          (p) => p.nombre === producto.productoNombre
        );
  
        // Aquí se verifica si el producto tiene stock
        // Solo se muestra la alerta si el stock es 0 y el egreso intenta restar
        if (productoSeleccionado?.cantidad <= 0 && producto.cantidad < 0) {
          Swal.fire({
            icon: 'error',
            title: 'Producto sin stock',
            text: `El producto ${producto.productoNombre} no tiene unidades disponibles.`,
          });
          return; // Detenemos la ejecución si no hay stock para un egreso
        }
      }
  
      // Enviar el egreso (sin validación de stock para agregar)
      await createEgreso(productos);
      setVentaExitosa(true);
      toggleModalEgreso();
      setProductos([{ productoNombre: '', cantidad: '' }]);
      Swal.fire({
        icon: 'success',
        title: 'Gasto registrado',
        text: 'El gasto se ha registrado correctamente.',
      }).then(() => {
        window.location.reload(); // Refresca la página después del éxito
      });
    } catch (error) {
      console.error('Error al crear el egreso:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar el gasto.',
      });
    }
  };
  



  // Función para formatear números como pesos colombianos
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0, // Sin decimales si no son necesarios
    }).format(amount);
  };

  // Función para calcular la suma de los ingresos
  const calcularIngresosTotales = () => {
    return ingresos.reduce((total, ingreso) => total + ingreso.total, 0);
  };

  // Función para calcular la suma de los egresos
  const calcularEgresosTotales = () => {
    return egresos.reduce((total, egreso) => total + egreso.total, 0);
  };

  // Función para calcular el balance general
  const calcularBalanceGeneral = () => {
    return calcularIngresosTotales() - calcularEgresosTotales();
  };

  // Ordena los ingresos por fecha (más reciente primero)
  const ordenarIngresosPorFecha = () => {
    return ingresos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  };

  // Ordena los egresos por fecha (más reciente primero)
  const ordenarEgresosPorFecha = () => {
    return egresos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  };

  return (
    <div className="container">
      <div className="main-content">
        {/* Botones para mostrar modales */}
        <div className="buttonDiv">
          <button className="button button-green" onClick={toggleModalVenta} disabled={noHayProductos}>
            Nueva Venta
          </button>
          <button className="button button-red" onClick={toggleModalEgreso}>
            Nuevo Egreso
          </button>
        </div>

        {/* Cajitas de balance */}
        <div className="dashboard-card">
          <div className="balance-row">
            <div className="balance-item">
            <MdAttachMoney className='icon-balance'/>
              <h3>Balance General</h3>
              <p>{formatCurrency(calcularBalanceGeneral())}</p>
            </div>
            <div className="balance-item">
              <IoMdTrendingUp className='icon-ingreso' />
              <h3>Ingresos Totales</h3>
              <p className='price-ingresos'>{formatCurrency(calcularIngresosTotales())}</p>
            </div>
            <div className="balance-item">
              <PiTrendDownBold className='icon-egreso'/>
              <h3>Egresos Totales</h3>
              <p className='price-egresos'>{formatCurrency(calcularEgresosTotales())}</p>
            </div>
          </div>
        </div>

        {/* Botones para ver ingresos y egresos */}
        <div className="acciones-balance">
          <button className="btn-ingresos" onClick={cargarIngresos}>
            Ver Ingresos
          </button>
          <button className="btn-egresos" onClick={cargarEgresos}>
            Ver Egresos
          </button>
        </div>

        {/* Tabla de ingresos */}
        {mostrarIngresos && (
          <div className="tabla-ingresos">
            <h2>Ingresos</h2>
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ingresos.length === 0 ? (
                  <tr>
                    <td colSpan="4">No hay ingresos registrados</td>
                  </tr>
                ) : (
                  ordenarIngresosPorFecha().map((ingreso, index) => (
                    <tr key={index}>
                      <td>{new Date(ingreso.fecha).toLocaleDateString()}</td>
                      <td>{ingreso.productoNombre}</td>
                      <td>{ingreso.cantidad}</td>
                      <td>{formatCurrency(ingreso.total)}</td>
                      <td className="buttons">
                        <button className="deletee" onClick={() => handleEliminarIngreso(ingreso.id)}>
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabla de egresos */}
        {mostrarEgresos && (
          <div className="tabla-egresos">
            <h2>Egresos</h2>
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
              {egresos.length === 0 ? (
                <tr>
                  <td colSpan="4">No hay egresos registrados</td>
                </tr>
              ) : (
                ordenarEgresosPorFecha().map((egreso, index) => (
                  <tr key={index}>
                    <td>{new Date(egreso.fecha).toLocaleDateString()}</td>
                    <td>{egreso.productoNombre}</td>
                    <td>{egreso.cantidad}</td>
                    <td>{formatCurrency(egreso.total)}</td>
                    <td className="buttons">
                      <button 
                        className="deletee" 
                        onClick={() => handleEliminarEgreso(egreso.id)} // Eliminar el egreso correspondiente
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              )}

              </tbody>
            </table>
          </div>
        )}

        {/* Modales para Nueva Venta y Nuevo Egreso */}
        {isModalVentaOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-button" onClick={toggleModalVenta}>
                X
              </button>
              <h2>Nueva Venta</h2>
              <form onSubmit={handleVentaSubmit}>
                <div>
                  {productos.map((producto, index) => (
                    <div key={index} className="producto-fields">
                      <label>Nombre del Producto</label>
                      <select className='category'
                        value={producto.productoNombre}
                        onChange={(e) => handleProductoChange(index, 'productoNombre', e.target.value)}
                        required
                      >
                        <option value="" className='select'>Seleccione un producto</option>
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
                        type="number"
                        value={producto.cantidad}
                        onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                        required
                      />
                      {index > 0 && (
                        <button type="button" className='delete' onClick={() => handleRemoveProducto(index)}>
                          Eliminar Producto
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" className='add' onClick={handleAddProducto}>
                  Agregar Otro Producto
                </button>
                <button type="submit" className='sell'>Registrar Venta</button>
              </form>
            </div>
          </div>
        )}

        {/* Modales para Nuevo Egreso */}
        {isModalEgresoOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-button" onClick={toggleModalEgreso}>
                X
              </button>
              <h2>Nuevo Gasto</h2>
              <form onSubmit={handleEgresoSubmit}>
                <div>
                  {productos.map((producto, index) => (
                    <div key={index} className="producto-fields">
                      <label>Nombre del Producto</label>
                      <select
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
                        type="number"
                        value={producto.cantidad}
                        onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                        required
                      />
                      {index > 0 && (
                        <button type="button" onClick={() => handleRemoveProducto(index)} className='delete'>
                          Eliminar Producto
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" className='add' onClick={handleAddProducto}>
                  Agregar Otro Producto
                </button>
                <button type="submit" className='sell'>Registrar Gasto</button>
              </form>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default Balance;
