import React from "react"

export default function Wishlist() {
    return (
        <div className="d-flex flex-col m-5 bg-dark">
            <div className="card m-5 w-100">
                <div className="card-body d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <img src="./product.jpg" alt="" width="100px" height="100px" />
                    <p>Product name</p>
                </div>
                <div className="d-flex flex-row align-items-center">
                    <form /*id={`increaseQty${cart_item.id}`} method="post" action="{% url 'wishlist' %}"*/>
                    <button type="submit" className="btn btn-dark">Remove</button>
                    </form>
                </div>
                </div>
            </div>
        </div>

    )
}