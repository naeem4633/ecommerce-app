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
      <div className="d-flex flex-col m-5 bg-dark">
        {cartItems.map(item => (
          <div key={item.id} className="card m-5 w-100">
            <div className="card-body d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img src={item.product.image} alt="" width="100px" height="100px" />
                <p>{item.product.name}</p>
              </div>
              <div className="d-flex flex-row align-items-center">
                <form>
                  <button type="button" className="btn btn-dark" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                </form>
                <p>Quantity: {item.quantity}</p>
                <form>
                  <button type="button" className="btn btn-dark" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between flex-row m-5 border border-dark">
        <p>Cart Total: ${cartTotal}</p>
        <button className="btn btn-dark" onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
    </>
  );
}
