import React from "react"

export default function Cart() {
    return (
        <div className="d-flex flex-col m-5 bg-dark">
            <div className="card m-5 w-100">
                <div className="card-body d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <img src="./product.jpg" alt="" width="100px" height="100px" />
                        <p>name</p>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <form /*id={`decreaseQty${cart_item.id}`} method="post" action="{% url 'cart' %}"*/>
                        <button type="submit" className="btn btn-dark">-</button>
                        </form>
                        <p>00</p>
                        <form /*id={`increaseQty${cart_item.id}`} method="post" action="{% url 'cart' %}"*/>
                        <button type="submit" className="btn btn-dark">+</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}