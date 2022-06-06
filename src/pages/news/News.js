import React, { useEffect, useState } from "react";
import "./news.scss";
import { useSelector } from 'react-redux';
import NewsChild from './NewsChild';

export default function News() {
  const [count, setCount] = useState(8)
  const news = useSelector(state => state.news)
  // console.log(news)
  
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
    if (scrollHeight - (scrollTop + windowHeight) < 1) {
        setTimeout(()=>{
          setCount(count => count+4)
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
