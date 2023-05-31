import React from 'react';
import { Link } from 'react-router-dom';
import productImage from './product.jpg';
import heartImage from './heart.png';
import { useParams } from 'react-router-dom';
import products from './products';
import importedCartItems from './cartItems';

export default function Details() {
    const { id } = useParams();
    const product = products.find((product) => product.id === Number(id));
  
    const cartItems = importedCartItems.filter(item => !item.is_wishlist_item);
    const wishlistItems = importedCartItems.filter(item => item.is_wishlist_item);
  
    const handleAddToCart = () => {
      const newCartItem = {
        id: cartItems.length + 1, // Generate a unique ID for the new cart item
        product: product,
        quantity: 1,
        is_wishlist_item: false,
      };
  
      // Update the cartItems state with the new cart item
      const updatedCartItems = [...cartItems, newCartItem];
      console.log('Updated Cart Items:', updatedCartItems);
      // Perform any necessary actions with the updated cart items, such as saving to backend or local storage
    };
  
    const handleAddToWishlist = () => {
      const newCartItem = {
        id: cartItems.length + 1, // Generate a unique ID for the new cart item
        product: product,
        quantity: 1,
        is_wishlist_item: true,
      };
  
      // Update the cartItems state with the new cart item
      const updatedCartItems = [...cartItems, newCartItem];
      console.log('Updated Cart Items:', updatedCartItems);
      // Perform any necessary actions with the updated cart items, such as saving to backend or local storage
    };

  return (
    <>
      <div class="d-flex flex-column flex-wrap m-5 bg-dark align-items-center">
        <img src={productImage} class="img-fluid m-5" width="500px" height="500px" alt="Responsive image" />
        <div class="d-flex flex-row flex-wrap">
          <p class="mx-5 text-white">{product.name}</p>
          <p class="mx-5 text-white">$ {product.price}</p>
        </div>
        <p class="text-white">{product.description}</p>
        <form>
          <div class="d-flex flex-column align-items-center">
            <div class="d-flex flex-row mb-3">
              <Link class="text-decoration-none" to="/cart">
                <button class="btn btn-light mx-2" type="button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </Link>
              <button class="btn btn-light mx-2" type="button" onClick={handleAddToWishlist}>
                <img src={heartImage} alt="" width="25px" height="25px" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
