import React, { useContext } from "react";
import avatar from "../../assert/image/avartar.jpeg";
import logo_header from "../../assert/image/logo.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
const Header = () => {
  const urlHandler = useParams();
  const CartCtx = useContext(CartContext);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  useEffect(() => {
    const action = setTimeout(() => {
      window.scrollBy(0, -1000000);
    }, 100);
    return () => {
      clearTimeout(action);
    };
  }, [urlHandler]);

  return (
    <header>
      <div className="top-header">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
            <div className="container-fluid">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <span>Điện thoại: (+123) 123 321 345</span>
              </div>

              <div className="d-flex align-items-center">
                <label style={{ marginRight: "20px", color: "white" }}>
                  Tài khoản
                </label>

                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="!#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={avatar}
                    className="rounded-circle"
                    height="30"
                    alt=""
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {!isLoggedIn && (
                    <li>
                      <Link to="/auth">
                        <span className="dropdown-item">Đăng nhập</span>
                      </Link>
                    </li>
                  )}
                  {isLoggedIn && (
                    <span className="dropdown-item" onClick={logoutHandler}>
                      Đăng xuất
                    </span>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="body-header">
        <div className="container">
          <div className="row">
            <div className="col-3 align-self-center">
              <Link to="/">
                <img src={logo_header} alt="" width="200px" />
              </Link>
            </div>
            <div className="col align-self-center">
              <div className="input-group justify-content-left">
                <div className="form-outline" style={{ width: "50%" }}>
                  <input
                    type="search"
                    placeholder="Tìm kiếm..."
                    className="form-control bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="col-2 align-self-center cart-icon">
              <Link to="/shopping-cart" className="text-white">
                <div
                  style={{ textAlign: "right", marginRight: "20px" }}
                  className="cart"
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span className="quantity">{CartCtx.items.length}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
