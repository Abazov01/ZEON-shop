import React, { useEffect, useState } from "react";
import close from "../../assets/modal/X.png";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function OrderModal({ setModal }) {
  const phons = useSelector((s) => s.phons);

  const [code, setCode] = useState();
  const [flag, setFlag] = useState("https://i.postimg.cc/Z5scqPgM/KG.png");
  const [name, setName] = useState();
  const [na, setNa] = useState(true);
  const [surname, setSurname] = useState();
  const [su, setSu] = useState(true);
  const [email, setEmail] = useState();
  const [em, setEm] = useState(true);
  const [phone, setPhone] = useState();
  const [ph, setPh] = useState(true);
  const [country, setCountry] = useState();
  const [co, setCo] = useState(true);
  const [city, setCity] = useState();
  const [ci, setCi] = useState(true);
  const [agree, setAgree] = useState();
  const [ag, setAg] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const validTest = () => {
      if(name && surname && email && phone && country && city && agree)return true
      return false
    };
    setValid(validTest());
  }, [name, surname, email, phone, country, city, agree]);


  const handleChange = () => {
    const validTest = () => {
      if (name) {
        setNa(true);
      } else {
        setNa(false);
      }
      if (surname) {
        setSu(true);
      } else {
        setSu(false);
      }
      if (email) {
        setEm(true);
      } else {
        setEm(false);
      }
      if (phone) {
        setPh(true);
      } else {
        setPh(false);
      }
      if (country) {
        setCo(true);
      } else {
        setCo(false);
      }
      if (city) {
        setCi(true);
      } else {
        setCi(false);
      }
      if (agree) {
        setAg(true);
      } else {
        setAg(false);
      }
      
    };
    validTest()
  }
 
  
  const handleSelect = (e) => {
    setCode(e.target.value);

    phons.forEach((el) => {
      console.log("change", el.flag);

      if (el.value == e.target.value) setFlag(el.flag);
    });
  };
  console.log()
  return (
    <div className="order-modal">
      <div onClick={() => setModal((modal) => !modal)} className="overlay">
        <form className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="-title">
            <p className="-text">Оформление заказа</p>
            <p onClick={() => setModal((modal) => !modal)} className="-close">
              <img src={close} alt="" />
            </p>
          </div>
          <div className="-name">
            <div
              style={{ color: na ? "#808080" : "#ff0000" }}
              className="valid-text"
            >
              Ваше имя
            </div>
            <input
              onChange={(e) =>{setName(e.target.value); handleChange()}}
              type="text"
              className="-input"
              placeholder="Например Иван"
            />
          </div>
          <div className="-surname">
            <div
              style={{ color: su ? "#808080" : "#ff0000" }}
              className="valid-text"
            >
              Ваше фамилия
            </div>
            <input
              onChange={(e) => {setSurname(e.target.value); handleChange()}}
              type="text"
              className="-input"
              placeholder="Например Иванов"
            />
          </div>
          <div className="-email">
            <div
              style={{ color: em ? "#808080" : "#ff0000" }}
              className="valid-text"
            >
              Электронная почта
            </div>
            <input
              onChange={(e) => {setEmail(e.target.value); handleChange()}}
              type="text"
              className="-input"
              placeholder="example@mail.com"
            />
          </div>
          <div className="-phone">
            <div
              style={{ color: ph ? "#808080" : "#ff0000" }}
              className="valid-text"
            >
              Ваш номер телефона
            </div>
            <div className="phone-wrapper">
              <div className="-flag">
                <img src={flag} alt="" />
              </div>
              <select id="select" className="-select" onChange={handleSelect}>
                {phons.map((e, i) => {
                  const { value, flag } = e;
                  return (
                    <option
                      onClick={() => setFlag(flag)}
                      className="-option"
                      key={i}
                      value={value}
                    >
                      {value}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="select" className="-arrow">
                &#9660;
              </label>
              <input
                onChange={(e) => {setPhone(e.target.value);}}
                id="inp"
                placeholder="Введите номер телефона"
                type="number"
                className="-input"
              />
            </div>
          </div>
          <div className="-country">
            <div
              style={{ color: co ? "#808080" : "#ff0000" }}
              className="valid-text"
            >
              Страна
            </div>
            <input
              onChange={(e) => {setCountry(e.target.value); handleChange()}}
              type="text"
              className="-input"
              placeholder="Введите страну"
            />
          </div>
          <div className="-city">
            <div
              style={{ color: ci ? "#808080" : "#ff0000" }}
              className="valid-text"
            >
              Город
            </div>
            <input
              onChange={(e) => {setCity(e.target.value); handleChange()}}
              type="text"
              className="-input"
              placeholder="Введите город"
            />
          </div>
          <div className="-agree">
            <input
              onChange={(e) => {setAgree(e.target.checked)}}
              type="checkbox"
            />
            Согласен с условиями{" "}
            <NavLink to="/public">публичной оферты</NavLink>
          </div>
          <button
            style={{ background: valid ? "#000" : null }}
            className="-btn"
          >
            Заказать
          </button>
        </form>
      </div>
    </div>
  );
}
