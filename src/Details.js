import React from 'react';
import { Link } from 'react-router-dom';
import heartImage from './heart.png';
import productImage from './product.jpg';
import { useParams } from 'react-router-dom';
import axios from "axios"

export default function Details({ products, cartItemsState, wishlistItemsState }) {
    let { id } = useParams();
    const product = products.find((product) => product.id === Number(id));
    
    const cartItems = cartItemsState
    const wishlistItems = wishlistItemsState
  
    const handleAddToCart = () => {
      const newCartItem = {
        product: product,
        quantity: 1,
        is_wishlist_item: false,
      };
      const updatedCartItems = [...cartItems, newCartItem];
      console.log('Updated Cart Items:', updatedCartItems);

      axios.post('http://127.0.0.1:8000/cart-items/add/', newCartItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          // Handle the response if needed
          console.log('Created Cart Item:', response.data);
          // Perform any necessary actions with the response data
        })
        .catch(error => {
          console.error('Error adding item to cart:', error);
        });
    };
    
    const handleAddToWishlist = () => {
      const newWishlistItem = {
        product: product,
        quantity: 1,
        is_wishlist_item: true,
      };
      // Update the cartItems state with the new cart item(a wishlist item, is_wishlist_item set to true)
      const updatedWishlistItems = [...wishlistItems, newWishlistItem];
      console.log('Updated Cart Items:', updatedWishlistItems);

      axios.post('http://127.0.0.1:8000/cart-items/add/', newWishlistItem)
        .then(response => {
          // Handle the response if needed
          console.log('Created Wishlist Item:', response.data);
          // Perform any necessary actions with the response data
        })
        .catch(error => {
          console.error('Error adding item to wishlist:', error);
        });
    };
    
  
  return (
    <>
      <div className="d-flex flex-column flex-wrap m-5 bg-dark align-items-center">
        <img src={productImage} className="m-5" width="500px" height="500px" alt=""/>
        <div className="d-flex flex-row flex-wrap">
          <p className="mx-5 text-white">{product.name}</p>
          <p className="mx-5 text-white">$ {product.price}</p>
        </div>
        <p className="text-white">{product.description}</p>
        <form>
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-row mb-3">
              <Link className="text-decoration-none" to="/cart">
                <button className="btn btn-light mx-2" type="button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </Link>
              <button className="btn btn-light mx-2" type="button" onClick={handleAddToWishlist}>
                <img src={heartImage} alt="" width="25px" height="25px" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}