import React from "react"


export default function Navbar() {
    return (
        <div>
            <nav class="navbar bg-body-tertiary bg-dark">
                <div class="container-fluid">
                <a class="navbar-brand text-white" href="#">
                Product Listing
                </a>
                    <div>
                        <a class="navbar-brand text-white" href="#">
                            Cart
                        </a>
                        <a class="navbar-brand text-white" href="#">
                            Wishlist
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}