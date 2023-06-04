import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios"

export default function Details({ products, cartItemsState, wishlistItemsState, handleUpdateCartItems, handleUpdateWishlistItems}) {
    let { id } = useParams();
    let product = products.find((product) => product.id === Number(id));
    
    //when the page gets reloaded
    useEffect(() => {
      // Fetch or load the product data based on the ID
      const fetchedProduct = products.find((product) => product.id === Number(id));
      product = fetchedProduct;
    }, [products, id]);
    if (!product) {
      return <><div className='h2 m-5'>Product Not Found</div>
      <Link className="text-decoration-none" to="/">
      <button className="btn btn-dark m-2" type="button">
        Go to Home Page
      </button>
    </Link></>;
      
    }  

    const cartItems = cartItemsState
    const wishlistItems = wishlistItemsState
    
    const handleAddToCart = () => {
      const newCartItem = {
        product: product,
        quantity: 1,
        is_wishlist_item: false,
      };
      const updatedCartItems = [...cartItems, newCartItem];
      handleUpdateCartItems(updatedCartItems);
  
      
      axios.post('http://127.0.0.1:8000/api/cart-items/add/', newCartItem, {
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
      handleUpdateWishlistItems(updatedWishlistItems)

      axios.post('http://127.0.0.1:8000/api/cart-items/add/', newWishlistItem)
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
      <div className="d-flex flex-column flex-wrap m-5 bg-dark align-items-center rounded-2" style={{ minHeight: '82vh' }}>
        <img src={require(`${product.image_path}`)} className="rounded-2 m-5 mb-4" width="500px" height="500px" alt=""/>
        <div className="d-flex flex-row flex-wrap">
          <p className="mx-5 text-white h5">{product.name}</p>
          <p className="mx-5 text-white h5">${product.price}</p>
        </div>
        <p className="text-white mt-3 p-3 border border-white" style={{ width : '30vw' }}>{product.description}</p>
        <form>
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-row my-3">
              <Link className="text-decoration-none" to="/cart">
                <button className="btn btn-light mx-2" type="button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </Link>
              <button className="btn btn-light mx-2" type="button" onClick={handleAddToWishlist}>
                <img src={require(`./images/heart.png`)} alt="" width="25px" height="25px" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}