import React, { useEffect } from "react";
import "./login.scss";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authState, uId } from "../../redux/reducers/userReducer";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [error, setError] = useState();
  const [code, setCode] = useState("+996");
  const [flag, setFlag] = useState("https://i.postimg.cc/Z5scqPgM/KG.png");
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [em, setEm] = useState(true);
  const [pass, setPass] = useState();
  const [pa, setPa] = useState(true);
  const [phone, setPhone] = useState("");
  const [ph, setPh] = useState(true);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [valid, setValid] = useState(false);
  const [valid2, setValid2] = useState(false);


  useSelector(({user:{isAuth}})=> isAuth ? navigate('/') : null )

  
  useEffect(() => {
    const validTest = () => {
      if (name && surname && email && phone && country && city && pass)
        return true;
      return false;
    };
    setValid(validTest());
  }, [name, surname, email, phone, country, city, pass]);

  useEffect(() => {
    const validTest = () => {
      if (email && phone) {
        if (email.match(/@/) == null) return false;
        if (phone.length < 9) return false;
        if (pass.length < 6) return false;
        return true;
      }
      return false;
    };
    setValid2(validTest());
  }, [email, phone, pass]);

  const phons = useSelector((s) => s.phons);

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
      if (pass.length < 6) {
        setPa(false);
      } else {
        setPa(true);
      }
    }
  };

  const handleSelect = (e) => {
    setCode(e.target.value);
    phons.forEach((el) => {
      if (el.value == e.target.value) setFlag(el.flag);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid2 || !valid) return;
    (async () => {
      try {
        const auth = await getAuth();
        const user = await signInWithEmailAndPassword(auth, email, pass);
        console.log(user);
        const uid = user.user.uid;
        const data = {name,surname,phone: code + " " + phone,email,country,city, uid};
        const newUser = {uid,fav: [],card: [],history: [],};
        dispatch(authState(!!uid))
        dispatch(uId(uid))
        localStorage.setItem("currentUser", JSON.stringify(data));
        const test = await axios.get(`http://localhost:5000/users?uid=${uid}`);
        if (!test.data.length > 0)
          axios.post(`http://localhost:5000/users`, newUser);
        navigate('/')
      } catch (error) {
        console.log(error.message);
        alert("Ошибка при входе");
      }
    })();
  };

  return (
    <div className="login">
      <form
        onSubmit={handleSubmit}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="-title">
          <p className="-text">Вход</p>
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
            style={{ border: em ? "1px solid #e7e7e7" : "1px solid #ff0000" }}
            onChange={(e) => {
              setEmail(e.target.value);
              setEm(true);
            }}
            type="text"
            className="-input"
            placeholder="example@mail.com"
          />
        </div>
        <div className="-email">
          <div
            style={{ color: pa ? "#808080" : "#ff0000" }}
            className="valid-text"
          >
            Пароль
          </div>
          <input
            style={{ border: pa ? "1px solid #e7e7e7" : "1px solid #ff0000" }}
            onChange={(e) => {
              setPass(e.target.value);
              setPa(true);
            }}
            type="text"
            className="-input"
            placeholder="Password"
          />
        </div>
        <div className="-phone">
          <div
            style={{ color: ph ? "#808080" : "#ff0000" }}
            className="valid-text"
          >
            Ваш номер телефона
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
                setPh(true);
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
        {error && <span className="-error">Неправильный пароль или email</span>}
        <label
          onClick={clickToButton}
          className="-btn"
          style={{ background: valid ? "#000" : "#ADADAD" }}
        >
          <button>Войти</button>
        </label>
        <p className="-quest">
          У вас нету аккаунта?{" "}
          <NavLink to={"/register"}>Зарегистрируйстесь</NavLink>
        </p>
      </form>
    </div>
  );
}
