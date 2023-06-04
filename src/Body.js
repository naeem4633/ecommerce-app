import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Body({ products }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(); // Make a copy of the filtered products

  if (sortBy === "low_to_high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high_to_low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  
  return (
    <>
      <div className="d-flex justify-content-between my-3 mx-5">
        <div className="dropdown">
          <button
            className="btn dropdown-toggle btn-white"
            type="button"
            id="filterDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={require(`./images/filter-image.png`)} alt="" width="25px" height="25px" />
          </button>
          <ul className="dropdown-menu bg-dark" aria-labelledby="filterDropdown">
            <li>
              <button
                className="dropdown-item text-white"
                onClick={handleSort}
                value="low_to_high"
              >
                Price: Low to high
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-white"
                onClick={handleSort}
                value="high_to_low"
              >
                Price: High to low
              </button>
            </li>
          </ul>
        </div>
        <form className="d-flex">
          <input
            className="form-control me-2 border-2 border-back"
            name="q"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="btn btn-dark" type="button">
            Search
          </button>
        </form>
      </div>
      <div className="d-flex flex-wrap justify-content-around mx-5 bg-dark">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/details/${product.id}`} className="text-decoration-none">
            <div className="card m-5 border border-dark" style={{ width: "400px" }}>
              <img src={require(`${product.image_path}`)} className="card-img-top w-100" alt=""/>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{product.name}</h5>
                  <p>${product.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
