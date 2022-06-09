import React from "react";
import "./collectSection.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collections, statuses } from "./../../../../actions/index";
import MainCard from "../../../../components/mainCard/MainCard";
import CollectionCard from "../../../../components/collectionCard/CollectionCard";

export default function HomeSection({ title }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const [display, setDisplay] = useState('inline')
  let limit = 4 
  let q = 8 
  const collection = useSelector((state) => state.collections.homeCollections)


  useEffect(() => {
      dispatch(collections(1, limit));
    if (window.innerWidth <= 320) setDisplay("none");

  }, []);


  const handleMore = () => {
    dispatch(collections(page, limit));
    setPage(page => page+1);
    if(collection.length >= q ) setDisplay('none')
  };
  return (
    <div className="collect">
      <div className="container">
        <h1 className="-title">{title}</h1>
        <div className="-content">
          {collection &&
            collection.map((e, i) => {
              const { id, name, img} = e;
              return (
                <div key={id} className="-wrapper">
                  <CollectionCard img={img} name={name} id={id}/>
                </div>
              );
            })}
        </div>
        <button style={{display:display}} onClick={() => handleMore()} className="-more">
          Ещё
        </button>
      </div>
    </div>
  );
}
