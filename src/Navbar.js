import React from "react"
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <div>
            <nav class="navbar bg-body-tertiary bg-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand text-white" to="/">Home</Link>
                    <div>
                    <Link class="navbar-brand text-white" to="/wishlist">Wishlist</Link>
                    <Link class="navbar-brand text-white" to="/cart">Cart</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}