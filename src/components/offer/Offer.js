import React, { useEffect, useState } from "react";
import MainCard from "../mainCard/MainCard";
import SecondCard from "../secondCard/SecondCard";
import "./offer.scss";

export default function Offer({ title, setAction }) {
  const [data, setData] = useState();
  const get = async () => {
    const req = await fetch(
      `${process.env.REACT_APP_SERVER_API}/products?name_like=The`
    );
    const res = await req.json();
    setData(res);
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <div className="offer">
      <h4 className="-title">{title}</h4>
      <div className="__row">
        {data &&
          data.map((e, i) => {
            const {
              id,
              images,
              colors,
              price,
              name,
              discount,
              size,
              collection,
            } = e;
            return (
              <div key={i} className="-wrapper">
                <MainCard
                  id={id}
                  images={images}
                  colors={colors}
                  price={price}
                  name={name}
                  discount={discount}
                  size={size}
                  collectName={collection}
                  setAction={setAction}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
