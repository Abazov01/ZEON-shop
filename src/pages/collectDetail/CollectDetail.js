import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./collectDetail.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectDetail, idToName } from "../../actions";
import MainCard from "../../components/mainCard/MainCard";
import Paginate from "../../components/paginate/Paginate";
import Offer from './../../components/offer/Offer';


export default function CollectDetail() {
  const [four, setFour] = useState(true)
  const [name, setName] = useState()
  const [page, setPage] = useState()
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.detail.collectDet);
  const total = useSelector((state) => state.detail.total);
  // console.log(products);
  console.log(total);
  let limit = 12
  if(window.innerWidth <= 320){
    limit = 4
  }
  useEffect(() => {
    async function fn() {
      let hook = await idToName(id);
      dispatch(collectDetail(hook, page, limit))
      console.log(name);
      setName(hook)
    }
    fn();
    
  }, [page]);
  useEffect(()=>{
    if(products?.length % 4 > 0) {
      setFour(false) 
    }else {
      setFour(true)
    }
  },[products])

  return (
    <div className="collectDetail">
      <div className="container">
        <h4 className="-title">{name}</h4>
        <div style={{justifyContent: four ? 'space-between' : 'start'}} className="-row">
          {products &&
            products.map((e, i) => {
              const { name, images, price, discount, id, size, colors,collection } = e;
              return (
                <div style={{marginRight: four ? 0 : 8}} key={i} className="-wrapper">
                  <MainCard
                    images={images}
                    name={name}
                    price={price}
                    discount={discount}
                    id={id}
                    size={size}
                    colors={colors}
                    collectName={collection}
                  />
                </div>
              );
            })}
        </div>
        <Paginate limit={limit} total={total} setPage={setPage}/>
        <Offer title={'Новинки'}/>
      </div>
    </div>
  );
}
