import React, { useEffect, useState } from "react";
import "./orderModal2.scss";
import close from "../../../../assets/modal/X.png";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Thanks from "../../../../components/chatModal/Thanks";
import { isSended } from "../../../../redux/reducers/booleanReducer";
import { clearCard2, sendMessage } from "../../../../actions";
import OrderThanks from "../orderThanks/OrderThanks";

export default function OrderModal2({ setModal, data }) {
  const phons = useSelector((s) => s.phons);
  const isSend = useSelector((s) => s.booleans.isSended);
  const dispatch = useDispatch();

  const [agree, setAgree] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(agree);
    if (agree) {
      const { email, phone, country, city, name, surname } = user;
      let text = `
    Здравствуйте меня зовут ${name + " " + surname}, 
    я хочу заказать у вас:
     ${data.map(
       (e) => `
     id: ${e.id}, color: ${e.color} - ${e.count}шт.`
     )}
    email: ${email}
    телефонный номер: ${phone}
    страна: ${country}
    город:${city}`;
      sendMessage(text);
      dispatch(isSended(true));
      clearCard2();
    }
  };

  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="order-modal">
      <div onClick={() => setModal((modal) => !modal)} className="overlay">
        {isSend ? (
          <OrderThanks setModal={setModal} />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="-title">
              <p className="-text">Оформление заказа</p>
              <p onClick={() => setModal((modal) => !modal)} className="-close">
                <img src={close} alt="" />
              </p>
            </div>
            <div className="text">
              <span>Имя:</span>
              <strong>{user.name}</strong>
            </div>
            <div className="text">
              <span>Фамилия:</span>
              <strong>{user.surname}</strong>
            </div>
            <div className="text">
              <span>Email:</span>
              <strong>{user.email}</strong>
            </div>
            <div className="text">
              <span>Телефон:</span>
              <strong>{user.phone}</strong>
            </div>
            <div className="text">
              <span>Страна:</span>
              <strong>{user.country}</strong>
            </div>
            <div className="text">
              <span>Город:</span>
              <strong>{user.city}</strong>
            </div>
            <div className="agree">
              <label htmlFor="check">
                <input
                  onChange={(e) => setAgree(e.target.checked)}
                  id="check"
                  type="checkbox"
                />{" "}
                Согласен с условиями
              </label>
              <a href="/public" target="_blank">
                {" "}
                публичной оферты
              </a>
            </div>
            <label
              style={{ background: agree ? "#000" : "#979797" }}
              className="btn"
            >
              <button>Заказать</button>
            </label>
          </form>
        )}
      </div>
    </div>
  );
}
