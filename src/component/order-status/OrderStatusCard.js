import { MoneyCollectOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderStatus.module.css";
import { DateFormat, MoneyFormat } from "./../../common/FormatNumber";

const OrderStatusCard = ({ orders }) => {
  console.log(orders);
  console.log(new Date().toLocaleDateString("en-AU"));
  return (
    <div>
      {orders.map((item, index) => (
        <div className={styles.ordersc} key={index}>
          <div className={styles.ordersc__title} style={{ color: "#26aa99" }}>
            <h5>Tech Store</h5>
            <p>
              <i
                className="fas fa-truck"
                style={{ color: "#26aa99", marginRight: 10, fontSize: 16 }}
              ></i>
              Giao hàng thành công
            </p>
          </div>
          <div className={styles.ordersc__info}>
            <Link to={`/satus-order-detail/${item.id}`}>
              {item.orderItems.map((i, index) => (
                <div className={styles.order_status_listitem} key={index}>
                  <div className={styles.order_status_itemimage}>
                    <img src={i.image} alt="" />
                  </div>
                  <div className={styles.order_status_iteminfo}>
                    <h5>iPhone 12 Pro Max</h5>
                    <p style={{ color: "black" }}>x{i.amount}</p>
                  </div>
                  <div
                    className={styles.order_status_itemprice}
                    style={{ color: "black" }}
                  >
                    {MoneyFormat(i.price)}
                  </div>
                </div>
              ))}
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              Sản phẩm được giao vào ngày:{" "}
              <u style={{ color: "#d70018" }}>
                {DateFormat(item.shippingDate) !== "NaN - NaN - NaN"
                  ? DateFormat(item.shippingDate)
                  : "Chưa được giao"}

                {console.log(item.shippingDate)}
              </u>
            </div>
            <div className={styles.ordersc__total}>
              <MoneyCollectOutlined
                style={{ fontSize: 24, color: "#d70018", marginRight: -10 }}
              />
              <div className={styles.ordersc__total_dv}>Tổng số tiền:</div>
              <div className={styles.ordersc__total_t}>
                {MoneyFormat(item.totalPrice + 80000)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusCard;
