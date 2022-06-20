import { useSelector } from "react-redux";
import React, { useState } from "react";
import "./header.scss";
import shop from "../../assets/header/shop.png";
import shopnot from "../../assets/header/shop-not.png";
import heartnot from "../../assets/header/heart-not.png";
import heart from "../../assets/header/heart.png";
import close from "../../assets/modal/X.png";
import { Modal } from "./../fixedModal/FixModal";
import ChatModal from "../chatModal/ChatModal";
import { NavLink } from 'react-router-dom';

export default function MenuModal({ menu, setMenu }) {
  const [chat, setChat] = useState();
  const [mess, setMess] = useState(false);

  const header = useSelector((state) => state.header);
  const favorite = useSelector((state) => state.booleans.favorite);
  const basket = useSelector((state) => state.booleans.basket);
  const telegram = useSelector((state) => state.footer.social[1]?.link);
  const whatsapp = useSelector((state) => state.footer.social[2]?.link);

  if(menu){
    // document.body.style.overflow = "hidden";
  }else{
    // document.body.style.overflow = "auto";
  }
  return (
      <div
        onClick={() => setMenu(false)}
        className={menu ? "overlay show-overlay" : "overlay"}
      >
        <div onClick={(e) => e.stopPropagation()} className="-content">
          <div className="-top">
            <div className="-title">
              <div className="-menu">Меню</div>
              <div onClick={() => setMenu(false)} className="-closeicon">
                <img src={close} alt="" />
              </div>
            </div>
            <div className="-body">
              <NavLink onClick={() => setMenu(false)} to={'/about'} className="-first">О нас</NavLink>
              <NavLink  onClick={() => setMenu(false)} to={'/news'} className="-first">Новости</NavLink>
              <NavLink  onClick={() => setMenu(false)} to={'/collections'} className="-first">Коллекции</NavLink>
              <span></span>
              <NavLink  onClick={() => setMenu(false)} to={'/favorite'} className="-second">
                <img src={favorite ? heartnot : heart} alt="" />
                Избранное
              </NavLink>
              <NavLink  onClick={() => setMenu(false)} to={'/basket'} className="-second">
                <img src={basket ? shopnot : shop} alt="" />
                Корзина
              </NavLink>
            </div>
          </div>
          <div className="-bottom">
            <div className="-title">Свяжитсь с нами:</div>
            <div className="-phone">
              Тел: <span>{header.number}</span>
            </div>
            <div className="-icons">
              <Modal w={whatsapp} t={telegram} setChat={setChat} />
            </div>
            <ChatModal chat={chat} setChat={setChat} setMess={setMess} />
          </div>
        </div>
      </div>
  );
}
