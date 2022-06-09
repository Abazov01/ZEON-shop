import React from "react";
import AliceCarousel from "react-alice-carousel";
import svg from "../../../../assets/home/image 3.svg";
import "./homeCarousel.scss";
import leftTop from "../../../../assets/home/Lorem ipsum.png";
import leftBottom from "../../../../assets/home/Lorem lorem ipsum ipsum.png";
import right from "../../../../assets/home/Group 1253.svg"

// const Carousel = ({arr}) =>{
//     return (
//         <div className='carousel'>

//         </div>
//     )
// }

export default function HomeCarousel() {
  const arr = [
    { svg, leftTop, leftBottom, right },
    { svg, leftTop, leftBottom, right },
    { svg, leftTop, leftBottom, right },
    { svg, leftTop, leftBottom, right },
    { svg, leftTop, leftBottom, right },
  ];
  return (
    <div className="homeCar">
      <div className="container carousel__wrapper">
        <AliceCarousel mouseTracking autoPlay  autoPlayInterval={3000} autoPlayStrategy={'none'} infinite>
          {arr.map((e, i) => {
            return (
              <div key={i} className="carousel__slide">
                <img className="img" src={e.svg} alt="" />
                <div className="carousel__slide-left">
                  <div className="__top">
                    <img src={e.leftTop} alt="" />
                  </div>
                  <div className="__bottom">
                    <img src={e.leftBottom} alt="" />
                  </div>
                </div>
                <div className="carousel__slide-right">
                    <img src={e.right} alt="" />
                </div>
              </div>
            );
          })}
          
        </AliceCarousel>
      </div>
    </div>
  );
}
