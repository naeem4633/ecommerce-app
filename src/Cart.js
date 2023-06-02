import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart({ cartItems, onUpdateCartItems }) {
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  const calculateCartTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.product.price * item.quantity;
    });
    setCartTotal(total);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity <= 0) {
          // Remove the item from the cart
          fetch(`http://127.0.0.1:8000/cart-items/delete/${itemId}/`, {
            method: 'DELETE',
          })
            .then(response => {
              if (response.ok) {
                // Remove the item from the cart items state
                const filteredCartItems = cartItems.filter(item => item.id !== itemId);
                onUpdateCartItems(filteredCartItems);
              } else {
                throw new Error('Error deleting wishlist item');
              }
            })
            .catch(error => {
              console.error('Error deleting wishlist item:', error);
            });
          return null;
        } else {
          return {
            ...item,
            quantity: updatedQuantity
          };
        }
      }
      return item;
    });
  
    // Remove null values (items with quantity zero) from the updatedCartItems
    const filteredCartItems = updatedCartItems.filter(item => item !== null);
    onUpdateCartItems(filteredCartItems);
  };


  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });

    onUpdateCartItems(updatedCartItems);
  };

  const handleConfirmOrder = () => {
    const itemNames = cartItems.map(item => item.product.name).join(",");
    const quantities = cartItems.map(item => item.quantity).join(",");
    const prices = cartItems.map(item => item.product.price).join(",");
    const totalPrice = cartTotal;

    const queryParams = new URLSearchParams({
      names: itemNames,
      quantities: quantities,
      prices: prices,
      totalPrice: totalPrice
    });

    navigate(`/confirmOrder?${queryParams.toString()}`);
  };

  return (
    <>
      <div className="d-flex m-5 bg-dark flex-column rounded-2">
        <div className="d-flex flex-wrap justify-content-center rounded-2">
          {cartItems.map(item => (
            <div key={item.id} className="card m-5" style={{ width: '45vw' }}>
              <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <img className="rounded-2" src={item.product.image_path} alt="" width="100px" height="100px" />
                  <p className="m-3 h5">{item.product.name}</p>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <form>
                    <button type="button" className="btn btn-dark" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  </form>
                  <p className="m-3 h5 pb-1">{item.quantity}</p>
                  <form>
                    <button type="button" className="btn btn-dark" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-between m-5 border border-dark bg-white rounded-2" style={{ width: '25%' }}>
              <p className="m-3 fw-bold">Cart Total: ${cartTotal}</p>
              <button className="btn btn-dark m-2" onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
          </div>
      </div>
    </>

  );
}
