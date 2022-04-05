import { Button, DatePicker, Form, Input, message, Radio } from "antd";
import moment from "moment";
import React, { useState } from "react";
import "./Registration.css";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import { storage } from "../../firebase";
import Upload from "../../common/methods/Upload";
import { sleep } from "../../common/sleep/sleep";

const Registration = () => {
  const [form] = Form.useForm();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const history = useHistory();
  const [imageFile, setImageFile] = useState("");
  const [isUpload, setIsUpload] = useState(true);
  const [profileImg, setProfileImg] = useState("");

  let urlImageWasUpload = "";
  const onSubmit = async (values) => {
    uploadImageHandler();

    message.loading("Đang xử lý...", 5);

    await sleep(5000);
    console.log(urlImageWasUpload);
    const data = {
      ...values,
      id: uuidv4(),
      active: true,
      role: "admin",
      dateOfBirth,
      avatar: urlImageWasUpload,
    };

    fetch("https://tech-store-44eac-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify(data),
    });
    history.push("/auth");
    message.success("Đăng ký tài khoản thành công!");
  };
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
  return (
    <div className="registration">
      <h3 className="mb-4 mt-3 text-center font-weight-bold">Đăng ký</h3>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <div className="profile_form">
          <div style={{ width: "70%" }}>
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Nhập họ và tên!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Nhập họ và tên!" }]}
            >
              <Input.Password />
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </div>
          <div style={{ width: "30%" }}>
            <Form.Item label="Hình ảnh">
              <Upload
                height="250px"
                setImage={setImageFile}
                setIsUpload={setIsUpload}
                isUpload={isUpload}
                setProfileImg={setProfileImg}
                profileImg={profileImg}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
