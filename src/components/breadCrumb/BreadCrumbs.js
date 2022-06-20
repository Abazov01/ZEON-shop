import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./bread.scss";
import { NavLink } from "react-router-dom";
import { idToName, bread } from "../../actions/index";
import { useSelector, useDispatch } from "react-redux";
const dictionary = {
  news: "Новости",
  collections: "Коллекции",
  about: "О нас",
  result: "Результаты поиска",
  help: "Помощь",
  favorite: "Избранное",
  basket: "Корзина",
  public: "Публичная оферта",
  product: "Вечернее платье",
};

export default function BreadCrumbs() {
  const dispatch = useDispatch();
  let location = useLocation().pathname.split("/");
  const breadd = useSelector((s) => s.bread);

  useEffect(() => {
    dispatch(bread(location));
  },[useLocation()]);
  const display = location[0] == "" && location[1] == "" ? "none" : "block";

  return (
    <div style={{ display }} className="bread">
      <div className="container bread">
        <div className="-content">
          <NavLink to={"/"}> Главная </NavLink>
          {breadd &&
            breadd.map((e, i,arr) => {
              return (
                <div style={{display: 'flex'}} key={i}>
                  <span>/</span>{" "}
                  {arr.length == 1 ? <div className="one">{dictionary[e]}</div> :<NavLink
                    to={
                      i == 0
                        ? "/collections"
                        : i == 1
                        ? `/collections/${location[2]}`
                        : `/collections/${location[2]+'/'+location[3]}`
                    }
                  >
                    {i == 0 ? dictionary[e] : e}
                  </NavLink>}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

