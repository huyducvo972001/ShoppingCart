import React, { useRef } from "react";

const ShoppingItem = (props) => {
  const refAmount = useRef(null);

  const updateCartItemHandler = () => {

    props.cartCtx.addItem({
      ...props.cartCtx.items[props.index],
      amount : 1
    
    });
  };

  const removeCartItemHandler = ()=>{
    props.cartCtx.removeItem(props.id)
  }

  const subCartItemHandler = ()=>{
    props.cartCtx.subItem(props.id)
  }

  return (
    <tr className="align-middle">
      <th scope="row">
        <img src={props.image} width="100px" alt="" />
      </th>
      <td className="product-title">{props.title}</td>
      <td className="text-center product-quantity">
        <span className="btn crud" onClick={subCartItemHandler}>-</span>
        <span className="btn amount">{props.amount}</span>
        <span className="btn crud" onClick={updateCartItemHandler}>+</span>
      </td>
      <td className="text-center product-price">{new Intl.NumberFormat().format(props.price)}<sup>₫</sup></td>
      <td>      
        <button className="btn btn-default" onClick={removeCartItemHandler}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
};

export default ShoppingItem;
