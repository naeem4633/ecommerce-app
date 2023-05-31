import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Body from './Body';
import Wishlist from './Wishlist';
import Cart from './Cart';
import Details from './Details';
import ConfirmOrder from './ConfirmOrder';
import products from './products';
import cartItems from './cartItems';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const initialCartItemsState = cartItems.filter(item => !item.is_wishlist_item);
    const initialWishlistItemsState = cartItems.filter(item => item.is_wishlist_item);
  
    const [cartItemsState, setCartItemsState] = useState(initialCartItemsState);
    const [wishlistItemsState, setWishlistItemsState] = useState(initialWishlistItemsState);
  

  const handleUpdateCartItems = (updatedCartItems) => {
    setCartItemsState(updatedCartItems);
  };

  const handleRemoveFromWishlist = (itemId) => {
    const updatedWishlistItems = wishlistItemsState.filter(item => item.id !== itemId);
    setWishlistItemsState(updatedWishlistItems);
  };

  const handleAddToCart = (itemId) => {
    const updatedWishlistItems = wishlistItemsState.filter(item => item.id !== itemId);
    setWishlistItemsState(updatedWishlistItems);

    const itemToAddToCart = wishlistItemsState.find(item => item.id === itemId);
    if (itemToAddToCart) {
      console.log('Before adding to cart:', cartItemsState);
      console.log('Item to add:', itemToAddToCart);

      const updatedCartItems = [...cartItemsState, itemToAddToCart];
      setCartItemsState(updatedCartItems);

      console.log('After adding to cart:', updatedCartItems);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Body products={products}/>} />
          <Route path="/wishlist" element={<Wishlist wishlistItems={wishlistItemsState} onRemoveFromWishlist={handleRemoveFromWishlist} onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItemsState} onUpdateCartItems={handleUpdateCartItems} />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/confirmOrder" element={<ConfirmOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
