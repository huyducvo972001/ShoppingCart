import { Button, Form, Input, message } from "antd";
import React from "react";
import { sleep } from "../../common/sleep/sleep";
import { useHistory } from "react-router-dom";

const ChangePassword = ({ user }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    if (
      user.password === values.oldPassword &&
      values.newPassword === values.confirmPassword
    ) {
      fetch(
        "https://tech-store-44eac-default-rtdb.firebaseio.com" +
          `/users/${user.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...user,
            password: values.newPassword,
          }),
        }
      );
      message.success("Đổi mật khẩu thành công");
    } else {
      message.error("Đổi mật khẩu không thành công");
    }

    await sleep(300);
    localStorage.removeItem("userLogined");
    window.location.reload();
    history.push("/auth");
  };
  return (
    <div style={{ padding: "0 200px" }} className="change_password">
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          label="Nhập mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: "Nhập mật khẩu cũ!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Nhập mật khẩu mới!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          rules={[{ required: true, message: "Xác nhận mật khẩu mới!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
