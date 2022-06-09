import React from "react";
import "./footer.scss";
import { useSelector } from "react-redux";
import phone from "../../assets/footer/phone.png";
import mail from "../../assets/footer/mail (2).png";
import whatsapp from "../../assets/footer/whats.png";
import insta from "../../assets/footer/insta.png";
import telega from "../../assets/footer/telega.png";
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const contacts = useSelector((state) => state.footer.contacts);
  const social = useSelector((state) => state.footer.social);
  const logo = useSelector((state) => state.footer.logo);
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__row">
          <div className="footer__logo">
            <img src={logo} alt="" />
          </div>
          <div className="footer__content">
            <div className="footer__content-start">
              <h3 className="footer__title">Компания</h3>
              <NavLink to={'/about'} className="footer__list">О нас</NavLink>
              <NavLink to={'/news'} className="footer__list">Новости</NavLink>
              <NavLink to={'/help'} className="footer__list">Помощь</NavLink>
            </div>
            <div className="footer__content-center">
              <h3 className="footer__title">Контакты</h3>
              {contacts &&
                contacts.map((e, i) => {
                  return (
                    <div key={i} className="footer__list footer__center-list">
                      <a
                        href={e.link}
                        
                      >
                        <img src={e.type == "number" ? phone : mail} alt="" />
                        {e.content}
                      </a>
                    </div>
                  );
                })}
            </div>
            <div className="footer__content-end">
              <h3 className="footer__title">Мы в социальных сетях:</h3>
              {social &&
                social.map((e, i) => {
                  return (
                    <div key={i} className="footer__list">
                      <a
                        target={'_blank'}
                        href={e.link}
                      >
                        <img
                          src={
                            e.type == "whatsapp" ? whatsapp : e.type == "telegram" ? telega : insta
                          }
                          alt=""
                        />
                        {e.content}
                      </a>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="footer__row-2">
          Developed by Zeon
        </div>
      </div>
    </div>
  );
}
