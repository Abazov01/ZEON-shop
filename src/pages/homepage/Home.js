import React from 'react'
import FixModal from '../../components/fixedModal/FixModal'
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
        <FixModal/>
        <Advantage/>
    </div>
  )
}
