import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAllOrder } from "../../common/api/getData";
import styles from "./OrderStatus.module.css";
import { MoneyFormat } from "./../../common/FormatNumber";
const OrderDetail = () => {
  const path = useParams();
  const [order, setOrder] = useState(undefined);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getAllOrder();

      const o = ordersData.find((i) => i.id === path.id);
      setOrder(o);
    };
    fetchOrders();
  }, [path]);

  const status = () => {
    let s = "";

    switch (order.status) {
      case "finish":
        s = "ĐÃ ĐƯỢC GIAO";

        break;

      case "shipping":
        s = "ĐANG ĐƯỢC GIAO";
        break;
      default:
        s = "ĐÃ ĐƯỢC ĐẶT";

        break;
    }
    return s;
  };
  return (
    <div>
      {order ? (
        <div className={styles.order_status}>
          <div className={styles.order_status_title}>
            ID ĐƠN HÀNG. {order.id} <b>|</b>
            <span> ĐƠN HÀNG CỦA BẠN {status()}</span>
          </div>
          <div className={styles.order_status_timeline}>
            <div
              className={`${styles.order_status_timelinegroup} ${
                status() === "ĐÃ ĐƯỢC ĐẶT"
                  ? styles.order_status_timelineactive
                  : ""
              } `}
            >
              <div
                className={`${styles.order_status_timelineitem} ${
                  status() === "ĐANG ĐƯỢC GIAO" || status() === "ĐÃ ĐƯỢC GIAO"
                    ? styles.order_status_timelineitem_active1
                    : ""
                }`}
              >
                <i className="fas fa-scroll"></i>
              </div>
              <p>Đơn hàng đã được đặt</p>
            </div>
            <div
              className={`${styles.order_status_timeline_line}  ${
                status() === "ĐANG ĐƯỢC GIAO" || status() === "ĐÃ ĐƯỢC GIAO"
                  ? styles.order_status_timeline_lineactive
                  : ""
              } `}
            ></div>
            <div
              className={`${styles.order_status_timelinegroup} ${
                status() === "ĐANG ĐƯỢC GIAO"
                  ? styles.order_status_timelineactive
                  : ""
              } `}
            >
              <div
                className={`${styles.order_status_timelineitem} ${
                  status() === "ĐÃ ĐƯỢC GIAO"
                    ? styles.order_status_timelineitem_active1
                    : ""
                }`}
              >
                <i className="fas fa-truck"></i>
              </div>
              <p>Đơn hàng đang giao</p>
            </div>
            <div
              className={`${styles.order_status_timeline_line} ${
                status() === "ĐÃ ĐƯỢC GIAO"
                  ? styles.order_status_timeline_lineactive
                  : ""
              }`}
            ></div>
            <div
              className={`${styles.order_status_timelinegroup} ${
                status() === "ĐÃ ĐƯỢC GIAO"
                  ? styles.order_status_timelineactive
                  : ""
              }`}
            >
              <div className={styles.order_status_timelineitem}>
                <i className="fas fa-star"></i>
              </div>
              <p>Giao hàng thành công</p>
            </div>
          </div>
          <div className={styles.order_status_item}>
            <div className={styles.order_status_info}>
              <h4>Địa Chỉ Nhận Hàng</h4>
              <h5>{order.user.name}</h5>
              <p>{order.user.phoneNumber}</p>
              <span>{order.user.address}</span>
            </div>
            <div style={{ width: "100%" }}>
              {order.orderItems.map((item, index) => (
                <div className={styles.order_status_listitem} key={index}>
                  <div className={styles.order_status_itemimage}>
                    <img src={item.image} alt="" />
                  </div>
                  <div className={styles.order_status_iteminfo}>
                    <h5>{item.name} </h5>
                    <p>x{item.amount} </p>
                  </div>
                  <div className={styles.order_status_itemprice}>
                    {MoneyFormat(item.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.order_status_total}>
            <div className={styles.order_status_total_left}>
              <p>Tổng tiền hàng</p>
              <p>Phí vận chuyển</p>
              <p>Tổng số tiền</p>
            </div>
            <div className={styles.order_status_total_right}>
              <p>{MoneyFormat(order.totalPrice)}</p>
              <p>80.000 đ</p>
              <p className={styles.order_status__total}>
                {MoneyFormat(order.totalPrice + 80000)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default OrderDetail;
