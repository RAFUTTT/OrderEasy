import React, { useEffect, useState } from 'react';
import './Listing.css';

const Listing = () => {
  // Estado para almacenar los productos
  const [products, setProducts] = useState([]);

  // Simulando una llamada para obtener productos (por ejemplo, desde una API)
  useEffect(() => {
    // Simulación de productos
    const fetchedProducts = [
      { id: 1, name: 'Producto A', imageUrl: '' },
      { id: 2, name: 'Producto B', imageUrl: '' },
      { id: 3, name: 'Producto C', imageUrl: '' },
      { id: 4, name: 'Producto D', imageUrl: '' },
      { id: 5, name: 'Producto E', imageUrl: '' },
    ];

    // Establecer productos después de cargarlos (simulación de un fetch)
    setProducts(fetchedProducts);

    // Cleanup (si hubiera algún evento a limpiar)
    return () => {
      // Puedes hacer cleanup de algún listener o evento aquí si fuera necesario
    };
  }, []); // [] para ejecutarse solo al montar el componente

  return (
    <div className='listingSection'>
      <div className="heading">
        <h1>Mi Listado</h1>
      </div>
      <div className="secContainer">
        {products.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          products.map((product) => (
            <div className="singleItem" key={product.id}>
                <div className="imgDiv">
                </div>
              <h3>{product.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Listing;
