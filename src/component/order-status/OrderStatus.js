import React, { useEffect, useState } from "react";
import { getAllOrder } from "../../common/api/getData";
import styles from "./OrderStatus.module.css";
import OrderStatusCard from "./OrderStatusCard";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getAllOrder();

      setOrders(ordersData.reverse());
    };
    fetchOrders();
  }, []);

  return (
    <div className={styles.order_status}>
      <OrderStatusCard orders={orders} />
    </div>
  );
};

export default OrderStatus;
