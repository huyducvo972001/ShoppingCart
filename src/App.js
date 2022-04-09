import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import AuthForm from "./component/auth/AuthForm";
import Categories from "./component/categories/Categories";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";

import Home from "./component/home/Home";
import ProductDetail from "./component/product-detail/ProductDetail";
import ShoppingCart from "./component/shopping-cart/ShoppingCart";

import CartProvider from "./store/CartProvider";
import PageLoading from "./store/PageLoading";
import Profile from "./component/profile/Profile";
import Registration from "./component/auth/Registration";
import OrderStatus from "./component/order-status/OrderStatus";
import OrderDetail from "./component/order-status/OrderDetail";

const CATEGORY_MUMY = [
  {
    id: 1,
    icon: <i className="bi bi-phone"></i>,
    title: "Điện thoại",
  },
  {
    id: 2,
    icon: <i className="bi bi-tablet-landscape"></i>,
    title: "Tablet",
  },
  {
    id: 3,
    icon: <i className="bi bi-laptop"></i>,
    title: "Laptop",
  },
  {
    id: 4,
    icon: <i className="bi bi-display"></i>,
    title: "PC",
  },
  {
    id: 5,
    icon: <i className="bi bi-speaker"></i>,
    title: "Loa",
  },
  {
    id: 6,
    icon: <i className="bi bi-tv"></i>,
    title: "Màn hình",
  },
  {
    id: 7,
    icon: <i className="bi bi-smartwatch"></i>,
    title: "Đồng hồ",
  },
  {
    id: 8,
    icon: <i className="bi bi-headphones"></i>,
    title: "Tai nghe",
  },
  {
    id: 9,
    icon: <i className="bi bi-battery-charging"></i>,
    title: "Phụ kiện",
  },
];

function App() {
  const [listProduct, setListProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const isLogin = localStorage.getItem("userLogined");

  useEffect(() => {
    const fetchProducts = async () => {
      const requestUrl =
        "https://shopping-comuca-default-rtdb.firebaseio.com/database.json";
      const response = await fetch(requestUrl);
      const responseData = await response.json();
      const data = responseData;

      const products = [];

      for (const i in data) {
        products.push({
          id: data[i].id,
          name: data[i].name,
          price: data[i].price,
          image: data[i].image,
          category: data[i].category,
          categoryName: data[i].categoryName,
        });
      }

      setListProduct(products);
      setIsLoading(false);
    };
    fetchProducts().catch((error) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <CartProvider>
      <Router>
        <PageLoading />
        <Header />
        <Switch>
          <Route path="/product-detail/:id">
            <ProductDetail listProduct={listProduct} />
          </Route>
          <Route path="/category/:id">
            <Categories arrProduct={CATEGORY_MUMY} listProduct={listProduct} />
          </Route>
          <Route path="/shopping-cart">
            <ShoppingCart />
          </Route>
          {!isLogin && (
            <Route path="/auth">
              <AuthForm />
            </Route>
          )}
          {isLogin && (
            <Route path="/auth">
              <Profile />
            </Route>
          )}
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/satus-order">
            <OrderStatus />
          </Route>
          <Route path="/satus-order-detail/:id">
            <OrderDetail />
          </Route>
          <Route path="/">
            <Home arrProduct={CATEGORY_MUMY} listProduct={listProduct} />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
