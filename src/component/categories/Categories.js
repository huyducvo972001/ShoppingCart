import { useParams } from "react-router";

import ListProduct from "./ListProduct/ListProduct";
import NavBar from "./NavBar/NavBar";

const Categories = (props) => {
  const categoryID = useParams();

  const fillProduct = props.listProduct.filter(
    (p) => p.category === Number(categoryID.id)
  );
  return (
    <>  

      <NavBar arrProduct={props.arrProduct} />
      <ListProduct listProduct={fillProduct} />
    </>
  );
};

export default Categories;
