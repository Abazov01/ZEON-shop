import React from "react";
import incr from "../../assets/basket/incr.svg";
import decr from "../../assets/basket/decr.svg";
import disable from "../../assets/basket/disabled.svg";
import { decrement2, fromToCard2, getCard2, increment, increment2 } from "../../actions";
import close from "../../assets/modal/X.png";
import { useDispatch } from 'react-redux';
import './orderCard.scss'

export default function OrderCard({ data, arr, i, setUpload }) {
  const {
    name,
    id,
    price,
    discount,
    size: { start, end },
    count,
    color,
    img,
  } = data;

  const dispatch = useDispatch()
  
  
  const newprice = discount
    ? Math.ceil(price - (price / 100) * discount)
    : price;
  return (
    <div className="order-wrapper">
      <div className="-img">
        <img src={img} alt="" />
      </div>
      <div className="-body">
        <h3 className="-name">{name}</h3>
        <div className="-color color-media">
          Цвет:{" "}
          <div className="-frame">
            <div style={{ background: color }}></div>
          </div>
        </div>
        <p className="-size">Размер:{start + "-" + end} </p>
        <div className="-color">
          Цвет:{" "}
          <div className="-frame">
            <div style={{ background: color }}></div>
          </div>
        </div>
        <p className="-price">
          <span className="-new">{newprice}p</span>
          <span className="-old">{discount ? price + "p" : null}</span>
        </p>
        <div className="-counter">
          {arr && <div
            onClick={
              count > 1
                ? () => {
                    decrement2(arr[i]).then(() => setUpload(upload => !upload));
                  }
                : null
            }
            className="-decr"
          >
            <img src={count <= 1 ? disable : decr} alt="" />
          </div>}
          <p style={{margin: 0}} className="-count">{!arr && <span>Количество:</span>}{count}</p>
          {arr && <div
            onClick={() => {
              increment2(arr[i]).then(() => setUpload(upload => !upload));
            }}
            className="-incr"
          >
            <img src={incr} alt="" />
          </div>}
        </div>
      </div>
      {arr && <div
        onClick={() => {
          fromToCard2(arr[i], dispatch).then(() => setUpload(upload => !upload));
        }}
        className="-close"
      >
        <img src={close} alt="" />
      </div>}
    </div>
  );
}
