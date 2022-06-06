import React from "react";
import { useSelector } from "react-redux";
import "./about.scss";

export default function About() {
  const about = useSelector((state) => state.about);
  return (
    <div className="about">
      <div className="container about__row">
        <div className="__images">
          <div className="__start">
            <div className="-img1">
              <img src={about.img1} alt="" />
            </div>
            <div className="-img2">
              <img src={about.img2} alt="" />
            </div>
          </div>
          <div className="__center">
            <div className="-img">
              <img src={about.img3} alt="" />
            </div>
          </div>
        </div>
        <div className="__text">
          <div className="wrapper">
            <h3 className="-title">О нас</h3>
            <p className="-text">{about.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
