import React from "react";
import "./collectionCard.scss";

export default function CollectionCard({ img, name, id}) {
  return (
    <div className="collectionCard" >
      <div style={{background: "url("+img+")"}} className="__start">
        <p className="-title">
          {name}
        </p>
      </div>
      <div className="__end">
        <p className="-text">Смотреть все</p>
        <span className="-icon"></span>
      </div>
    </div>
  );
}
