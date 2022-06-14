import React, { useEffect, useState } from "react";
import "./mainCard.scss";
import love from "../../assets/home/heart.png";
import loveRed from "../../assets/home/heart-red.png";
import { NavLink, useNavigate } from "react-router-dom";
import { fromToFav, isFav, nameToId } from "../../actions";
import { useDispatch } from "react-redux";

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
  collectName,
  setAction,
}) {
  const [index, setIndex] = useState(0);
  const [fav, setFav] = useState(false);
  const [hover, setHover] = useState("none");
  const [cId, setCId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scrollWidth = images && 100 / images.length;
  let newPrice;
  if (discount > 0) {
    newPrice = price - Math.floor((price / 100) * discount);
  }

  useEffect(() => {
    const fn = async () => {
      const collectId = await nameToId(collectName);
      setCId(collectId);
    };
    fn();
    setFav(isFav(id));
    isFav(id) ? setHover("block") : setHover('none')
  }, []);

  return (
    <div
      onClick={() => navigate(`/collections/${cId}/${id}`)}
      className="mainCard"
    >
      <div
        onMouseMove={() => setHover("block")}
        onMouseLeave={() => isFav(id) ? setHover('block'):setHover("none")}
        className="__start"
      >
        <img src={images && images[index]} alt="..." />
        <HiddenImgs images={images} setMain={setIndex} />
        {discount > 0 ? <Discount discount={discount} /> : null}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: hover }}
          className="-favicon"
        >
          <img
            onClick={() => {
              fromToFav(id, dispatch);
              setFav(isFav(id));
              isFav(id) ? setHover("block") : setHover('none')
              setAction && setAction((a) => !a);
              // window.location.reload()
            }}
            src={fav ? loveRed : love}
            alt=""
          />
        </div>
        <div style={{ display: hover }} className="-scroll">
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
                  <div
                    style={{
                      background: e,
                      border: e == "#FFFFFF" && ".5px solid #e7e7e7",
                    }}
                    className="-color"
                  ></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
