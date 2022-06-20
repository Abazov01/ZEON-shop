import React from "react";
import "./collectionCard.scss";
import { NavLink } from 'react-router-dom';

export default function CollectionCard({ img, name, id}) {
  return (
    <div className="collectionCard" >
      <div style={{background: "url("+img+")"}} className="__start">
        <p className="-title">
          {name}
        </p>
      </div>
      <NavLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={`/collections/${id}`} className="__end">
        <p className="-text">Смотреть все</p>
        <span className="-icon"></span>
      </NavLink>
    </div>
  );
}
