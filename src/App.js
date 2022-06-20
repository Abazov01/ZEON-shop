import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import { cardIsEmpty, favIsEmpty, getAll } from "./actions/index";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Help from "./pages/help/Help";
import News from "./pages/news/News";
import Public from "./pages/public/Public";
import About from "./pages/aboutpage/About";
import ColllectionPage from "./pages/collections/ColllectionPage";
import { Route, Routes } from "react-router-dom";
import CollectDetail from "./pages/collectDetail/CollectDetail";
import Detail from "./pages/detailPage/Detail";
import Favorite from "./pages/favorite/Favorite";
import Home from "./pages/homepage/Home";
import Result from "./pages/result/Result";
import Basket from "./pages/basket/Basket";
import { card, favorite } from "./redux/reducers/booleanReducer";
import BreadCrumbs from "./components/breadCrumb/BreadCrumbs";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  });
  // localStorage.setItem('card', JSON.stringify([]))

  useEffect(() => {
    const cardd = cardIsEmpty()
    const fav = favIsEmpty()
    if (cardd) {
      dispatch(card(true));
    } else{
      dispatch(card(false));
    }

    if (fav) {
      dispatch(favorite(true));
    } else{
      dispatch(favorite(false));
    }
  });

  return (
    <div className="App">
      <Header />
      <BreadCrumbs/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<ColllectionPage />} />
        <Route path="/collections/:id" element={<CollectDetail />} />
        <Route path="/collections/:id/:productid" element={<Detail />} />
        <Route path="/help" element={<Help />} />
        <Route path="/public" element={<Public />} />
        <Route path="/result/:name" element={<Result />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
