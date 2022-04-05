import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getAllUser } from "../../common/api/getData";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();

  const [listUser, setListUser] = useState([]);
  const registerHandler = () => {
    history.push("/registration");
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getAllUser();
      setListUser(resp);
    };
    fetchData();
  }, []);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const user = listUser.find(
      (u) => u.username === enteredUsername && u.password === enteredPassword
    );

    if (user) {
      localStorage.setItem("userLogined", JSON.stringify(user));
      history.push("/");
      window.location.reload();
    }
  };

  const orRegister = (
    <div className={`${classes.orRegister} text-center`}>
      <p>Hoặc</p>
      <label>
        Bạn chưa có tài khoản? <span onClick={registerHandler}>Đăng ký</span>
      </label>
    </div>
  );

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <h3 className="mb-4 text-center font-weight-bold">Đăng nhập</h3>
        <div className={`${classes.form_group} form-group`}>
          <label htmlFor="">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            ref={usernameInputRef}
          />
        </div>
        <div className={`${classes.form_group} form-group`}>
          <label htmlFor="">Mật khẩu:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            ref={passwordInputRef}
          />
        </div>
        <div className={`${classes.form_group} form-group`}>
          <button className={`${classes.btn} btn btn-primary`}>
            Đăng nhập
          </button>
        </div>

        {orRegister}
      </form>
    </div>
  );
};

export default AuthForm;
