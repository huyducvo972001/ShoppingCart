import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

const NavItem = (props) => { 
  let { id } = useParams();
  const activeHandler = () => {
    document.getElementById(`navItem_menu_${id}`).classList.remove("active")
    document.getElementById(`navItem_menu_${props.id}`).classList.add("active")
  }; 
 

  return (
    <Link to={`/category/${props.id}`}>
      <li className="nav-item">
        <p className="nav-link" id={`navItem_menu_${props.id}`} onClick={activeHandler}>
          {props.icon}&ensp;{props.title}
        </p>
      </li>
    </Link>
  );
};

export default NavItem;
