import React, { useState, useEffect } from "react";
import './inventario.css';
import CrearProducto from './Formularios/CrearProducto';
import CrearCategoria from './Formularios/CrearCategoria';
import { getProducts, updateProduct, deleteProduct } from '../../../../../api/productService';
import { getCategories } from '../../../../../api/categoryService';
import Swal from 'sweetalert2';

const Inventario = () => {
  const [isModalProductoOpen, setIsModalProductoOpen] = useState(false);
  const [isModalCategoriaOpen, setIsModalCategoriaOpen] = useState(false);
  const [modalClass, setModalClass] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProduct, setEditableProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const toggleModalProducto = () => {
    setIsModalProductoOpen(!isModalProductoOpen);
    setModalClass(isModalProductoOpen ? 'slide-out' : 'slide-in');
  };

  const toggleModalCategoria = () => {
    setIsModalCategoriaOpen(!isModalCategoriaOpen);
    setModalClass(isModalCategoriaOpen ? 'slide-out' : 'slide-in');
  };

  const handleProductoSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del producto enviados a la BD");
    toggleModalProducto();
  };

  const handleCategoriaSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de la categoría enviados a la BD");
    toggleModalCategoria();
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setEditableProduct(product);
    setIsEditing(false);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

const handleDeleteClick = async () => {
    Swal.fire({
        title: `¿Estás seguro de que deseas eliminar el producto "${selectedProduct.nombre}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await deleteProduct(selectedProduct.nombre); // Usamos nombre en lugar de id
                setProducts(products.filter((product) => product.nombre !== selectedProduct.nombre)); // Filtramos usando el nombre
                closeProductDetails();
                console.log("Producto eliminado");
                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                    text: `El producto "${selectedProduct.nombre}" ha sido eliminado con éxito.`,
                });
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el producto. Por favor, inténtalo de nuevo más tarde.'
                });
            }
        }
    });
};

  const handleSaveChanges = async () => {
    try {
      // Aquí usamos el nombre original de selectedProduct para hacer la consulta
      console.log("Producto a actualizar:", editableProduct); // Verifica que editableProduct tiene los datos correctos
  
      // Realizamos la consulta con el nombre original (nombre de selectedProduct)
      const productToUpdate = { ...editableProduct }; // Creamos una copia de editableProduct para evitar que se edite mientras hacemos la consulta.
  
      // Hacemos la consulta usando el nombre original de selectedProduct
      await updateProduct(selectedProduct.nombre, productToUpdate);
  
      // Ahora que el producto ha sido actualizado, lo actualizamos en el estado
      setProducts(products.map(product => 
        product.nombre === selectedProduct.nombre ? productToUpdate : product
      ));
  
      setIsEditing(false);
      setSelectedProduct(productToUpdate);
  
      console.log("Producto actualizado");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableProduct(selectedProduct);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct({ ...editableProduct, [name]: value });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.categoriaNombre === selectedCategory : true;
    const matchesSearchTerm = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="main-content">
      <div className="top-bar">
        <button className="create-product" onClick={toggleModalProducto}>
          Crear Producto
        </button>
        
        <div className="search-bar">
          <button className="create-category" onClick={toggleModalCategoria}>
            Crear Categoria
          </button>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Todas las categorias</option>
            {categories.map(category => (
              <option key={category.id} value={category.nombre}>
                {category.nombre}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Buscar Producto"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          filteredProducts.map(product => (
            <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
              <div className="product-image"></div>
              <h3>{product.nombre}</h3>
              <p>Disponibles: {product.cantidad}</p>
            </div>
          ))
        )}
      </div>

      {isModalProductoOpen && (
        <CrearProducto handleSubmit={handleProductoSubmit} toggleModalProducto={toggleModalProducto} />
      )}

      {isModalCategoriaOpen && (
        <CrearCategoria handleSubmit={handleCategoriaSubmit} toggleModalCategoria={toggleModalCategoria} />
      )}

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeProductDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              {isEditing ? (
                <input
                  type="text"
                  name="nombre"
                  value={editableProduct.nombre}
                  onChange={handleInputChange}
                />
              ) : (
                selectedProduct.nombre
              )}
            </h2>
            <p><strong>Descripción:</strong> {isEditing ? (
              <input
                type="text"
                name="descripcion"
                value={editableProduct.descripcion}
                onChange={handleInputChange}
              />
            ) : (
              selectedProduct.descripcion
            )}</p>
            <p><strong>Cantidad:</strong> {isEditing ? (
              <input
                type="number"
                name="cantidad"
                value={editableProduct.cantidad}
                onChange={handleInputChange}
              />
            ) : (
              selectedProduct.cantidad
            )}</p>
            <p><strong>Precio de compra:</strong> {isEditing ? (
              <input
                type="number"
                name="precioDeCompra"
                value={editableProduct.precioDeCompra}
                onChange={handleInputChange}
              />
            ) : (
              selectedProduct.precioDeCompra
            )}</p>
            <p><strong>Precio de venta:</strong> {isEditing ? (
              <input
                type="number"
                name="precioDeVenta"
                value={editableProduct.precioDeVenta}
                onChange={handleInputChange}
              />
            ) : (
              selectedProduct.precioDeVenta
            )}</p>
            <p><strong>Categoría:</strong> {isEditing ? (
              <select
                name="categoriaNombre"
                value={editableProduct.categoriaNombre}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.nombre}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            ) : (
              selectedProduct.categoriaNombre
            )}</p>

            {!isEditing && (
              <>
                <button onClick={handleEditClick}>Editar</button>
                <button onClick={handleDeleteClick}>Eliminar</button>
              </>
            )}

            {isEditing && (
              <>
                <button onClick={handleSaveChanges}>Guardar</button>
                <button onClick={handleCancelEdit}>Cancelar</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventario;
