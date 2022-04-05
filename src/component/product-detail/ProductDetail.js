import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../../store/cart-context";
import PageLoading from "../../store/PageLoading";
import CardItem from "../items/CardItem";
import { getAllProduct } from "./../../common/api/getData";

const ProductDetail = (props) => {
  const id = useParams();
  const cartCtx = useContext(CartContext);
  const [productDetail, setProductDetail] = useState({});
  const fillProduct = () => {
    return props.listProduct.filter((p) => p.category === 3).slice(0, 5);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const categoriesData = await getAllProduct();

      if (!categoriesData.find((p) => p.id === id.id)) {
        setProductDetail({
          image: "Loading...",
          name: "Loading...",
          price: "Loading...",
          categoryName: "Loading...",
        });
      } else {
        setProductDetail(categoriesData.find((p) => p.id === id.id));
      }
    };
    fetchProducts();
  }, [props, id]);

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: productDetail.id,
      name: productDetail.name,
      amount: 1,
      price: Number(productDetail.price) - Number(productDetail.price) * 0.2,
      image: productDetail.image,
    });
  };
  console.log(productDetail);
  return (
    <div className="container product_detail">
      <PageLoading />
      <div className="row">
        <div className="col-4">
          <img src={productDetail.image} width="100%" alt="" />
        </div>
        <div className="col-4 mt-5">
          <p className="title-product">{productDetail.name}</p>
          <p className="category-product mt-4">
            Danh mục: {productDetail.category}
          </p>
          <p className="raiting-product mt-4">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-half"></i>
          </p>
          <p className="price-product mt-4">
            {new Intl.NumberFormat().format(
              productDetail.price - productDetail.price * 0.2
            )}
            <sup>₫</sup>
            <span>
              {new Intl.NumberFormat().format(productDetail.price)}
              <sup>₫</sup>
            </span>
          </p>
          <button className="add-to-cart" onClick={addToCartHandler}>
            Thêm vào giỏ
          </button>
        </div>
        <div className="col-4 mt-5">
          <div className="card info_security">
            <div className="card-body" style={{ fontSize: "14px" }}>
              <h5 className="card-title" style={{ fontWeight: "600" }}>
                Thông tin máy
              </h5>
              <div className="card-text row">
                <div className="col-2">
                  <i
                    className="bi bi-shield-check"
                    style={{ fontSize: "50px" }}
                  ></i>
                </div>
                <div className="col">
                  Bảo hành chính hãng 12 tháng tại trung tâm bảo hành ủy quyền,
                  1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ NSX. Gia hạn bảo
                  hành thời gian giãn cách.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description mt-5 mb-5">
        <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="ex1-tab-1"
              data-mdb-toggle="tab"
              href="#ex1-tabs-1"
              role="tab"
              aria-controls="ex1-tabs-1"
              aria-selected="true"
            >
              Mô tả
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="ex1-tab-2"
              data-mdb-toggle="tab"
              href="#ex1-tabs-2"
              role="tab"
              aria-controls="ex1-tabs-2"
              aria-selected="false"
            >
              Thông số
            </a>
          </li>
        </ul>

        <div className="tab-content container" id="ex1-content">
          <div
            className="tab-pane fade show active"
            id="ex1-tabs-1"
            role="tabpanel"
            aria-labelledby="ex1-tab-1"
          >
            Là sản phẩm mang đến độ hoàn thiện cao hơn nhiều so với hai phiên
            bản trước, điện thoại Samsung Galaxy Fold 3 được thiết kế kích thước
            hài hòa hơn. Giúp bạn có thể dễ dàng cầm khi đóng hoặc mở màn hình
            đều dễ sử dụng nhất. Bộ khớp nối bản lề mới giúp kết nối bộ khung
            của Galaxy Z Fold3 hoàn hảo hơn. Tăng cao độ bền khi đóng mở liên
            tục và cố định cực kỳ chắc chắn.
          </div>
          <div
            className="tab-pane fade"
            id="ex1-tabs-2"
            role="tabpanel"
            aria-labelledby="ex1-tab-2"
          >
            <table className="table table-striped" style={{ width: "800px" }}>
              <tbody>
                <tr>
                  <th>Kích thước màn hình:</th>
                  <td>7.6 inches</td>
                </tr>
                <tr>
                  <th>Công nghệ màn hình:</th>
                  <td>Dynamic AMOLED</td>
                </tr>
                <tr>
                  <th>Camera sau:</th>
                  <td>
                    Camera góc rộng: 12 MP, f/1.8, 26mm, Dual Pixel PDAF, OIS
                    Camera tele: 12 MP, f/2.4, 52mm, PDAF, OIS, 2x Zoom quang
                    học Camera góc siêu rộng: 12 MP, f/2.2 Camera màn hình phụ:
                    10MP, f/2.2
                  </td>
                </tr>
                <tr>
                  <th>Camera trước:</th>
                  <td>Camera ẩn dưới màn hình: 4MP, f/1.8</td>
                </tr>
                <tr>
                  <th>Chipset:</th>
                  <td>Snapdragon 888 5G (5 nm)</td>
                </tr>
                <tr>
                  <th>Dung lượng RAM:</th>
                  <td>12 GB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-5 difProduct">
        {fillProduct().map((item) => (
          <CardItem
            link={`/product-detail/${item.id}`}
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            categoryName={item.categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
