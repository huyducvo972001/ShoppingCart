import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, DatePicker, Form, Input, message, Radio } from "antd";
import { Upload } from "./../../common/methods/Upload";
import { storage } from "../../firebase";
import { sleep } from "../../common/sleep/sleep";
import { getAllUser } from "./../../common/api/getData";

const UpdateProfile = ({ user, history, isChange, setIsChange }) => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isUpload, setIsUpload] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [changeImage, setChangeImage] = useState(false);

  let urlImageWasUpload = "";
  const uploadImageHandler = () => {
    let nameImage = "image" + new Date();
    const uploadTask = storage.ref(`images/${nameImage}`).put(imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(nameImage)
          .getDownloadURL()
          .then((url) => {
            urlImageWasUpload = url;
          });
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getAllUser();
      setListUser(resp);
    };
    fetchData();
  }, [isChange]);

  const [form] = Form.useForm();

  const onFill = () => {
    form.setFieldsValue({
      username: user.username,
      address: user.address,
      email: user.email,
      fullName: user.fullName,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
    });
    setDateOfBirth(user.dateOfBirth);
  };

  const onFinish = async (values) => {
    const newUser = listUser.find(
      (u) => u.username === user.username && u.password === user.password
    );

    uploadImageHandler();

    message.loading("Đang xử lý...", 5);
    setIsChange(!isChange);
    await sleep(6000);
    const data = {
      ...values,
      dateOfBirth,
      avatar: urlImageWasUpload,
      role: newUser.role,
      active: newUser.active,
      password: newUser.password,
      id: newUser.id,
    };

    fetch(
      "https://tech-store-44eac-default-rtdb.firebaseio.com" +
        `/users/${user.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    message.success("Cập nhật thông tin thành công!");
    await sleep(300);
    localStorage.removeItem("userLogined");
    window.location.reload();
    history.push("/auth");
  };

  useEffect(() => {
    onFill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChange]);

  return (
    <div className="profile_manager ">
      <div>
        <Form onFinish={onFinish} form={form}>
          <div className="profile_form">
            <div style={{ width: "70%" }}>
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Nhập họ và tên!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Chọn giới tính!" }]}
              >
                <Radio.Group>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Ngày sinh">
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  // eslint-disable-next-line no-undef
                  value={moment(dateOfBirth, "YYYY-MM-DD")}
                  onChange={(e) => setDateOfBirth(e._d)}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Nhập email!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[{ required: true, message: "Nhập số điện thoại!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Nhập địa chỉ!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label=" ">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </div>
            <div style={{ width: "30%" }}>
              {changeImage && (
                <Upload
                  height="250px"
                  setImage={setImageFile}
                  setIsUpload={setIsUpload}
                  isUpload={isUpload}
                  setProfileImg={setProfileImg}
                  profileImg={profileImg}
                />
              )}

              {!changeImage && (
                <Button onClick={() => setChangeImage(true)}>Đổi avatar</Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
