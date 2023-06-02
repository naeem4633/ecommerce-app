import React from "react";

export default function Wishlist({ wishlistItems, onRemoveFromWishlist, onAddToCart }) {
  const handleRemoveItemClick = (itemId) => {
    onRemoveFromWishlist(itemId);
  };

  const handleAddToCartClick = (itemId) => {
    onAddToCart(itemId);
  };

  return (
    <div className="d-flex m-5 bg-dark flex-column rounded-2">
      <div className="d-flex flex-wrap justify-content-center">
        {wishlistItems.map(item => (
        <div key={item.id} className="card m-5" style={{ width: 'calc(50% - 20px)' }}>
          <div className="card-body d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <img className="rounded-2" src={item.product.image_path}/*{item.product.image}*/ alt="" width="100px" height="100px" />
              <p className="m-3 h5">{item.product.name}</p>
            </div>
            <div className="d-flex flex-row align-items-center">
              <button type="button" className="btn btn-dark mx-2" onClick={() => handleRemoveItemClick(item.id)}>Remove</button>
              <button type="button" className="btn btn-dark mx-2" onClick={() => handleAddToCartClick(item.id)}>Add to Cart</button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
