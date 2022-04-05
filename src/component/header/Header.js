import React, { useContext } from "react";
import { BiShoppingBag, BiPhone, BiUser, BiSearch } from "react-icons/bi";
import logo_header from "../../assert/image/logo.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
import "./Header.css";
import { Input } from "antd";

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
      <div className="body-header">
        <div className="container">
          <div className="header-flex">
            <div>
              <Link to="/">
                <img src={logo_header} alt="" width="200px" />
              </Link>
            </div>
            <div className="search">
              <Input
                placeholder="Tìm kiếm"
                prefix={<BiSearch style={{ color: "#ccc", fontSize: 18 }} />}
                size="large"
                style={{ borderRadius: "10px", width: "400px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "30%",
                justifyContent: "space-between",
              }}
            >
              <div className=" call-buy">
                <div>
                  <BiPhone className="phoneicon" />
                </div>
                <div>
                  <span>Gọi mua hàng </span> <br />
                  <div className="phonenumber">(+123) 123 321 345</div>
                </div>
              </div>
              <div className=" mt-1 cart-icon">
                <Link to="/shopping-cart" className="text-white">
                  <div
                    style={{ textAlign: "right", marginRight: "20px" }}
                    className="cart"
                  >
                    <div>
                      <BiShoppingBag
                        style={{ fontSize: 40, transform: "translateY(-10%)" }}
                      />
                      <span className="quantity">{CartCtx.items.length}</span>
                    </div>
                    <div className="cart-title">
                      <span style={{ lineHeight: -2 }}>
                        Giỏ <br /> hàng
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
              <Link to="/auth">
                <div className="account">
                  <span>
                    <BiUser className="usericon" />
                  </span>
                  <label style={{ color: "white", fontSize: 12, marginTop: 2 }}>
                    Tài khoản
                  </label>

                  {/* <ul
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
                </ul> */}
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
