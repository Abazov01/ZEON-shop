import React, { useState } from "react";
import "./header.scss";
import { useSelector } from "react-redux";
import glass from "../../assets/header/search.png";
import shop from "../../assets/header/shop.png";
import shopnot from "../../assets/header/shop-not.png";
import heartnot from "../../assets/header/heart-not.png";
import heart from "../../assets/header/heart.png";
import close from "../../assets/modal/X.png";
import FixModal from "../fixedModal/FixModal";
import { Modal } from './../fixedModal/FixModal';
import ChatModal from "../chatModal/ChatModal";

export default function Header() {
  const [chat, setChat] = useState()
  const [mess, setMess] = useState(false)
  const [menu, setMenu] = useState(false)
  const header = useSelector((state) => state.header);
  const favorite = useSelector((state) => state.booleans.favorite);
  const basket = useSelector((state) => state.booleans.basket);
  const telegram = useSelector((state) => state.footer.social[1]?.link);
  const whatsapp = useSelector((state) => state.footer.social[2]?.link);
  const search = (e) => {
    e.preventDefault();
  };
  return (
    <div className="header">
      <div className="header__block-1">
        <div className="container">
          <div className="header__row">
            <ul className="header__1-left">
              <li>О нас</li>
              <li>Коллекции</li>
              <li>Новости</li>
            </ul>
            <div className="header__1-right">
              <span>Тел: </span>
              <a href={header.link}>{header.number}</a>
            </div>
          </div>
        </div>
      </div>
      <div className="header__block-2">
        <div className="container">
          <div className="header__row">
            <div onClick={()=> setMenu(true)} className="header__2-burger">
              <div className="wrapper">
                <span></span>
              </div>
            </div>
            <div className="header__2-start">
              <img src={header.logo} alt="" />
            </div>
            <div className="header__2-form">
              <form onSubmit={(e) => search(e)} className="header__form">
                <input
                  type="text"
                  className="header__form-input"
                  placeholder="Поиск"
                />
                <button className="header__form-btn">
                  <img src={glass} alt="" />
                </button>
              </form>
            </div>
            <div className="header__2-end">
              <div className="header__end">
                <div className="header__end-favorite">
                  <img src={favorite ? heartnot : heart} alt="" />
                  Избранное
                </div>
                <div className="header__end-card">
                  <img src={basket ? shopnot : shop} alt="" />
                  Корзина
                </div>
              </div>
            </div>
            <div className="header__modal">
              <img src={glass} alt="" />
            </div>
              <div onClick={()=> setMenu(false)} className={menu ? 'overlay show-overlay' : 'overlay'}>
                <div onClick={e=>e.stopPropagation()} className="-content">
                  <div className="-top">
                    <div className="-title">
                      <div className="-menu">Меню</div>
                      <div onClick={()=> setMenu(false)} className="-closeicon">
                        <img src={close} alt="" />
                      </div>
                    </div>
                    <div className="-body">
                      <div className="-first">О нас</div>
                      <div className="-first">Новости</div>
                      <div className="-first">Коллекции</div>
                      <span></span>
                      <div className="-second">
                        <img src={favorite ? heartnot : heart} alt="" />
                        Избранное
                      </div>
                      <div className="-second">
                        <img src={basket ? shopnot : shop} alt="" />
                        Корзина
                      </div>
                    </div>
                  </div>
                  <div className="-bottom">
                    <div className="-title">Свяжитсь с нами:</div>
                    <div className="-phone">Тел: <span>{header.number}</span></div>
                    <div className="-icons"><Modal w={whatsapp} t={telegram} setChat={setChat} /></div>
                    <ChatModal chat={chat} setChat={setChat} setMess={setMess}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
