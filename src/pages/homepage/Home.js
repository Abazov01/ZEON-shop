import React from 'react'
import Advantage from './components/advantage/Advantage'
import CollectSection from './components/collectSection.js/CollectSection'
import HomeCarousel from './components/homeCarousel.js/HomeCarousel'
import HomeSection from './components/homeSection/HomeSection'
import './home.scss'

export default function Home() {
  return (
    <div>
        <HomeCarousel/>
        <HomeSection  title={'Хит продаж'}/>
        <HomeSection  title={'Новинки'}/>
        <CollectSection title={'Коллекции'}/>
        <Advantage/>
    </div>
  )
}
