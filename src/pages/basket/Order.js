import React, { useState } from "react";
import "./basket.scss";
import line from "../../assets/basket/line.png";
import { lineCount, price } from "../../actions";
import { productCount, discount } from "./../../actions/index";
import { useEffect } from "react";

export default function Order({setModal}) {
  const [show, setShow] = useState();
  useEffect(() => {
    if (window.innerWidth <= 320) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [window.innerWidth]);
  return (
    <div className="order">
      <h3 className="order-title">Сумма заказа</h3>
      <div style={{ display: show ? "block" : "none" }}>
        <div className="amount-line">
          <h4>Количество линеек:</h4>
          <p>{lineCount()}</p>
        </div>
        <div className="amount-product">
          <h4>Количество товаров:</h4>
          <p>{productCount()}</p>
        </div>
        <div className="price">
          <h4>Стоимость:</h4>
          <p>{price().toLocaleString()}</p>
        </div>
        <div className="discount">
          <h4>Скидка:</h4>
          <p>{discount().toLocaleString()}</p>
        </div>
        <div className="line">
          <img src={line} alt="" />
        </div>
      </div>
      <div className="total">
        <h4>Итого к оплате:</h4>
        <p>{(price() - discount()).toLocaleString()}</p>
      </div>
      <div onClick={() => setShow(!show)} className="handler">
        {show ? "Скрыть" : "Информация о заказе"}
      </div>
      <div onClick={() => setModal(modal => !modal)} className="order-button">Оформить заказ</div>
    </div>
  );
}
