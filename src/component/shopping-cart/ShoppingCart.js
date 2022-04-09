import React, { useContext, useState } from "react";
import ShoppingItem from "./ShoppingItem";

import CartContext from "../../store/cart-context";
import PageLoading from "../../store/PageLoading";
import Checkout from "./Checkout";
import { useHistory } from "react-router";

const ShoppingCart = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartCtx = useContext(CartContext);

  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("userLogined"));

  const checkoutHandler = () => {
    if (!user) {
      history.replace("/auth");
    } else {
      setIsCheckout(true);
    }
  };

  const closeCheckout = () => {
    setIsCheckout(false);
  };

  if (cartCtx.items.length === 0) {
    const items = JSON.parse(localStorage.getItem("cart"));
    for (var i in items) {
      cartCtx.addItem({
        id: items[i].id,
        name: items[i].name,
        amount: items[i].amount,
        price: items[i].price,
        image: items[i].image,
      });
      console.log(items);
    }
  }
  //process
  const submitOrderHandler = async (userData) => {
    await fetch(
      "https://tech-store-44eac-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          status: "process",
          createdDate: new Date(),
          orderItems: cartCtx.items,
          receiveDate: new Date(),
          totalPrice: cartCtx.totalAmount + 80000,
        }),
      }
    );
    setIsSubmitting(true);
    closeCheckout();
    cartCtx.clearCart();
    localStorage.removeItem("cart");
  };

  return (
    <div className="container" style={{ marginTop: 120 }}>
      <PageLoading />
      {isCheckout && (
        <Checkout
          isSubmitting={isSubmitting}
          onConfirm={submitOrderHandler}
          onClose={closeCheckout}
          user={user}
        />
      )}
      <div className="mt-4 mb-5">
        <h4>Giỏ hàng</h4>
        <hr />
      </div>

      <div className="row mb-5">
        <div className="col-9 cart-list">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col" colSpan="2">
                  Product
                </th>
                <th scope="col" className="text-center">
                  Số lượng
                </th>
                <th scope="col" className="text-center">
                  Giá
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartCtx.items.map((item, index) => (
                <ShoppingItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.name}
                  price={item.price}
                  amount={item.amount}
                  cartCtx={cartCtx}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="col">
          <div className="invoice">
            <div className="row">
              <div className="col-7 title">
                <p>Tổng tiền:</p>
                <p>Phí vận chuyển:</p>
                <p>Tổng:</p>
              </div>
              <div className="col price">
                <p>
                  {new Intl.NumberFormat().format(cartCtx.totalAmount)}
                  <sup>₫</sup>
                </p>
                <p>
                  80.000<sup>₫</sup>
                </p>
                <p>
                  {new Intl.NumberFormat().format(cartCtx.totalAmount + 80000)}
                  <sup>₫</sup>
                </p>
              </div>
            </div>
            <div className="button">
              <button className="btn" onClick={checkoutHandler}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
