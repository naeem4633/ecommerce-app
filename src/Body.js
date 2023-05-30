import React from "react";

export default function Body() {
  return (
    <>
      <div className="d-flex justify-content-between my-3 mx-5">
        <form action="{% url 'index' %}" method="post">
          <div className="dropdown">
            <a className="btn dropdown-toggle btn-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="./filter-image.png" alt="" width="25px" height="25px" />
            </a>
            <label htmlFor="sort-by"></label>
            <ul className="dropdown-menu" name="sort-by" id="sort-by">
              <li>
                <button className="dropdown-item" name="sort-by" value="low_to_high" type="submit">Price: Low to high</button>
              </li>
              <li>
                <button className="dropdown-item" name="sort-by" value="high_to_low" type="submit">Price: High to low</button>
              </li>
            </ul>
          </div>
        </form>
        <form className="d-flex" role="search" action="post" method="post">
          <input className="form-control me-2" name="q" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-dark" type="submit">Search</button>
        </form>
      </div>
      <div className="d-flex flex-wrap justify-content-around mx-5 bg-dark">
        <div className="card m-5 border border-dark" style={{ width: "18rem" }}>
          <img src="./product.jpg" className="card-img-top" alt="" />
          <div className="card-body">
            <a href="#" className="text-decoration-none text-black">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">name</h5>
                <p>$price</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}