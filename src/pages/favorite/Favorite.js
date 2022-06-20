import React from "react";
import "./favorite.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { favorite } from "./../../redux/reducers/booleanReducer";
import Offer from "../../components/offer/Offer";
import { idToProduct } from "./../../actions/index";
import MainCard from "../../components/mainCard/MainCard";

export default function Favorite() {
  const init = window.innerWidth < 600 ? 4 : 8
  const incr = window.innerWidth < 600 ? 2 : 4
  const dispatch = useDispatch();
  const [action, setAction] = useState(false);
  const [product, setProduct] = useState([]);
  const [count, setCount ] = useState(init);
  const scroll = window.innerWidth == 600 ? 400 : 10
  useEffect(()=>{
      let ids = JSON.parse(localStorage.getItem('fav'))
      async function fn (){
          const data = await idToProduct(ids)
          setProduct(data)
      }
      fn()
  },[action])
 
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  const scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    if (scrollHeight - (scrollTop + windowHeight) < scroll) {
        setTimeout(()=>{
          setCount(count => count+incr)
        },500)
    }
  };

  

  return (
    <div className="favorite">
      <div className="container">
        <h2 className="-title">Избранное</h2>
        <div className="-secondary">
          {Array.isArray(product) && product.length > 0
            ? `Товаров в избранном: ${product.length}`
            : "У вас пока нет избранных товаров"}
        </div>
        <div className="-row">
          {product && 
            product.map((e, i) => {
              const { name, images, price, discount, id, size, colors,collection } = e.data;
              if(i < count){
                return <div key={i} className="-wrapper">
                <MainCard
                  images={images}
                  name={name}
                  price={price}
                  discount={discount}
                  id={id}
                  size={size}
                  colors={colors}
                  collectName={collection}
                  setAction={setAction}
                />
            </div>;
              }
              
            })}
        </div>
        {Array.isArray(product) && product.length > 0 ? null : (
          <Offer setAction={setAction} title={"Возможно вас заинтересует"} />
        )}
      </div>
    </div>
  );
}
