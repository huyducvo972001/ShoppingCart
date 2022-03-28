import React from "react";

import CardItem from "../../items/CardItem";
const ListProduct = ({ listProduct }) => {
  return (
    <div className="container">
      <div className="mt-5 product_of_category">
        <div className="row">
          <div className="col">
            <h5>Điện thoại</h5>
          </div>
          <div className="col select_sort"></div>
        </div>
        <hr className="mt-4 mb-4" />
        <div className="">
          {listProduct.map((item) => (
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
      </div>
    </div>
  );
};

export default ListProduct;
