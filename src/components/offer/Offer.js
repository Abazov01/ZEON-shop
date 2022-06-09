import React from "react";
import SecondCard from "../secondCard/SecondCard";
import "./offer.scss";

export default function Offer({ title, data }) {
  return (
    <div className="offer">
      <div className="container">
        <h4 className="-title">{title}</h4>
        <div className="__row">
          {data &&
            data.map((e, i) => {
              const { id, images, colors, price, name, discount, size } = e;
              return (
                <div className="-wrapper">
                  <SecondCard
                    id={id}
                    images={images}
                    colors={colors}
                    price={price}
                    name={name}
                    discount={discount}
                    size={size}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
