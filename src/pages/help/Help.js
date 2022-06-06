import React, { useState } from "react";
import "./help.scss";
import up from "../../assets/modal/up.png";
import down from "../../assets/modal/down.png";
import { useSelector } from 'react-redux';

const Accordion = ({ q, a }) => {
  const [accord, setAccord] = useState(false);
  return (
    <div className="accordion__content">
      <div onClick={() => setAccord(!accord)} className="accordion__content-head">
        <h4>{q}</h4>
        <div  className="accordion__head-img">
          <img src={accord ? up : down} alt="" />
        </div>
      </div>
      <div
        style={{ display: accord ? "block" : "none" }}
        className="accordion__content-body"
      >
        {a}
      </div>
    </div>
  );
};

export default function Help() {
    const quests = useSelector(state => state.questions)
  return (
    <div className="help">
      <div className="container">
        <div className="help__row">
          <div className="help__image">
            <img src="https://i.postimg.cc/26byfKZN/news1.png" alt="" />
          </div>
          <div className="help__accordion">
              <h2 className="help__text">Помощь</h2>
              {quests[0] && quests[0].map(e =>{
                  return(
                      <Accordion q={e.question} a={e.answer}/>
                  )
              })}
          </div>
          
        </div>
      </div>
    </div>
  );
}
