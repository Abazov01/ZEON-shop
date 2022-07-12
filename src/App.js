import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { cardIsEmpty, cardIsEmpty2, favIsEmpty, favIsEmpty2, getAll } from "./actions/index";
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
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { authState, uId } from "./redux/reducers/userReducer";
import Private from "./pages/private/Private";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(s => s.user.isAuth)
  useEffect(() => {
    dispatch(getAll());
    window.scrollTo({top:0})
  },[]);

  const authOnReload = async() => {
    const auth = await getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(uId(uid))
        dispatch(authState(!!uid))
      } else {
        dispatch(uId(''))
        dispatch(authState(false))
      }
    });

  } 
  
  useEffect(() => {
    cardIsEmpty2().then(b => {
      if (b) {
        dispatch(card(true));
      } else{
        dispatch(card(false));
      }
    })

    favIsEmpty2().then(b => {
      if (b) {
        dispatch(favorite(true));
      } else{
        dispatch(favorite(false));
      }
    })
    
    authOnReload()
  },[isAuth]);
  console.log(process.env)
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/private" element={<Private />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
