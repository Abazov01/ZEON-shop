import React, { useEffect, useState } from "react";
import "./collectionPage.scss";
import CollectionCard from "../../components/collectionCard/CollectionCard";
import Paginate from "../../components/paginate/Paginate";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { collections } from "../../actions/index";

export default function ColllectionPage() {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const [four, setFour] = useState(true)
  let limite = 8
  if(window.innerWidth < 321){
    limite = 4
  }
  useEffect(() => {
    dispatch(collections(page, limite, true))
  }, [page]);
  


  const collection = useSelector(state=> state.collections.collections)
  const total = useSelector(state=> state.collections.total)
  const limit = useSelector(state => state.collections.limit)
  useEffect(()=>{
    if(collection.length % 4 > 0){
        setFour(false)
      }else{
          setFour(true)
      }
  },[collection])


  console.log(window.innerWidth)
  return (
    <div className="collections">
      <div className="container">
        <div className="-content">
          <h3 className="-title">Коллекции</h3>
          <div className="__row" style={{display:'flex',justifyContent: four ? 'space-between':'flex-start'}}>
            {collection
              ? collection.map((e, i) => {
                  return (
                    <div style={{marginRight: four ? '0px': '8px'}} key={e.id} className="-wrapper">
                      <CollectionCard img={e.img} name={e.name} />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <Paginate limit={limit} total={total} setPage={setPage} />
      </div>
    </div>
  );
}
