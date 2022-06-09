import React from "react";
import "./homeSection.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { statuses } from "./../../../../actions/index";
import MainCard from "../../../../components/mainCard/MainCard";

export default function HomeSection({ title }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const [display, setDisplay] = useState("inline");
  let limit = title == "Хит продаж" ? 8 : 4;
  let q = title == "Хит продаж" ? 16 : 8;
  const products = useSelector((state) =>
    title == "Хит продаж" ? state.statuses.hits : state.statuses.news
  );
  useEffect(() => {
    dispatch(statuses(title, limit, 1));
    if (window.innerWidth <= 320) setDisplay("none");
  }, []);
  const handleMore = () => {
    dispatch(statuses(title, limit, page));
    setPage((page) => page + 1);
    if (products.length >= q) setDisplay("none");
  };
  return (
    <div className="homesection">
      <div className="container">
        <h1 className="-title">{title}</h1>
        <div className="-content">
          {products &&
            products.map((e, i) => {
              const { name, images, price, discount, id, size, colors } = e;
              return (
                <div key={id} className="-wrapper">
                  <MainCard
                    images={images}
                    name={name}
                    price={price}
                    discount={discount}
                    id={id}
                    size={size}
                    colors={colors}
                  />
                </div>
              );
            })}
        </div>
        </div>
        <button
          style={{ display: display }}
          onClick={() => handleMore()}
          className="-more"
        >
          Ещё
        </button>
      </div>
  );
}
