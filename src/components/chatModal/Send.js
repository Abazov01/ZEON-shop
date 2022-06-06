import React,{useEffect, useState} from "react";
import nameimg from "../../assets/modal/person.png";
import { isSended } from "../../redux/reducers/booleanReducer";
import phoneimg from "../../assets/modal/person-number.png";
import { useDispatch } from "react-redux";

const Send = ({name, setName, valid, setValid, setPhone}) => {
    const dispatch = useDispatch()
    const order = ()=>{
        if(valid){
            dispatch(isSended(true))
            setValid(false)
            setName('')
            setPhone('')
        }
    }
  return (
    <div className="send">
      <div className="send__title">Если у Вас остались вопросы</div>
      <div className="send__text">
        Оставьте заявку и мы обязательно Вам перезвоним
      </div>
      <div className="send__body">
        <div className="send__body-name">
          <img  src={nameimg} alt="" />
          <input autoFocus onChange={e => setName(e.target.value)} type="text" />
        </div>
        <div className="send__body-phone">
          <img  src={phoneimg} alt="" />
          <input onChange={e => setPhone(e.target.value)} type="number" />
        </div>
        <button onClick={()=>valid ? order(): null} style={{ background: valid ? 'black':"gray" }} className="send__body-btn">
          Заказать звонок
        </button>
      </div>
    </div>
  );
};


export default Send