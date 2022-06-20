import React from "react";
import "./orderThanks.scss";
import { useDispatch } from 'react-redux';
import { card, isSended } from "../../redux/reducers/booleanReducer";
import { useNavigate } from 'react-router-dom';
import done from '../../assets/modal/Vector (10).png'

export default function OrderThanks({setModal}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
const continuee = () => {
    setModal(false)
    dispatch(card(false))
    dispatch(isSended(false))
    navigate('/')   
}
  return (
    <div className="thanks-wrapper">
      <div className="thanksModal">
        <div className="-img">
          <img src={done} alt="" />
        </div>
        <div className="-title">Спасибо!</div>
        <div className="-text">
          Ваша заявка была принята ожидайте, скоро Вам перезвонят
        </div>
        <button autoFocus onClick={() => continuee()} className="-button">
          Продолжить покупки
        </button>
      </div>
    </div>
  );
}
