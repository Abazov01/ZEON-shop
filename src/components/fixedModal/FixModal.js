import React, { useState } from "react";
import "./fixModal.scss";
import up from "../../assets/modal/up.png";
import close from "../../assets/modal/X.png";
import chatimg from "../../assets/modal/Chat_1_.png";
import whatsapp from "../../assets/modal/whatsapp.png";
import telegram from "../../assets/modal/telegram.png";
import phone from "../../assets/modal/quest.png";
import { useSelector } from "react-redux";
import ChatModal from "../chatModal/ChatModal";

export const Modal = ({ w, t, setChat }) => {
  return (
    <div className="fixModal__chats">
      <div className="fixModal__chats-telegram">
        <a target={"_blank"} href={t}>
          <img src={telegram} alt="" />
        </a>
      </div>
      <div className="fixModal__chats-whatsapp">
        <a target={"_blank"} href={w}>
          <img src={whatsapp} alt="" />
        </a>
      </div>
      <div onClick={() => setChat(true)} className="fixModal__chats-phone">
        <img src={phone} alt="" />
      </div>
    </div>
  );
};
export const Up = () => {
  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixModal__up"
    >
      <img src={up} alt="" />
    </div>
  );
};

export default function FixModal() {
  const [mess, setMess] = useState(false);
  const [chat, setChat] = useState(false);
  const telegram = useSelector((state) => state.footer.social[1]?.link);
  const whatsapp = useSelector((state) => state.footer.social[2]?.link);
  return (
    <div className="fixModal">
      <div className="upwrapper">
        <Up />
      </div>
      <div className="fixModal__down">
        <div>
          {mess ? <Modal w={whatsapp} t={telegram} setChat={setChat} /> : null}
        </div>
        <div onClick={() => setMess(!mess)} className="fixModal__down-handler">
          <div className="chatwrapper">
            <img src={mess ? close : chatimg} alt="woops" />
          </div>
        </div>
      </div>
      <ChatModal chat={chat} setChat={setChat} setMess={setMess} />
    </div>
  );
}
