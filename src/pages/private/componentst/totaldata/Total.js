import { allLine } from '../../../../actions'
import React, { useEffect,useState } from 'react'
import './total.scss'



export default function Total() {
  const [data, setData] = useState()
  useEffect(() => {
    allLine().then(d => setData(d))
  }, [])
  return (
    <div className='totaldata'>
      <div className='title'>Все заказы:</div>
      <div className="line"><span>Количество линий:</span> {data?.line}</div>
      <div className="line"><span>Количество продуктов:</span> {data?.product}</div>
      <div className="line"><span>Стоимость</span> {data?.price.toLocaleString()}</div>
      <div className="line"><span>Скидка:</span> {data?.discount.toLocaleString()}</div>
      <div className="line"><span>Итого оплачено:</span> {data?.total.toLocaleString()}</div>
    </div>
  )
}
