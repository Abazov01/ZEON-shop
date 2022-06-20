import React, { useEffect, useState } from "react";
import "./news.scss";
import { useSelector } from 'react-redux';
import NewsChild from './NewsChild';

export default function News() {
  const init = window.innerWidth > 320 ? 4 : 2
  const [count, setCount] = useState(init)
  const news = useSelector(state => state.news)
  const scrolll = window.innerWidth > 320 ? 1 : 400
  const incr = window.innerWidth > 320 ? 2 : 1
  
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    if (scrollHeight - (scrollTop + windowHeight) < scrolll) {
        setTimeout(()=>{
          setCount(count => count+incr)
        },500)
    }
  };
  
  return (
    <div className="news">
      <div className="container">
        <h2 className="news__title">Новости</h2>
        {news && news.map((e,i)=>{
          if(i < count){
            return (
              <NewsChild key={i} image={e.image} text={e.text} title={e.title}/>
            )
          }
          
        })}
      </div>
    </div>
  );
}
