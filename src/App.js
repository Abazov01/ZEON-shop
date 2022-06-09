import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import { getAll } from "./actions/index";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Help from "./pages/help/Help";
import News from "./pages/news/News";
import Advantage from "./pages/homepage/components/advantage/Advantage";
import FixModal from "./components/fixedModal/FixModal";
import Public from "./pages/public/Public";
import HomeCarousel from "./pages/homepage/components/homeCarousel.js/HomeCarousel";
import MainCard from "./components/mainCard/MainCard";
import { cardArr } from "./test";
import About from "./pages/aboutpage/About";
import Paginate from "./components/paginate/Paginate";
import CollectionCard from "./components/collectionCard/CollectionCard";
import ColllectionPage from "./pages/collections/ColllectionPage";
import HomeSection from "./pages/homepage/components/homeSection/HomeSection";
import Home from './pages/homepage/Home';
import SecondCard from './components/secondCard/SecondCard';
import Offer from "./components/offer/Offer";
import { Route, Routes } from "react-router-dom";
import CollectDetail from './pages/collectDetail/CollectDetail';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  });
  
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/collections" element={<ColllectionPage/>}/>
          <Route path="/collections/:id" element={<CollectDetail/>}/>
          <Route path="/collections/:id/:productid" element={<CollectDetail/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/public" element={<Public/>}/>
          <Route path="/result/:name" element={<Public/>}/>
          <Route path="/basket" element={<Public/>}/>
          <Route path="/favorite" element={<Public/>}/> 
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
