import { Button, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import "./Profile.css";
import UpdateProfile from "./UpdateProfile";

const { TabPane } = Tabs;
const Profile = () => {
  const history = useHistory();
  const userLocal = JSON.parse(localStorage.getItem("userLogined"));
  const [isChange, setIsChange] = useState(false);
  const [user, setUser] = useState([]);
  useEffect(() => {
    setUser(userLocal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChange]);
  const loggout = () => {
    localStorage.removeItem("userLogined");
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="profile">
      <div style={{ margin: "auto", width: 1200 }}>
        <input type="text" hidden />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "50px",
          }}
        >
          <div className="profile_account">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div>
                <img
                  src={user.avatar}
                  alt=""
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div style={{ paddingLeft: "40px !important", width: "500px" }}>
                <div>
                  <span className="font-weight-bold">{user.fullName}</span>
                  <input type="text" name="usernameUpd" hidden />
                  <input type="text" name="passwordUpd" hidden />
                  <p style={{ color: "gray" }}>
                    <i className="fas fa-pen"></i> Sửa hồ sơ
                  </p>
                </div>
              </div>
              <div className="titleAcc pl-5 w-100">
                <h5
                  className="font-weight-bold"
                  style={{ color: "rgb(126, 69, 69)" }}
                >
                  Tài khoản của tôi
                </h5>
                <p>Quản lý thông tin để bảo mật tài khoản của bạn tốt hơn</p>
              </div>
            </div>

            <div className="menuAccount mt-3">
              <Tabs tabPosition="left" style={{ width: "100%", marginTop: 50 }}>
                <TabPane
                  tab="Cập nhật tài khoản"
                  key="1"
                  style={{ width: "100%" }}
                >
                  <UpdateProfile
                    user={userLocal}
                    history={history}
                    isChange={isChange}
                    setIsChange={setIsChange}
                  />
                </TabPane>
                <TabPane tab="Đổi mật khẩu" key="2">
                  <ChangePassword user={user} />
                </TabPane>
                <TabPane tab="Đăng xuất" key="3">
                  <Button onClick={loggout}>Đăng xuất</Button>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
