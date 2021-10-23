import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../store/cart-context";

const CardItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = () =>{
   
    cartCtx.addItem({
      id:props.id,
      name: props.name,
      amount: 1,
      price: Number(props.price)-(Number(props.price)*0.2),
      image: props.image
    })
  }
  return (
    <div className=" single-product-outline">
      <div className="single-product">
        <Link to={props.link}>
          <div className="image-product">
            <img src={props.image} width="100%" alt="" />
          </div>
          <div className="container category_in_product mt-3">
            <div className="row">
              <div className="col">{props.categoryName}</div>
              <div className="col star">
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
          </div>
          <hr />
          <div className="info_product_details">
            <p className="card-title">{props.name}</p>
            <div className="row">
              <div className="col">
                <p className="text-dark font-weight-bold">
                  {new Intl.NumberFormat().format(props.price-(props.price*0.2))}
                  <sup>₫</sup>
                </p>
              </div>
              <div className="col old-price">
                <p className="text-dark">
                  {new Intl.NumberFormat().format(props.price)}
                  <sup>₫</sup>
                </p>
              </div>
            </div>
          </div>
        </Link>
        <p className="btn btn-primary" onClick={addToCartHandler}>
          <i className="fas fa-cart-plus"></i> &ensp; Thêm vào giỏ
        </p>
      </div>
    </div>
  );
};

export default CardItem;
