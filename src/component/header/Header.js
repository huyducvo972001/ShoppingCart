import React, { useContext } from 'react'
import flag_vietnam from '../../assert/image/flag-vietnam.png'
import flag_england from '../../assert/image/flag-england.png'
import avatar from '../../assert/image/avartar23.jpg'
import logo_header from '../../assert/image/logo1.png'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import CartContext from '../../store/cart-context'
const Header = () => {
  const urlHandler = useParams();
  const CartCtx = useContext(CartContext)
  useEffect(() => {
    const action = setTimeout(() => {
      window.scrollBy(0, -1000000)
    }, 100)
    return () => {
      clearTimeout(action)
    }
  }, [urlHandler])

  return (
    <header>
      <div className="top-header">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <span>Điện thoại: (+123) 123 321 345</span>
              </div>

              <div className="d-flex align-items-center">
                <a style={{ marginRight: "20px" }} href='!'><img src={flag_vietnam} alt="" /></a>
                <a style={{ marginRight: "20px" }} href='!'><img src={flag_england} alt="" /></a>

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
                  <li>
                    <a className="dropdown-item" href="!#">My profile</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="!#">Settings</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="!#">Logout</a>
                  </li>
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
              <Link to="/"><img src={logo_header} alt="" width="100%" /></Link>
            </div>
            <div className="col align-self-center">
              <div className="input-group justify-content-center">
                <div className="form-outline" style={{ width: "70%" }}>
                  <input
                    type="search"
                    placeholder="Tìm kiếm..."
                    className="form-control bg-white"
                  />
                </div>
                <button type="button" className="btn btn-dark">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            <div className="col-2 align-self-center cart-icon">
              <Link to="/shopping-cart" className='text-white'>
                <div style={{ textAlign: "right", marginRight: "20px" }} className="cart">
                  <i className="fas fa-shopping-cart"></i>
                  <span className="quantity">{CartCtx.items.length}</span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
