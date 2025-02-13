// src/components/ClientPanel.js
import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import ProductCatalog from './ProductCatalog';
import Notifications from './Notifications';
import { listCategories } from '../services/CategoryServices';
import { useNavigate } from 'react-router-dom';

const defaultCategories = [
  {
    name: 'Juguetes Educativos',
    products: [
      { id: 1, name: 'Rompecabezas', description: 'Rompecabezas de madera', price: 19.99, image: require('../assets/images/productos/Educativos/rompecabezas.png') },
      { id: 2, name: 'Juego de Química', description: 'Kit de experimentos', price: 39.99, image: require('../assets/images/productos/Educativos/quimica.png') },
    ],
  },
];
const getImagePath = (image) => {
  try {
    return require(`../assets/images/productos/${image}`);
  } catch (err) {
    console.error(`Error loading image: ${image}`, err);
    return image.startsWith('http') ? image : null;
  }
};

const ClientPanel = ({ user, onLogout }) => {
  const { selectedProducts, setSelectedProducts, productsToFabricate, setProductsToFabricate } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategories[0].name);
  const navigate = useNavigate();

  useEffect(() => {
    listCategories()
      .then((response) => {
        const apiCategories = response.data.map(category => {
          const products = category.toys.map(toy => ({
            id: toy.id,
            name: toy.name,
            description: toy.description,
            price: toy.price,
            image: getImagePath(toy.image),
          }));
          return { name: category.name, products };
        });
        setCategories([...defaultCategories, ...apiCategories]);
      })
      .catch(error => {
        console.error("API error:", error);
        setCategories(defaultCategories);
      });
  }, []);

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleAddProduct = (product) => {
    setSelectedProducts(prevProducts => {
      const existingProduct = prevProducts.find(p => p.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity < 5) {
          return prevProducts.map(p =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
        } else {
          alert("Cantidad máxima de este producto alcanzada.");
          return prevProducts;
        }
      } else {
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  };

  const handleIncrement = (product) => {
    setSelectedProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity < 5 ? p.quantity + 1 : p.quantity } : p
      )
    );
    if (product.quantity >= 5) {
      alert("Cantidad máxima de este producto alcanzada.");
    }
  };

  const handleDecrement = (product) => {
    setSelectedProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : 1 } : p
      )
    );
  };

  const handleLogoutAndClear = () => {
    setSelectedProducts([]);
    onLogout();
    navigate('/');
  };

  const handleFabricate = () => {
    setProductsToFabricate(prev => [...prev, ...selectedProducts]);
    setSelectedProducts([]);
    alert("La lista de productos ha sido guardada para su fabricación.");
  };

  const selectedCategoryProducts = categories.find(category => category.name === selectedCategory)?.products || [];

  return (
    <div>
      {/* Contenedor superior fuera del panel principal */}
      <div className="d-flex justify-content-between align-items-center p-3 mb-4" style={{ backgroundColor: '#ffffff', borderRadius: '5px' }}>
        <h2 className="mb-0" style={{ color: '#007bff' }}>Bienvenido, {user}</h2>
        <button className="btn btn-danger" onClick={handleLogoutAndClear}>Cerrar Sesión</button>
      </div>

      {/* Panel principal del cliente */}
      <div className="client-panel">
        <Navbar 
          categories={categories} 
          onSelectCategory={handleSelectCategory} 
          selectedCategory={selectedCategory}
        />
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-8">
              <ProductCatalog products={selectedCategoryProducts} onAddProduct={handleAddProduct} />
            </div>
            <div className="col-md-4">
              <Notifications 
                products={selectedProducts} 
                onIncrement={handleIncrement} 
                onDecrement={handleDecrement} 
                onFabricate={handleFabricate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPanel;
