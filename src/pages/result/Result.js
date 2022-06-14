import React, { useEffect, useState } from "react";
import "./result.scss";
import { useParams } from "react-router-dom";
import { searchByName } from "./../../actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MainCard from "../../components/mainCard/MainCard";
import Paginate from "../../components/paginate/Paginate";
import Offer from "../../components/offer/Offer";

export default function Result() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const data = useSelector((state) => state.searchResult.data);
  const total = useSelector((state) => state.searchResult.total);
  let limit = 8
  const [page, setPage] = useState()
console.log(page)
  useEffect(() => {
    dispatch(searchByName(name, limit, page));
  }, [page]);

  return (
    <div className="result">
      <div className="container">
        <h2 className="-title">Результаты поиска по запросу: {name}</h2>
        <div className="-row">
          {data && data.length > 0 ? (
            data.map((e, i) => {
              const {
                name,
                images,
                price,
                discount,
                id,
                size,
                colors,
                collection,
              } = e;

              return (
                <div key={i} className="-wrapper">
                  <MainCard
                    images={images}
                    name={name}
                    price={price}
                    discount={discount}
                    id={id}
                    size={size}
                    colors={colors}
                    collectName={collection}
                  />
                </div>
              );
            })
          ) : (
            <p className="-secondary">По Вашему запросу ничего не найдено.</p>
          )}
        </div>
        <div style={{ display: data && data.length > 0 ? "block" : "none" }}>
          <Paginate  total={total} limit={limit} setPage={setPage}/>
        </div>
        <div style={{ display: data && data.length > 0 ? "none" : "block" }}>
          <Offer title={"Возможно вас интересует"} />
        </div>
      </div>
    </div>
  );
}
