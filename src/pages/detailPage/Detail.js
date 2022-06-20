import React, { useEffect, useState } from "react";
import Offer from "../../components/offer/Offer";
import "./detail.scss";
import { NavLink, useParams } from "react-router-dom";
import {
  getDetail,
  isFav,
  fromToFav,
  fromOrToCard,
  isCard,
} from "./../../actions/index";
import love from "../../assets/header/detlove.png";
import love2 from "../../assets/header/detlove2.png";
import basket from "../../assets/header/Icon.png";
import { useDispatch } from "react-redux";

export default function Detail() {
  const [data, setData] = useState([]);
  const [fav, setFav] = useState();
  const [card, setCard] = useState(false);
  const { productid } = useParams();
  const [currColor, setCurrColor] = useState("#73A39D");

  const dispatch = useDispatch();

  useEffect(() => {
    const fn = async () => {
      const data = await getDetail(productid);
      setData(data);
      setFav(isFav(productid));
      setCard(isCard(productid, currColor));
    };
    fn();
  }, []);

  useEffect(()=>{
    setCard(isCard(id, currColor));
  },[currColor])

  const {
    id,
    images,
    size,
    material,
    compound,
    description,
    articul,
    discount,
    price,
    collection,
    colors,
    name,
  } = data;
  const arr = images && [images[0], images[0], images[0], images[0]];
  const count = size && (size.end - size.start) / 2 + 1;
  const newPrice =
    discount > 0 ? Math.ceil(price - (price / 100) * discount) : price;

  const addOrRemoveCard = (
    id,
    price,
    discount,
    size,
    color,
    name,
    img,
    count
  ) => {
      fromOrToCard({ id, color, name, price, discount, size, img, count }, dispatch);
      setCard(isCard(id, currColor));
   
  };
  
  return (
    <div className="detail">
      <div className="container">
        <div className="-row">
          <div className="-left">
            <div className="-start">
              {arr &&
                arr.map((e, i) => {
                  return (
                    <div key={i} className="-wrapper">
                      <img src={e} alt="" />
                    </div>
                  );
                })}
            </div>
            <div className="-end">
              {arr &&
                arr.map((e, i) => {
                  return (
                    <div key={i} className="-wrapper">
                      <img src={e} alt="" />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="-right">
            <h2 className="-name">{name}</h2>
            <p className="-articul">
              Артикул: <span>{articul}</span>
            </p>
            <div className="-colors">
              <span>Цвет:</span>
              {colors &&
                colors.map((e, i) => {
                  return (
                    <div
                      onClick={() => {
                        setCurrColor(e);
                      }}
                      key={i}
                      className={
                        currColor == e ? "-wrapper -active" : "-wrapper"
                      }
                    >
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
            <p className="-price">
              <span className="-new">{newPrice}p</span>{" "}
              <span
                className="-old"
                style={{ display: discount && discount > 0 ? "block" : "none" }}
              >
                {price}p
              </span>
            </p>
            <h4 className="-about">О товаре:</h4>
            <p className="-desc">{description}</p>
            <div className="-row -detail">
              <div className="-first">
                <p className="-size">
                  Размерный ряд: <span>{size?.start + "-" + size?.end}</span>
                </p>
                <div className="-count">
                  Количество в линейке: <span>{count}</span>
                </div>
              </div>
              <div className="-second">
                <div className="-compound">
                  Состав ткани: <span>{compound}</span>
                </div>
                <div className="-material">
                  Материал: <span>{material}</span>
                </div>
              </div>
            </div>
            {card ? (
              <div className="-btn">
                <NavLink to={"/basket"} className="-card">
                  Перейти в корзину
                </NavLink>
                <div className="-love">
                  <img
                    onClick={() => {
                      fromToFav(productid, dispatch);
                      setFav(isFav(productid));
                    }}
                    src={fav ? love2 : love}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="-btn">
                <div
                  onClick={() =>
                    addOrRemoveCard(
                      id,
                      price,
                      discount,
                      size,
                      currColor,
                      name,
                      images[0],
                      1
                    )
                  }
                  className="-card"
                >
                  <div className="img">
                    <img src={basket} alt="" />
                  </div>
                  Добавить в корзину
                </div>
                <div className="-love">
                  <img
                    onClick={() => {
                      fromToFav(productid, dispatch);
                      setFav(isFav(productid));
                    }}
                    src={fav ? love2 : love}
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <Offer title={"Похожие товары"} />
      </div>
    </div>
  );
}
