import React, { useState } from "react";
import linedash from "../../../assets/basket/line.png";
import { discount2, lineCount2, price2, productCount2 } from "../../../actions";
import { useEffect } from "react";

export default function Order({setModal}) {
  const [show, setShow] = useState();
  const [line, setLine] = useState(0)
  const [product, setProduct] = useState(0)
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    if (window.innerWidth <= 320) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [window.innerWidth]);

  useEffect(()=>{setTotal(price-discount)},[price,discount])
  lineCount2().then(b => setLine(b))
  productCount2().then(b => setProduct(b))
  price2().then(b => setPrice(b))
  discount2().then(b => setDiscount(b))

  return (
    <div className="order">
      <h3 className="order-title">Сумма заказа</h3>
      <div style={{ display: show ? "block" : "none" }}>
        <div className="amount-line">
          <h4>Количество линеек:</h4>
          <p>{line} шт</p>
        </div>
        <div className="amount-product">
          <h4>Количество товаров:</h4>
          <p>{product} шт</p>
        </div>
        <div className="price">
          <h4>Стоимость:</h4>
          <p>{price.toLocaleString()} рубль</p>
        </div>
        <div className="discount">
          <h4>Скидка:</h4>
          <p>{discount.toLocaleString()} рубль</p>
        </div>
        <div className="line">
          <img src={linedash} alt="" />
        </div>
      </div>
      <div className="total">
        <h4>Итого к оплате:</h4>
        <p>{total.toLocaleString()} рубль</p>
      </div>
      <div onClick={() => setShow(!show)} className="handler">
        {show ? "Скрыть" : "Информация о заказе"}
      </div>
      <div onClick={() => setModal(modal => !modal)} className="order-button">Оформить заказ</div>
    </div>
  );
}
