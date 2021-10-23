import React, { useContext } from "react";
import ShoppingItem from "./ShoppingItem";

import CartContext from "../../store/cart-context";
import PageLoading from "../../store/PageLoading";

const ShoppingCart = () => {
  const cartCtx = useContext(CartContext);

  return (
    <div className="container">
      <PageLoading/>
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
              <button className="btn">Thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
