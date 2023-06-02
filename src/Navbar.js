import React from "react"
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <div>
            <nav className="navbar bg-body-tertiary bg-dark" style={{ height: '8vh' }}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start" style={{ marginLeft: '46vw' }}>
                    <Link className="navbar-brand text-white" to="/">Product List</Link>
                </div>
                <div>
                    <Link className="navbar-brand text-white" to="/wishlist">Wishlist</Link>
                    <Link className="navbar-brand text-white" to="/cart">Cart</Link>
                </div>
                </div>
            </nav>
        </div>

    )
}