import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageLoading from "../../../store/PageLoading";
import NavItem from "./NavItem";

const NavBar = (props) => {
  let { id } = useParams();
  useEffect(() => {
    const activeHandler = setTimeout(() => {
      document.getElementById(`navItem_menu_${id}`).classList.add("active");
    }, 10);
    return () => {
      clearTimeout(activeHandler);
    };
  });

  return (
    <div className="menu_product">
          <PageLoading/>
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {props.arrProduct.map((item) => (
                <NavItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  title={item.title}
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
