import React from "react";

import itemSlide from "../../assert/image/banner3.jpg";
import slide1 from "../../assert/image/slide1.jpg";
import slide2 from "../../assert/image/slide2.jpg";
import slide3 from "../../assert/image/slide3.jpg";
import banner1 from "../../assert/image/banner1.jpg";
import banner2 from "../../assert/image/banner2.jpg";
import Categories from "./Categories";
import ListProduct from "./ListProduct";
import PageLoading from "../../store/PageLoading";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../common/api/getData";
const Home = (props) => {
  const [arrProduct, setArrProduct] = useState([]);
  const fillProduct = (categoryId) => {
    return props.listProduct
      .filter((p) => p.category === categoryId)
      .slice(0, 5);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const categoriesData = await getAllCategories();

      setArrProduct(categoriesData);
    };
    fetchProducts();
  }, []);
  return (
    <article className="mt-3 container">
      <div style={{ height: 80 }}></div>
      <PageLoading />
      <div className="category">
        <div className="row">
          <div className="col-3">
            <table className="table table-borderless">
              <thead style={{ backgroundColor: "#d7202c" }}>
                <tr>
                  <th scope="col">
                    <i className="fas fa-list"></i> &ensp; CATEGORIES
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrProduct.map((item) => (
                  <Categories
                    key={item.id}
                    category={item.name}
                    slug={item.slug}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-mdb-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={slide1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={slide2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={slide3} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-mdb-target="#carouselExampleControls"
                data-mdb-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-mdb-target="#carouselExampleControls"
                data-mdb-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3 mb-5">
          <div className="col">
            <img src={banner1} width="100%" alt="" />
          </div>
          <div className="col">
            <img src={banner2} width="100%" alt="" />
          </div>
        </div>
        <ListProduct title="Điện thoại" item={fillProduct(1)} />
        <ListProduct title="PC" item={fillProduct(4)} />

        <div className="mt-4 mb-5">
          <img src={itemSlide} width="100%" alt="" />
        </div>
        <ListProduct title="Phụ kiện" item={fillProduct(9)} />
      </div>
    </article>
  );
};

export default Home;
