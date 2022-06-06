import { useState } from "react";

const NewsChild = ({ image, text, title }) => {
  const [more, setMore] = useState(false);
  const shortText = text.slice(0, 150)
  return (
    <div className="news__child">
      <div className="news__child-image">
        <img src={image} alt="" />
      </div>
      <div className="news__child-body">
        <h4 className="news__child-title">{title}</h4>
        <p className="news__child-text">{text}</p>
      </div>
      <div className="news__child2-body">
        <h4 className="news__child2-title">{title}</h4>
        <p className="news__child2-text">{more ? text : shortText+"..."}</p>
        <div onClick={()=>setMore(!more)} className="news__child2-button">{more ? 'Скрыть' : 'Читать полностью'}</div>
      </div>
    </div>
  );
};

export default NewsChild;
