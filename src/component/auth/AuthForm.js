import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const registerHandler = () => {
    setIsLogin(false);
  };

  const authCtx = useContext(AuthContext);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;
    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5lOPQ_RZ5NzNCrdHAHOL58YhQ1jFhrJ0";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5lOPQ_RZ5NzNCrdHAHOL58YhQ1jFhrJ0";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredUsername,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return <p>Error</p>;
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        authCtx.email(enteredUsername);
        if (data.idToken) {
          history.replace("/");
        } else {
          alert("Tên đăng nhập hoặc mật khẩu không đúng!");
          history.replace("/auth");
        }
      });
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
        <h3 className="mb-4 text-center font-weight-bold">
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </h3>
        <div className={`${classes.form_group} form-group`}>
          <label htmlFor="">Email:</label>
          <input
            type="email"
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
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
        </div>

        {isLogin && orRegister}
      </form>
    </div>
  );
};

export default AuthForm;
