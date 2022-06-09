import React, { useState } from "react";
import "./header.scss";
import { useSelector } from "react-redux";
import glass from "../../assets/header/search.png";
import shop from "../../assets/header/shop.png";
import shopnot from "../../assets/header/shop-not.png";
import heartnot from "../../assets/header/heart-not.png";
import heart from "../../assets/header/heart.png";
import MenuModal from "./MenuModal";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate()
  const [menu, setMenu] = useState(false);
  const [value, setValue] = useState('')
  const header = useSelector((state) => state.header);
  const favorite = useSelector((state) => state.booleans.favorite);
  const basket = useSelector((state) => state.booleans.basket);
  const search = (e) => {
    e.preventDefault();
    if(value){
      navigate(`/result/${value}`)
    }
    setValue('')
  };
  if (menu) {
    window.onscroll = function () {
      return false;
    };
  }
  return (
    <div className="header">
      <div className="header__block-1">
        <div className="container">
          <div className="header__row">
            <ul className="header__1-left">
              <NavLink to={'/about'}>О нас</NavLink>
              <NavLink to={'/collections'}>Коллекции</NavLink>
              <NavLink to={'/news'}>Новости</NavLink>
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
            <div onClick={() => setMenu(true)} className="header__2-burger">
              <div className="wrapper">
                <span></span>
              </div>
            </div>
            <NavLink to={'/'} className="header__2-start">
              <img src={header.logo} alt="" />
            </NavLink>
            <div className="header__2-form">
              <form onSubmit={(e) => search(e)} className="header__form">
                <input
                  type="text"
                  className="header__form-input"
                  placeholder="Поиск"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
                <button className="header__form-btn">
                  <img src={glass} alt="" />
                </button>
              </form>
            </div>
            <div className="header__2-end">
              <div className="header__end">
                <NavLink to={'/favorite'} className="header__end-favorite">
                  <img src={favorite ? heartnot : heart} alt="" />
                  Избранное
                </NavLink>
                <NavLink to={'/basket'} className="header__end-card">
                  <img src={basket ? shopnot : shop} alt="" />
                  Корзина
                </NavLink>
              </div>
            </div>
            <div className="header__modal">
              <img src={glass} alt="" />
            </div>
            <MenuModal menu={menu} setMenu={setMenu}/>
          </div>
        </div>
      </div>
    </div>
  );
}
