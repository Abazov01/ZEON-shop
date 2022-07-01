import React, { useEffect, useState } from "react";
import "./privateModal.scss";
import close from "../../../../assets/modal/X.png";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { isSended } from "../../../../redux/reducers/booleanReducer";
import { clearCard, sendMessage } from "../../../../actions";

export default function PrivateModal({ setModal }) {
  const phons = useSelector((s) => s.phons);
  const isSend = useSelector((s) => s.booleans.isSended);
  const dispatch = useDispatch();

  const [code, setCode] = useState("+996");
  const [leave, setLeave] = useState()
  const [flag, setFlag] = useState("https://i.postimg.cc/Z5scqPgM/KG.png");
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [phone, setPhone] = useState("");
  const [ph, setPh] = useState(true);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [valid, setValid] = useState(false);
  const [valid2, setValid2] = useState(false);

  useEffect(() => {
    const validTest = () => {
      if (name && surname && phone && country && city) return true;
      return false;
    };
    setValid(validTest());
  }, [name, surname, phone, country, city]);

  useEffect(() => {
    const validTest = () => {
      if (phone) {
        if (phone.length < 9) return false;
        return true;
      }
      return false;
    };
    setValid2(validTest());
  }, [phone]);
  useEffect(()=>{
    if(leave){
        setValid(true)
        if(!phone)  setValid2(true)
    }
  },[leave])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid2 || !valid) return;
    let user = JSON.parse(localStorage.getItem('currentUser'))
    console.log('user')
    if(name) user.name = name
    if(surname) user.surname = surname
    if(phone) user.phone = code + ' '+phone
    if(country) user.country = country
    if(city) user.city = city
    localStorage.setItem('currentUser', JSON.stringify(user))
    window.location.reload()
  };

  const clickToButton = () => {
    if (phone) {
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
        <form
          onSubmit={handleSubmit}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="-title">
            <p className="-text">Изменение данных</p>
            <p onClick={() => setModal((modal) => !modal)} className="-close">
              <img src={close} alt="" />
            </p>
          </div>
          <div className="-name">
            <div className="valid-text">Новое имя</div>
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
            <div className="valid-text">Новая фамилия</div>
            <input
              onChange={(e) => {
                setSurname(e.target.value);
              }}
              type="text"
              className="-input"
              placeholder="Например Иванов"
            />
          </div>

          <div className="-phone">
            <div
              style={{ color: ph ? "#808080" : "#ff0000" }}
              className="valid-text"
            >
              Новый номер телефона
            </div>
            <div
              style={{ border: ph ? "1px solid #e7e7e7" : "1px solid #ff0000" }}
              className="phone-wrapper"
            >
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
          <div className="leave">
            <input onChange={e => setLeave(e.target.checked)} type="checkbox"/>
            <span>Остальное не изменять</span>
          </div>
          <label
            onClick={clickToButton}
            className="-btn"
            style={{ background: valid ? "#000" : "#ADADAD" }}
          >
            <button>Изменить</button>
          </label>
        </form>
      </div>
    </div>
  );
}
