import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import { getAll } from "./redux/actions/index";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Help from "./pages/help/Help";
import News from "./pages/news/News";
import Advantage from './pages/homepage/components/advantage/Advantage';
import FixModal from './components/fixedModal/FixModal';
import Public from "./pages/public/Public";
import HomeCarousel from "./pages/homepage/components/homeCarousel.js/HomeCarousel";
import MainCard from "./components/mainCard/MainCard";
import { cardArr } from './test';
import About from "./pages/aboutpage/About";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <div className="App">
      <Header />
      {/* <Help/> */}
      <HomeCarousel/>
      {/* <MainCard imgArr={cardArr} name={'Вечернее платье'} discount={45} price={1365} oldPrice={2730} size={{start:42, end: 50}}/> */}
      <FixModal/>
      {/* <About/> */}
      {/* <Advantage/>   */}
      {/* <News/> */}
      <Footer />
    </div>
  );
}

export default App;
