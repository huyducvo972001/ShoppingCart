import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageLoading from "../../../store/PageLoading";
import NavItem from "./NavItem";
import { getAllCategories } from "./../../../common/api/getData";
import { useState } from "react";

const NavBar = () => {
  const [arrProduct, setArrProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const activeHandler = setTimeout(() => {
      document.getElementById(`navItem_menu_${id}`).classList.add("active");
    }, 500);
    return () => {
      clearTimeout(activeHandler);
    };
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      const categoriesData = await getAllCategories();
      console.log(categoriesData);
      setArrProduct(categoriesData);
    };
    fetchProducts();
  }, []);

  return (
    <div className="menu_product">
      <PageLoading />
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {arrProduct.map((item) => (
                <NavItem
                  key={item.id}
                  id={item.slug}
                  icon={item.icon}
                  title={item.name}
                />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
