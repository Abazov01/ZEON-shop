import React, { useEffect, useState } from "react";
import "./mainCard.scss";
import lovee from "../../assets/home/heart.png";
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
  home
}) {
  const [index, setIndex] = useState(0);
  const [fav, setFav] = useState(false);
  const [hover, setHover] = useState("none");
  const [cId, setCId] = useState();
  const [love, setLove] = useState('none')
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
    leave()
  }, []);

  
  useEffect(()=>{
    if(window.innerWidth < 520) setLove('block')
  })

  
  const leave = () => {
    if(isFav(id)){
      setHover('none')
      setLove('block')
    }else{
      setHover('none')
      setLove('none')
    }
  }
  const favorite = home ? fav : isFav(id)
  return (
    <div
      onClick={() => {navigate(`/collections/${cId}/${id}`);window.scrollTo({top:0, behavior:'smooth'})}}
      className="mainCard"
    >
      <div
        onMouseMove={() => {setHover("block");setLove('block')}}
        onMouseLeave={() => leave()}
        className="__start"
      >
        <img src={images && images[index]} alt="..." />
        <HiddenImgs images={images} setMain={setIndex} />
        {discount > 0 ? <Discount discount={discount} /> : null}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: love }}
          className="-favicon"
        >
          <img
            onClick={() => {
              fromToFav(id, dispatch);
              setFav(isFav(id));
              isFav(id) ? setLove("block") : setLove('none')
              setAction && setAction((a) => !a);
            }}
            src={ favorite ? loveRed : lovee}
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
