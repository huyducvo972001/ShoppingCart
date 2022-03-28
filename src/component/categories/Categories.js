import { useParams } from "react-router";

import ListProduct from "./ListProduct/ListProduct";
import NavBar from "./NavBar/NavBar";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../common/api/getData";

const Categories = () => {
  const [listProduct, setListProduct] = useState([]);
  const param = useParams();
  console.log(param.id);
  useEffect(() => {
    const fetchProducts = async () => {
      const categoriesData = await getAllProduct();

      const products = categoriesData.filter((p) => p.category === param.id);
      setListProduct(products);
    };
    fetchProducts();
  }, [param]);

  return (
    <>
      <NavBar />
      <ListProduct listProduct={listProduct} />
    </>
  );
};

export default Categories;
