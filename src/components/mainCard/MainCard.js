import React, { useState } from "react";
import "./mainCard.scss";
import love from "../../assets/home/heart.png";
import loveRed from "../../assets/home/heart-red.png";

const HiddenImgs = ({ images, setMain }) => {
  return (
    <div className="-opacity">
      {images &&
        images.map((e, i) => {
          return (
            <div onMouseMove={() => setMain(i)} key={i} className="">
              <img src={e} alt="" />
            </div>
          );
        })}
    </div>
  );
};

const Discount = ({ discount }) => {
  return (
    <>
      <div className="-triangle"></div>
      <p className="-text">{discount}%</p>
    </>
  );
};

export default function MainCard({
  images,
  price,
  name,
  discount,
  size,
  colors,
  id,
}) {
  const [index, setIndex] = useState(0);
  const [fav, setFav] = useState(false);
  const [hover, setHover] = useState("none");
  const scrollWidth = images && 100 / images.length;
  let newPrice;
  if (discount > 0) {
    newPrice = price - Math.floor((price / 100) * discount);
  }
  return (
    <div className="mainCard">
      <div
        onMouseMove={() => setHover("block")}
        onMouseLeave={() => setHover("none")}
        className="__start"
      >
        <img src={images && images[index]} alt="..." />
        <HiddenImgs images={images} setMain={setIndex} />
        {discount > 0 ? <Discount discount={discount} /> : null}
        <div style={{ display: hover }} className="-favicon">
          <img src={fav ? loveRed : love} alt="" />
        </div>
        <div  style={{ display: hover }} className="-scroll">
          <div
            style={{
              width: scrollWidth + "%",
              marginLeft: index * scrollWidth + "%",
            }}
          ></div>
        </div>
      </div>
      <div className="__end">
        <h4 className="-name">{name}</h4>
        <p className="-price">
          <span className="-newprice">{discount ? newPrice : price}р </span>
          {discount ? <span className="-oldprice">{price}р</span> : null}
        </p>
        <p className="-size">
          Размер:
          <span>
            {size?.start}-{size?.end}
          </span>
        </p>
        <div className="-colors">
          {colors &&
            colors.map((e, i) => {
              return (
                <div key={i} className="-wrapper">
                  <div style={{ background: e }} className="-color"></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
