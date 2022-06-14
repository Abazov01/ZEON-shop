import React, { useEffect, useState } from "react";
import { fromOrToCard, getCard, increment } from "../../actions";
import close from "../../assets/modal/X.png";
import "./basket.scss";
import incr from "../../assets/basket/incr.svg";
import decr from "../../assets/basket/decr.svg";
import disable from "../../assets/basket/disabled.svg";
import { decrement } from "./../../actions/index";
import { useDispatch } from "react-redux";
import { card } from "../../redux/reducers/booleanReducer";
import Order from "./Order";
import Offer from './../../components/offer/Offer';
import OrderModal from "./OrderModal";

export default function Basket() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [upload, setUpload] = useState();
  const [modal, setModal] = useState(true)
  useEffect(() => {
    setData(getCard());
  }, [upload]);

  return (
    <div className="basket">
      <div className="container">
        <div className="-row">
          <div className="-left">
            {data && data.length > 0 ? (
              data.map((e, i, arr) => {
                const {
                  name,
                  id,
                  price,
                  discount,
                  size: { start, end },
                  count,
                  color,
                  img,
                } = e;
                const newprice = discount
                  ? Math.ceil(price - (price / 100) * discount)
                  : price;
                return (
                  <div key={i} className="-wrapper">
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
                        <span className="-old">
                          {discount ? price + "p" : null}
                        </span>
                      </p>
                      <div className="-counter">
                        <div
                          onClick={
                            count > 1
                              ? () => {
                                  decrement(arr[i]);
                                  setUpload(!upload);
                                }
                              : null
                          }
                          className="-decr"
                        >
                          <img src={count === 1 ? disable : decr} alt="" />
                        </div>
                        <p className="-count">{count}</p>
                        <div
                          onClick={() => {
                            increment(arr[i]);
                            setUpload(!upload);
                          }}
                          className="-incr"
                        >
                          <img src={incr} alt="" />
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        fromOrToCard(arr[i], dispatch);
                        setUpload(!upload);
                      }}
                      className="-close"
                    >
                      <img src={close} alt="" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h3>Корзина</h3> <p>У Вас пока нет товаров в корзине</p>
              </div>
            )}
          </div>
          {data && data.length > 0 ? (
            <div className="-right">
              <Order setModal={setModal} />
            </div>
          ) : null}
        </div>
        {data && data.length <= 0 ? <div className="offerr"><Offer title={'Возможно вас заинтересует'}/></div> :null}
        {modal ? <OrderModal setModal={setModal}/> : null}
      </div>
    </div>
  );
  
}