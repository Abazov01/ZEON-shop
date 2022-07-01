import React, { useEffect, useState } from "react";
import './orderModal.scss'
import close from "../../../../assets/modal/X.png";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Thanks from "../../../../components/chatModal/Thanks";
import { isSended } from "../../../../redux/reducers/booleanReducer";
import { clearCard, sendMessage } from "../../../../actions";
import OrderThanks from '../orderThanks/OrderThanks';

export default function OrderModal({ setModal }) {
  const phons = useSelector((s) => s.phons);
  const isSend = useSelector(s => s.booleans.isSended)
  const dispatch = useDispatch()
  
  const [code, setCode] = useState('+996');
  const [flag, setFlag] = useState("https://i.postimg.cc/Z5scqPgM/KG.png");
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [em, setEm] = useState(true);
  const [phone, setPhone] = useState("");
  const [ph, setPh] = useState(true);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [agree, setAgree] = useState();
  const [valid, setValid] = useState(false);
  const [valid2, setValid2] = useState(false);

  useEffect(() => {
    const validTest = () => {
      if (name && surname && email && phone && country && city && agree)
        return true;
      return false;
    };
    setValid(validTest());
  }, [name, surname, email, phone, country, city, agree]);

  useEffect(() => {
    const validTest = () => {
      if (email && phone) {
        if (email.match(/@/) == null) return false;
        if (phone.length < 9) return false;
        return true;
      }
      return false;
    };
    setValid2(validTest());
  }, [email, phone]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!valid2 || !valid)return
    let arr = JSON.parse(localStorage.getItem('card'))
    console.log(arr)
    arr = arr.map(e => ({id:e.id, count:e.count, color: e.color.split('').slice(1,7).join('')}))
    console.log(arr)
    let text = `
    Здравствуйте меня зовут ${name +' '+ surname}, 
    я хочу заказать у вас:
     ${arr.map(e=>`
     id: ${e.id}, color: ${e.color} - ${e.count}шт.`)}
    email: ${email}
    телефонный номер: ${code, phone}
    страна: ${country}
    город:${city}`
    console.log(text)
    await sendMessage(text)
    dispatch(isSended(true))
    clearCard()
  };


  const clickToButton = () => {
    if (email && phone) {
      if (email.match(/@/)) {
        setEm(true);
      } else {
        setEm(false);
      }
      if (phone.length < 9) {
        setPh(false);
      } else {
        setPh(true);
      }
    }
  };


  const handleSelect = (e) => {
    setCode(e.target.value);
    phons.forEach((el) => {
      if (el.value == e.target.value) setFlag(el.flag);
    });
  };
  return (
    <div className="order-modal">
      <div onClick={() => setModal((modal) => !modal)} className="overlay">
        {isSend ? (
          <OrderThanks setModal={setModal} />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="-title">
              <p className="-text">Оформление заказа</p>
              <p onClick={() => setModal((modal) => !modal)} className="-close">
                <img src={close} alt="" />
              </p>
            </div>
            <div className="-name">
              <div className="valid-text">Ваше имя</div>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="-input"
                placeholder="Например Иван"
              />
            </div>
            <div className="-surname">
              <div className="valid-text">Ваша фамилия</div>
              <input
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
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
              style={{border:em ? '1px solid #e7e7e7' : '1px solid #ff0000' }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                className="-input"
                placeholder="example@mail.com"
              />
            </div>
            <div  className="-phone">
              <div
                style={{ color: ph ? "#808080" : "#ff0000" }}
                className="valid-text"
              >
                Ваш номер телефона
              </div>
              <div style={{border:ph ? '1px solid #e7e7e7' : '1px solid #ff0000' }} className="phone-wrapper">
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
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  // value={phone}
                  id="inp"
                  placeholder="Введите номер телефона"
                  type="number"
                  className="-input"
                />
              </div>
            </div>
            <div className="-country">
              <div className="valid-text">Страна</div>
              <input
                type="text"
                className="-input"
                placeholder="Введите страну"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="-city">
              <div className="valid-text">Город</div>
              <input
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                type="text"
                className="-input"
                placeholder="Введите город"
              />
            </div>
            <div className="-agree">
              <input
                onChange={(e) => {
                  setAgree(e.target.checked);
                }}
                type="checkbox"
              />
              <p>Согласен с условиями
              <NavLink to="/public">публичной оферты</NavLink></p>
            </div>
            <label
              onClick={clickToButton}
              className="-btn"
              style={{ background: valid ? "#000" : "#ADADAD" }}
            >
              <button  >
                Заказать
              </button>
            </label>
          </form>
        )}
      </div>
    </div>
  );
}
