import React, { useState, useEffect } from "react";
import './inventario.css';
import CrearProducto from './Formularios/CrearProducto';
import CrearCategoria from './Formularios/CrearCategoria';
import { getProducts, updateProduct, deleteProduct } from '../../../../../api/productService';
import { getCategories, deleteCategory, updateCategory } from '../../../../../api/categoryService';
import Swal from 'sweetalert2';

const Inventario = () => {
  const [isModalProductoOpen, setIsModalProductoOpen] = useState(false);
  const [isModalCategoriaOpen, setIsModalCategoriaOpen] = useState(false);
  const [modalClass, setModalClass] = useState('');
  const [isGestionarCategoriaOpen, setIsGestionarCategoriaOpen] = useState(false);
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
        // Si hay una categoría seleccionada, buscamos sus detalles y los seteamos
        if (selectedCategory) {
          const selectedCategoryDetails = response.data.find(
            (category) => category.nombre === selectedCategory
          );
          setSelectedCategoryDetails(selectedCategoryDetails);
        }
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
  
    fetchProducts();
    fetchCategories();
  }, [selectedCategory]); // Se vuelve a ejecutar cuando cambia selectedCategory
  

  const toggleModalProducto = () => {
    setIsModalProductoOpen(!isModalProductoOpen);
    setModalClass(isModalProductoOpen ? 'slide-out' : 'slide-in');
  };

  const toggleModalCategoria = () => {
    setIsModalCategoriaOpen(!isModalCategoriaOpen);
    setModalClass(isModalCategoriaOpen ? 'slide-out' : 'slide-in');
  };
  const toggleGestionarCategoria = () => {
    setIsGestionarCategoriaOpen(!isGestionarCategoriaOpen);
  };

  const selectedCategoryDetails = categories.find(
    (category) => category.nombre === selectedCategory
  );

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

      // SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Producto actualizado!',
        text: 'Los cambios se han guardado correctamente.',
        confirmButtonText: 'Aceptar'
      });

      console.log("Producto actualizado");
    } catch (error) {
      // SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el producto.',
        confirmButtonText: 'Aceptar'
      });

      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableProduct(selectedProduct);
  };

  // Función para manejar la eliminación de la categoría
  const handleDeleteCategory = async () => {
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar la categoría "${selectedCategory}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Llamamos a la API para eliminar la categoría usando el nombre de la categoría seleccionada
          await deleteCategory(selectedCategory);

          // Actualizamos el estado de categorías para eliminar la categoría seleccionada
          setCategories(categories.filter((category) => category.nombre !== selectedCategory));

          // Restablecer el estado de categoría seleccionada
          setSelectedCategory('');

          // Notificación de éxito
          Swal.fire({
            icon: 'success',
            title: 'Categoría eliminada',
            text: `La categoría "${selectedCategory}" ha sido eliminada con éxito.`,
          });
        } catch (error) {
          console.error("Error al eliminar la categoría:", error);
          // Notificación de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar la categoría. Por favor, inténtalo de nuevo más tarde.',
          });
        }
      }
    });
  };

  const handleSaveCategoryChanges = async () => {
    try {
      const updatedCategory = { ...selectedCategoryDetails };
      
      // Realizar la llamada a la API para actualizar la categoría
      await updateCategory(updatedCategory.nombre, updatedCategory);
      
      // Actualizar la lista de categorías en el estado
      setCategories(categories.map((category) =>
        category.nombre === selectedCategoryDetails.nombre ? updatedCategory : category
      ));
  
      // Cerrar el modo de edición
      setIsEditing(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Categoría actualizada',
        text: 'Los cambios se han guardado correctamente.',
      });
  
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar la categoría. Intenta nuevamente más tarde.',
      });
    }
  };
  

  const handleInputChangeCategory = (e) => {
    const { name, value } = e.target;
    // Crear una copia del objeto para evitar mutaciones directas
    const updatedCategoryDetails = { ...selectedCategoryDetails };
    updatedCategoryDetails[name] = value;
    setSelectedCategoryDetails(updatedCategoryDetails);
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
          <button className="create-category" onClick={toggleGestionarCategoria}>Gestionar Categoria</button>
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

      {isGestionarCategoriaOpen && (
        <div className="modal-overlay" onClick={toggleGestionarCategoria}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Gestionar Categoría</h2>
            <select value={selectedCategory} onChange={handleCategoryChange} disabled={isEditing}>
              <option value="">Seleccionar Categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.nombre}>
                  {category.nombre}
                </option>
              ))}
            </select>
            {selectedCategoryDetails ? (
              <div className="category-details">
                {isEditing ? (
                  <>
                  <label>
                    <strong>Nombre:</strong>
                    <input
                      type="text"
                      name="nombre"
                      value={selectedCategoryDetails.nombre}
                      onChange={handleInputChangeCategory}
                    />
                  </label>
                  <label>
                    <strong>Descripción:</strong>
                    <input
                      type="text"
                      name="descripcion"
                      value={selectedCategoryDetails.descripcion}
                      onChange={handleInputChangeCategory}
                    />
                  </label>
                </>
                ) : (
                <>
                  <p><strong>Nombre:</strong> {selectedCategoryDetails.nombre}</p>
                  <p><strong>Descripción:</strong> {selectedCategoryDetails.descripcion}</p>
                </>
                )
              }
              </div>
            ) : (
              <p>Selecciona una categoría para ver sus detalles.</p>
            )}

            {isEditing ? (
              // Botones en modo de edición
              <>
                <button className="update" onClick={handleSaveCategoryChanges}>Guardar</button>
                <button className="cancel" onClick={() => setIsEditing(false)}>
                  Cancelar
                </button>
              </>
            ) : (
              // Botones en modo normal
              <>
                {selectedCategory && (
                  <button className="update" onClick={() => setIsEditing(true)}>
                    Editar
                  </button>
                )}
                {selectedCategory && (
                  <button className="delete" onClick={handleDeleteCategory}>
                    Eliminar
                  </button>
                )}
              </>
            )}

            <button className="delete" onClick={toggleGestionarCategoria}>
              Cerrar
            </button>
          </div>
        </div>
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
                <button onClick={handleEditClick} className="edit">Editar</button>
                <button onClick={handleDeleteClick} className="delete">Eliminar</button>
              </>
            )}

            {isEditing && (
              <>
                <button onClick={handleSaveChanges} className="add">Guardar</button>
                <button onClick={handleCancelEdit} className="delete">Cancelar</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventario;
