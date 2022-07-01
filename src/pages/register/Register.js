import React, { useState } from "react";
import "./register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import thank from '../../assets/modal/Vector (10).png'
const RegisterModal = ({setSuccess, success}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        setSuccess(false)
        navigate('/login')
    }
    return(
        <div style={{display: success ? 'flex' : 'none'}} className="-modal">
            <div className="-content">
                <div className="-img">
                    <img src={thank} alt="" />
                </div>
                <div className="-text ">Вы успешно зарегистрировались перейдите на страницу входа и войдите</div>
                <div onClick={handleClick} className="-btn">Перейти</div>
            </div>
        </div>
    )
}



export default function Register() {
  const [success, setSuccess] = useState()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [valid, setValid] = useState();

  useEffect(() => {
    if (email && password) setValid(true);
  }, [email, password]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (valid) {
      (async () => {
        try {
          const user = await createUserWithEmailAndPassword(auth,email,password);
          setSuccess(true)
        } catch (error) {
            console.log(error.message)
            alert('Ошибка при регистрации')
        }
      })();
    }
  };

  return (
    <div className="register">
        <RegisterModal setSuccess={setSuccess} success={success}/>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button style={{ background: valid ? "#000" : "#ADADAD" }}>
          Зарегистрироваться
        </button>
      </form>
      <span>
        Уже есть аккаунт? <NavLink to={"/login"}>Войдите</NavLink>
      </span>
    </div>
  );
}
