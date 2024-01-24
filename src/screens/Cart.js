import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Cart = () => {
  const { cart } = useCart();
  const dispatch = useDispatchCart();

  // Add a conditional check to ensure cart is defined
  const totalPrice = cart
    ? cart.reduce((total, food) => total + food.price * food.quantity, 0)
    : 0;

  const handleDeleteFromCart = (index) => {
    dispatch({ type: "REMOVE_FROM_CART", index: index });
  };

  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("userEmail");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orderData",
        {
          email: userEmail,
          order_data: cart,
          order_date: new Date().toDateString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      console.error("Error making the Axios request:", error);
    }
  };

  // Add a conditional check to ensure cart is defined before rendering
  if (!cart) {
    return (
      <section className="vh-100 mt-5">
        <div className="container h-100">
          <div className="row d-flex justify-content-center h-100">
            <div className="col">
              <p>
                <span className="h2">Shopping Cart </span>
                <span className="h4">(0 items in your cart)</span>
              </p>
              <div className="alert alert-warning" role="alert">
                Your cart is empty.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="vh-100 mt-5">
      <div className="container h-100">
        <div className="row d-flex justify-content-center h-100">
          <div className="col">
            <p>
              <span className="h2">Shopping Cart </span>
              <span className="h4">({cart.length} items in your cart)</span>
            </p>
            {cart.map((food, index) => (
              <div className="card mb-4" key={index}>
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img
                        src={food.img}
                        className="img-fluid"
                        alt="Generic placeholder"
                      />
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                      <div>
                        <p className="small text-muted mb-4 pb-2">Name</p>
                        <p className="lead fw-normal mb-0">
                          {food.name}({food.size})
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                      <div>
                        <p className="small text-muted mb-4 pb-2">Quantity</p>
                        <p className="lead fw-normal mb-0">{food.quantity}</p>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                      <div>
                        <p className="small text-muted mb-4 pb-2">Price</p>
                        <p className="lead fw-normal mb-0">{food.price}</p>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                      <div>
                        <p className="small text-muted mb-4 pb-2">Total</p>
                        <p className="lead fw-normal mb-0">
                          {food.price * food.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <button
                        className="btn text-danger"
                        onClick={() => handleDeleteFromCart(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="card mb-5">
              <div className="card-body p-4">
                <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>
                    <span className="lead fw-normal">Rs.{totalPrice}/-</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleCheckout}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
