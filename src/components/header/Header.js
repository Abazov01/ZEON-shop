import React, { useEffect, useState } from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import glass from "../../assets/header/search.png";
import shop from "../../assets/header/shop.png";
import shopnot from "../../assets/header/shop-not.png";
import heartnot from "../../assets/header/heart-not.png";
import heart from "../../assets/header/heart.png";
import MenuModal from "./MenuModal";
import X from "../../assets/modal/X.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { prompts } from "../../actions";
import { signOut, getAuth } from "firebase/auth";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [value, setValue] = useState("");
  const [searchh, setSearch] = useState(false);
  const header = useSelector((state) => state.header);
  const favorite = useSelector((state) => state.booleans.favorite);
  const basket = useSelector((state) => state.booleans.basket);
  let hints = useSelector((s) => s.hints);
  hints = hints && Array.from(hints);
  const path = useLocation().pathname.split("/");
  const isAuth = useSelector(({user:{isAuth}})=> isAuth)


  const search = (e) => {
    e.preventDefault();
    if (value) {
      navigate(`/result/${value}`);
      window.location.reload();
    }
    setValue("");
  };

  if (searchh) {
    document.body.style.overflow = "hidden";
    // document.body.style.background = "red";
  } else {
    document.body.style.overflow = "auto";
    // document.body.style.background = "black";
  }
  const handleChange = (e) => {
    setValue(e.target.value);
    dispatch(prompts(e.target.value));
  };
  const auth =  getAuth()

  const logout = async() => {
    const auth = await getAuth()
    signOut(auth)
    localStorage.removeItem('currentUser')
    navigate('/')
  }
  return (
    <div className="header">
      <div className="header__block-1">
        <div className="container">
          <div className="header__row">
            <ul className="header__1-left">
              <NavLink to={"/about"}>О нас</NavLink>
              <NavLink to={"/collections"}>Коллекции</NavLink>
              <NavLink to={"/news"}>Новости</NavLink>
            </ul>
            <div className="header__1-right">
              {path[1] !== "login" && path[1] !=='private' ? (
                <NavLink className="-login" to={isAuth ? '/private' : "/login"}>
                  {isAuth ?  'Личный кабинет ':"Войти"}
                </NavLink>
              ):(
                <p onClick={logout} className="-login">Выйти</p>
              )}
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
            <NavLink to={"/"} className="header__2-start">
              <img src={header.logo} alt="" />
            </NavLink>
            <div className="header__2-form">
              <form onSubmit={search} className="header__form">
                <input
                  type="text"
                  className="header__form-input"
                  placeholder="Поиск"
                  onChange={handleChange}
                  value={value}
                />
                <button className="header__form-btn">
                  <img src={glass} alt="" />
                </button>
                {hints && hints.length > 0 && value.length > 0 && (
                  <div className="hints-wrapper">
                    {hints.map((e, i) => {
                      return (
                        <div
                          onClick={() => {
                            navigate(`/result/${e}`);
                            window.location.reload();
                          }}
                          className="-child"
                          key={i}
                        >
                          {e}
                        </div>
                      );
                    })}
                  </div>
                )}
              </form>
            </div>
            <div className="header__2-end">
              <div className="header__end">
                <NavLink to={"/favorite"} className="header__end-favorite">
                  <img src={favorite ? heartnot : heart} alt="" />
                  <span>Избранное</span>
                </NavLink>
                <NavLink to={"/basket"} className="header__end-card">
                  <img src={basket ? shopnot : shop} alt="" />
                  <span>Корзина</span>
                </NavLink>
              </div>
            </div>
            <div onClick={() => setSearch((e) => !e)} className="header__modal">
              <img src={searchh ? X : glass} alt="" />
            </div>
            <MenuModal menu={menu} setMenu={setMenu} />
            <form
              onSubmit={search}
              style={{ display: searchh ? "block" : "none" }}
              className="search-modal"
              onClick={() => setSearch((e) => !e)}
              onScroll={() => window.scrollTo({ top: 0 })}
            >
              <input
                type="text"
                placeholder="Поиск"
                onChange={handleChange}
                value={value}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
              {hints && hints.length > 0 && value.length > 0 && (
                <div className="hints-wrapper">
                  {hints.map((e, i) => {
                    return (
                      <div
                        onClick={() => {
                          navigate(`/result/${e}`);
                          window.location.reload();
                        }}
                        className="-child"
                        key={i}
                      >
                        {e}
                      </div>
                    );
                  })}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
