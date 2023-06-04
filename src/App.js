import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Body from './Body';
import Wishlist from './Wishlist';
import Cart from './Cart';
import Details from './Details';
import ConfirmOrder from './ConfirmOrder';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItemsFromApi, setCartItemsFromApi] = useState([]);
  const [cartItemsState, setCartItemsState] = useState([]);
  const [wishlistItemsState, setWishlistItemsState] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsResponse = await fetch('http://127.0.0.1:8000/api/products/');
      const productsData = await productsResponse.json();
      setProducts(productsData);

      const cartItemsResponse = await fetch('http://127.0.0.1:8000/api/cart-items/');
      const cartItemsData = await cartItemsResponse.json();
      setCartItemsFromApi(cartItemsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const initialCartItemsState = cartItemsFromApi.filter(item => !item.is_wishlist_item);
    const initialWishlistItemsState = cartItemsFromApi.filter(item => item.is_wishlist_item);
    setCartItemsState(initialCartItemsState);
    setWishlistItemsState(initialWishlistItemsState);
  }, [cartItemsFromApi]);
  

  const handleUpdateCartItems = (updatedCartItems) => {
    setCartItemsState(updatedCartItems);
  };
  const handleUpdateWishlistItems = (updatedWishlistItems) => {
    setWishlistItemsState(updatedWishlistItems);
  };

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      const updatedWishlistItems = wishlistItemsState.filter(item => item.id !== itemId);
      setWishlistItemsState(updatedWishlistItems);
  
      await fetch(`http://127.0.0.1:8000/api/cart-items/delete/${itemId}/`, {
        method: 'DELETE',
      });
  
      console.log('Wishlist item deleted successfully.');
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
    }
  };

  const handleAddToCart = (itemId) => {
    const updatedWishlistItems = wishlistItemsState.filter(item => item.id !== itemId);
    setWishlistItemsState(updatedWishlistItems);
  
    const itemToAddToCart = wishlistItemsState.find(item => item.id === itemId);
    if (itemToAddToCart) {
      itemToAddToCart.is_wishlist_item = false;
  
      // Update the cart items state with the item to be added to the cart
      const updatedCartItems = [...cartItemsState, itemToAddToCart];
      setCartItemsState(updatedCartItems);
  
      // Send a request to create the cart item
      fetch('http://127.0.0.1:8000/api/cart-items/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: itemToAddToCart.product,
          quantity: itemToAddToCart.quantity,
          is_wishlist_item: false, // Set the boolean value to false
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response if needed
        })
        .catch(error => {
          console.error('Error adding item to cart:', error);
        });
      }
    };
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Body products={products}/>} />
          <Route path="/details/:id" element={<Details products={products} cartItemsState={cartItemsState} handleUpdateCartItems={handleUpdateCartItems} wishlistItemsState={wishlistItemsState} handleUpdateWishlistItems={handleUpdateWishlistItems}/>} />
          <Route path="/wishlist" element={<Wishlist wishlistItems={wishlistItemsState} onRemoveFromWishlist={handleRemoveFromWishlist} onAddToCart={handleAddToCart}/>} />
          <Route path="/cart" element={<Cart cartItems={cartItemsState} onUpdateCartItems={handleUpdateCartItems} />} />
          <Route path="/confirmOrder" element={<ConfirmOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
