import React, { useEffect, useState } from "react";
import "./chatModal.scss";
import { useSelector, useDispatch } from "react-redux";

import close from "../../assets/modal/X.png";
import { isSended } from "../../redux/reducers/booleanReducer";
import Thanks from "./Thanks";
import Send from './Send';


export default function ChatModal({ chat, setChat, setMess }) {
    const dispatch = useDispatch()
    const isSend = useSelector(state => state.booleans.isSended)
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [valid, setValid] = useState(false)
    useEffect(()=>{
        if(name && phone){
            setValid(true)
        }
    },[name, phone])
    
  return (
    <div className="chatModal" style={{ display: chat ? "block" : "none" }}>
      <div onClick={() =>{ setChat(false);setMess(false);dispatch(isSended(false))}} className="overlay">
        <div onClick={e=>e.stopPropagation()} className="modal-content">
          {isSend ? <Thanks setChat={setChat} setMess={setMess}/> : <Send name={name} setName={setName} phone={phone} setPhone={setPhone} valid={valid} setValid={setValid}/>}
          <div onClick={() =>{ setChat(false);setMess(false)}} className="modal-close">
            <img src={close} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
