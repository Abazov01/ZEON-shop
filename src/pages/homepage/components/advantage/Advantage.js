import React from "react";
import "./advantage.scss";
import payment from "../../../../assets/adventage/payment.png";
import delivery from "../../../../assets/adventage/delivery.png";
import shopping from "../../../../assets/adventage/shopping.png";
import consult from "../../../../assets/adventage/consult.png";
const arr = [
  {
    logo: payment,
    title: "Удобные способы оплаты",
    body: "Мы предлагаем возможность безналичной оплаты",
  },
  {
    logo: delivery,
    title: "Удобные способы оплаты",
    body: "100% гарантия возврата товара - 14 дней на возврат, без скандалов и истерик.",
  },
  {
    logo: consult,
    title: "Профессиональная консультация",
    body: "Мы проконсультируем и индивидуально подойдем Вашему заказу ",
  },
  {
    logo: shopping,
    title: "Акции и бонусы для покупателей",
    body: "Промокоды со скидками для постоянных клиентов, акции на новые позиции"
  },
];
function Card ({img, title, body}) {
  return(
    <div className="advantage__card">
      <div className="advantage__card-image">
        <img src={img} alt="" />
      </div>
      <h5 className="advantage__card-title">{title}</h5>
      <p className="advantage__card-body">{body}</p>
    </div>
  )
}

export default function Advantage() {
  return (
    <div className="advantage">
      <h2 className="advantage__title">Наши преимущества</h2>
      <div className="container">
        <div className="advantage__row">
          {arr.map((e,i) => {
            return(
              <Card key={i} img={e.logo} title={e.title} body={e.body}/>
            )
          })}
        </div>
      </div>
    </div>
  );
}

