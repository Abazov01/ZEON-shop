import { useDispatch } from "react-redux";
import done from "../../assets/modal/Vector (10).png";
import { isSended } from "../../redux/reducers/booleanReducer";



export default function Thanks  ({setChat, setMess}) {
    const dispatch = useDispatch()
    const continuee = ()=>{
       setChat(false);
       dispatch(isSended(false))

       setMess(false);
    }
  return (
    <div className="thanks">
      <div className="thanks__img">
        <img src={done} alt="" />
      </div>
      <div className="thanks__title">Спасибо!</div>
      <div className="thanks__text">Ваша заявка была принята ожидайте, скоро Вам перезвонят</div>
      <button autoFocus onClick={() =>continuee()} className="thanks__button">Продолжить покупки</button>
    </div>
  );
};
