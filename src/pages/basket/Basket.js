import React, { useEffect, useState } from "react";
import { decrement2, fromToCard2, getCard2, increment, increment2 } from "../../actions";
import "./basket.scss";

import { useDispatch, useSelector } from "react-redux";
import Order from "./components/Order";
import Offer from './../../components/offer/Offer';
import { useNavigate } from 'react-router-dom';
import OrderModal2 from "./components/orderModal2/OrderModal2";
import OrderCard from "../../components/orderCard/OrderCard";



export default function Basket() {
  const isAuth = useSelector(s => s.user.isAuth)
  const navigate = useNavigate()
  
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [upload, setUpload] = useState();
  const [modal, setModal] = useState()
  
  useEffect(() => {
    getCard2().then(b => setData(b))
  }, [upload]);

  return (
    <div className="basket">
      <div className="container">
        <div className="-row">
          <div className="-left">
            {isAuth ? data && data.length > 0 ? (
              data.map((e, i, arr) => {
                return (
                  <OrderCard setUpload={setUpload} arr={arr} i={i}  key={i} data={e}/>                  
                );
              })
            ) : (
              <div>
                <h3 className="-title">Корзина</h3 > <p className="-text">У Вас пока нет товаров в корзине</p>
              </div>
            ):(
              <div>Сначала войдите</div>
            )}
          </div>
          {isAuth && data && data.length > 0 ? (
            <div className="-right">
              <Order setModal={setModal} />
            </div>
          ) : null}
        </div>
        {data && data.length <= 0 ? <div className="offerr"><Offer title={'Возможно вас заинтересует'}/></div> :null}
        {modal ? <OrderModal2 setModal={setModal} data={data}/> : null}
      </div>
    </div>
  );
  
}