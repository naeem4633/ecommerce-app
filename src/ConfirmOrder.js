import React from "react";
import { useLocation } from "react-router-dom";

export default function ConfirmOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemNames = queryParams.get("names") || "";
  const quantities = queryParams.get("quantities") || "";
  const totalPrice = queryParams.get("totalPrice") || "";
  const prices = queryParams.get("prices") || "";

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card border-top border-bottom border-3 bg-dark" style={{ borderColor: "#f37a27 !important" }}>
                <div className="card-body p-5 text-white">

                  <p className="lead fw-bold mb-5 text-white">Purchase Receipt</p>

                  <div className="row">
                    <div className="col mb-3">
                      <p className="small mb-1">Date</p>
                      <p>{currentDate}</p>
                    </div>
                  </div>

                  <div className="mx-n5 px-5 py-4 text-dark fw-bold" style={{ backgroundColor: "#D9D9D9" }}>
                    {/* Display item names, quantities, and prices */}
                    {itemNames.split(",").map((itemName, index) => (
                      <div className="row" key={index}>
                        <div className="col-md-8 col-lg-9">
                          <p>{itemName}</p>
                        </div>
                        <div className="col-md-4 col-lg-3">
                          <p>${prices.split(",")[index]} x {quantities.split(",")[index]}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="row my-4">
                    <div className="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                      <p className="lead fw-bold mb-0 text-white">${totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
