import React, { useContext, useRef, useState } from "react";
import classes from "./Checkout.module.css";
import emailjs from "emailjs-com";

import CartContext from "../../store/cart-context";
import { CheckCircleOutlined } from "@ant-design/icons";

const isEmpty = (value) => value.trim() === "";
const isNotNumberPhone = (value) => value.trim().length === 10 && Number(value);

const Checkout = (props) => {
  const [formInputValid, setFormInputValid] = useState({
    name: true,
    phoneNumber: true,
    address: true,
    email: props.user.email,
  });

  const nameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const addressInputRef = useRef();
  const cartCtx = useContext(CartContext);

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPhoneNumberIsValid =
      isNotNumberPhone(enteredPhoneNumber) && !isEmpty(enteredPhoneNumber);
    const enteredAddressIsValid = !isEmpty(enteredAddress);

    setFormInputValid({
      name: enteredNameIsValid,
      phoneNumber: enteredPhoneNumberIsValid,
      address: enteredAddressIsValid,
      email: props.user.email,
    });

    const formIsValid =
      enteredNameIsValid && enteredPhoneNumberIsValid && enteredAddressIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      phoneNumber: enteredPhoneNumber,
      address: enteredAddress,
    });

    let invoice = "";
    for (var i in cartCtx.items) {
      invoice += `<tr style="height: 30px; background-color: rgb(246, 244, 243); text-align: center;">
            <th scope="row">${Number(i) + 1}</th>
            <td>${cartCtx.items[i].name}</td>
            <td>${cartCtx.items[i].amount}</td>
            <td>${new Intl.NumberFormat().format(cartCtx.items[i].price)}</td>
        </tr>  `;
    }

    emailjs.send(
      "service_97n2swa",
      "template_va863h5",
      {
        name: enteredName,
        email: props.user.email,
        subject: "Xác nhận đơn hàng!",
        message: `
            <table class="table"  style="width: 100%;">
                <thead style="background-color: tan; height: 30px;">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá</th>
                    </tr>
                </thead>
                <tbody>
                   ${invoice}                  
                </tbody>
                </table>
            `,
        totalAmount:
          new Intl.NumberFormat().format(cartCtx.totalAmount) + " VND",
      },
      "user_iacEpezHMPueNSO3W3Ub4"
    );
  };
  return (
    <>
      <div className={classes.overlay} onClick={props.onClose} />

      <form className={classes.form} onSubmit={confirmHandler}>
        {!props.isSubmitting && (
          <>
            <div className="form-group mb-4">
              <label className="font-weight-bold">Họ và tên</label>
              <input
                type="text"
                className="form-control mt-2"
                ref={nameInputRef}
              />
              {!formInputValid.name && (
                <small class="form-text text-muted">
                  Bạn chưa nhập họ và tên!
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label className="font-weight-bold">Số điện thoại</label>
              <input
                type="text"
                className="form-control mt-2"
                ref={phoneNumberInputRef}
              />
              {!formInputValid.phoneNumber && (
                <small class="form-text text-muted">
                  Số điện thoại chưa đúng định dạng!
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label className="font-weight-bold">Địa chỉ</label>
              <input
                type="text"
                className="form-control mt-2"
                ref={addressInputRef}
              />
              {!formInputValid.address && (
                <small class="form-text text-muted">
                  Bạn chưa nhập địa chỉ!
                </small>
              )}
            </div>
            <div className={classes.btn}>
              <button
                className="btn btn-danger"
                onClick={props.onClose}
                type="button"
              >
                Đóng
              </button>
              <button className="btn btn-primary">Đặt hàng</button>
            </div>
          </>
        )}
      </form>
      {props.isSubmitting && (
        <div className={classes.alert}>
          <CheckCircleOutlined style={{ fontSize: 50 }} />
          <p>Thanh toán thành công!</p>
        </div>
      )}
    </>
  );
};

export default Checkout;
