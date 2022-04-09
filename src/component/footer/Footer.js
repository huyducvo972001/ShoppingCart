import React from "react";
import footer1 from "../../assert/image/footer1.png";
import footer2 from "../../assert/image/footer2.png";
import footer3 from "../../assert/image/footer3.png";
import footer4 from "../../assert/image/footer3.png";
import logo_footer from "../../assert/image/logof.png";
import icon_gmail from "../../assert/image/gmail.png";
import icon_facebook from "../../assert/image/facebook.png";
import icon_youtube from "../../assert/image/youtube.png";
import icon_instagram from "../../assert/image/instagram.png";
const Footer = () => {
  return (
    <footer>
      <div className="top-footer">
        <div className="container">
          <div className="row text-center">
            <div className="col">
              <img src={footer1} alt="" />
              <p>
                <strong>Giao hàng</strong>
              </p>
              <p>Đổi trả miễn phí. Xem hàng trước khi thanh toán.</p>
            </div>
            <div className="col">
              <img src={footer2} alt="" />
              <p>
                <strong>Thanh toán an toàn</strong>
              </p>
              <p>
                Thanh toán bằng các phương thức thanh toán an toàn và phổ biến
                nhất hiện nay.
              </p>
            </div>
            <div className="col">
              <img src={footer3} alt="" />
              <p>
                <strong>Tự tin mua sắm</strong>
              </p>
              <p>
                Chúng tôi bảo vệ khách hàng từ khi đặt hàng đến lúc thanh toán.
              </p>
            </div>
            <div className="col">
              <img src={footer4} alt="" />
              <p>
                <strong>Trung tâm hỗ trợ 24/7</strong>
              </p>
              <p>Bạn đang có câu hỏi? Hãy liên hệ với chúng tôi.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container hr-line"></div>
      <div className="body-footer">
        <div className="container">
          <div className="row">
            <div className="col" style={{ paddingRight: "150px" }}>
              <img src={logo_footer} width="100%" alt="" />
              <p className="mt-3">
                Công ty TNHH Java 5 FPT Polytechnic chi nhánh IT16102
              </p>
              <p>
                <b>ĐỊA CHỈ:</b> Công viên phần mềm, Toà nhà Innovation lô 24,
                Quang Trung, Quận 12, Thành phố Hồ Chí Minh
              </p>
              <p>
                <b>SỐ ĐIỆN THOẠI:</b> (+123) 123 321 345
              </p>
              <p>
                <b>EMAIL:</b> java5@fpt.edu.vn
              </p>
            </div>
            <div className="col-2">
              <h5 className="mt-4 mb-3">Sản Phẩm</h5>
              <p>Laptop</p>
              <p>Điện thoại</p>
              <p>Màn hình</p>
              <p>Xem thêm</p>
            </div>
            <div className="col-2">
              <h5 className="mt-4 mb-3">Dịch Vụ</h5>
              <p>Bảo hành</p>
              <p>Vận chuyển</p>
              <p>Thanh toán</p>
            </div>
            <div className="col">
              <h5 className="mt-4 mb-3">Theo dõi chúng tôi</h5>

              <a href="https://www.plus.google.com/discover">
                <img src={icon_gmail} alt="" />
              </a>

              <a href="https://www.facebook.com/">
                <img src={icon_facebook} alt="" />
              </a>

              <a href="https://www.youtube.com/">
                <img src={icon_youtube} alt="" />
              </a>

              <a href="https://www.instagram.com/">
                <img src={icon_instagram} alt="" />
              </a>
              <h5 className="mt-5 mb-3">Đăng ký nhận thông báo</h5>
              <div className="input-group">
                <div className="form-outline">
                  <input type="search" id="form1" className="form-control" />
                  <label className="form-label" htmlFor="form1">
                    Vui lòng nhập email
                  </label>
                </div>
                <button type="button" className="btn btn-primary">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
