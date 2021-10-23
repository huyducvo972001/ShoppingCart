import React from "react";
import CardItem from "../items/CardItem";

const ListProduct = (props) => {
  return (
    <div className="product-list">
      <h5>{props.title}</h5>
      <hr className="mt-4 mb-4" />
  
        {props.item.map((item) => (
          <CardItem
          link={`/product-detail/${item.id}`}
            key={item.id}     
            id={item.id} 
            image={item.image}
            name={item.name}
            price={item.price}
            categoryName={item.categoryName}
          />
        ))}
    
    </div>
  );
};

export default ListProduct;
