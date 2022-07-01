import React from "react";
import "./history.scss";
import { useState, useEffect } from "react";
import { getAllOrders } from "./../../../../actions/index";
import down from "../../../../assets/modal/down.png";
import up from "../../../../assets/modal/up.png";
import OrderCard from "./../../../../components/orderCard/OrderCard";

const titleStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "40%",
};

const HistoryAccord = ({ data, i }) => {
  const [accord, setAccord] = useState();
  const [index, setIndex] = useState();
  return (
    <div className="wrapper">
      <div
        onClick={() => {
          setAccord((t) => !t);
          setIndex(i);
        }}
        className="head"
        style={{borderBottom: accord && index == i ? 'none': '1px solid'}}
      >
        <div style={titleStyle}>
          <p onClick={(e) => e.stopPropagation()}>
            <span>Date:</span> {data.date}
          </p>
          <p onClick={(e) => e.stopPropagation()}>
            <span>Time:</span> {data.oclock}
          </p>
        </div>
        <div style={{transform: accord && index == i ?"rotate(180deg)" : 'rotate(0deg)'}} className="img">
          <img src={down} alt="" />
        </div>
      </div>
      {accord && index && (
        <div className="body">
          {data?.data.map((e, i) => {
            return <OrderCard key={i} data={e} />;
          })}
        </div>
      )}
    </div>
  );
};

export default function History() {
  const [data, setData] = useState();
  useEffect(() => {
    getAllOrders().then((d) => setData(d));
  }, []);
  console.log(data);
  return (
    <div className="history">
      <div className="title">История заказов:</div>
      <div className="accordion">
        {data?.map((e, i) => {
          return <HistoryAccord i={i} key={i} data={e} />;
        })}
      </div>
    </div>
  );
}
