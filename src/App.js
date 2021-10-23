import { useCallback, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Categories from "./component/categories/Categories";

import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";

import Home from "./component/home/Home";
import ProductDetail from "./component/product-detail/ProductDetail";
import ShoppingCart from "./component/shopping-cart/ShoppingCart";
import CartProvider from "./store/CartProvider";
import PageLoading from "./store/PageLoading";

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

  const fetchPostList = useCallback(async () => {
    try {
      const requestUrl =
        "https://shopping-comuca-default-rtdb.firebaseio.com/database.json";
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      const data = responseJSON;

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
    } catch (error) {
      alert("Failed to fetch api: ", error.message);
    }
  }, []);

  useEffect(() => {
    fetchPostList();
  }, [fetchPostList]);

  return (
    <CartProvider>
      <Router>
        <PageLoading/>
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
          <Route path="/">
            <Home arrProduct={CATEGORY_MUMY} listProduct={listProduct} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
