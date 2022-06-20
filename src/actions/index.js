import axios from "axios";
import { about } from "../redux/reducers/aboutReducer";
import { collect } from "../redux/reducers/collectionsReducer";
import { footer } from "../redux/reducers/footerReducer";
import { header } from "../redux/reducers/headerReducer";
import { news } from "../redux/reducers/newsReducer";
import { questions } from "../redux/reducers/questionsReducer";
import { homeCollections } from "../redux/reducers/collectionsReducer";
import { collectDet } from "../redux/reducers/DetailReducer";
import { card, favorite } from "./../redux/reducers/booleanReducer";
import { search } from "../redux/reducers/searchReducer";
import {phone} from '../redux/reducers/phonsReducer.js'
import { prompting } from "../redux/reducers/promptingReducer";

const API = "https://628b6c0d667aea3a3e2ef5f3.mockapi.io/api/";
const LOCAL_API = 'http://localhost:5000'
const answer =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. Ut cras ut rhoncus fermentum pharetra a sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. ";
const newsObj = {
  title: "Lorem ipsum dolor sit amet",
  text: "Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis scelerisque congu econgu econgu econguecongu econguecon guecon guecon guecong ueconguecong uec ongue. Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque  Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis ",
};

// =====================================>>>GENERAL<<<====================

export const getAll = () => async (dispatch) => {
  const res = await axios.get(API + "general");
  dispatch(footer(res.data[0].footer));
  dispatch(header(res.data[0].header));
  const arr = res.data[0].questions.map((e) => ({ ...e, answer: answer }));
  dispatch(questions(arr));
  const newsArr = res.data[0].news.map((e) => ({
    ...e,
    title: newsObj.title,
    text: newsObj.text,
  }));
  dispatch(news(newsArr));
  dispatch(about(res.data[0].about));
  dispatch(phone(res.data[0].phons))
};


export const prompts = (name)=>async(dispatch) => {
  let res = await axios.get(`${LOCAL_API}/products?name_like=${name}`)
  res = res.data.map(e => e.name)
  res = new Set(res)
  dispatch(prompting(res))
}


// =====================================>>>COLLECTIONS<<<====================

export const collections =
  (page = 1, limit, boolean = false) =>
  async (dispatch) => {
    const res = await axios.get(
      `${LOCAL_API}/collections?_limit=${limit}&_page=${page}`
    );
    if (boolean) {
      dispatch(
        collect({ data: res.data, total: res.headers["x-total-count"], limit })
      );
    } else {
      dispatch(homeCollections(res.data));
    }
  };
// =====================================>>>HOME<<<====================

export const statuses =
  (status, limit = 4, page) =>
  async (dispatch) => {
    const res = await axios.get(
      `${LOCAL_API}/products?status=${status}&_page=${page}&_limit=${limit}`
    );
    dispatch({ type: status, payload: res.data });
  };

// =====================================>>>DETAIL<<<====================

export const idToName = async (id) => {
  const res = await axios.get(`${LOCAL_API}/collections?id=${id}`);
  return res.data[0].name;
};

export const bread = (arr) => async(dispatch) =>{
  arr.shift()
  if(arr[0] == 'result') arr.pop() 
  if(arr.length == 2){
    const res = await axios.get(`${LOCAL_API}/collections?id=${+arr[1]}`)
    arr[1] = await res.data[0].name
  }else if(arr.length == 3){
    const coll = await axios.get(`${LOCAL_API}/collections?id=${+arr[1]}`)
    const prod = await axios.get(`${LOCAL_API}/products?id=${+arr[2]}`)
    arr[1] = await coll.data[0].name
    arr[2] = await prod.data[0].name
  }
  dispatch({type: 'BREAD', payload: arr})
}

export const collectDetail = (name, page, limit) => async (dispatch) => {
  const res = await axios.get(
    `${LOCAL_API}/products?collection=${name}&_limit=${limit}&_page=${page}`
  );
  dispatch(collectDet({ data: res.data, total: res.headers["x-total-count"] }));
};

export const nameToId = async (name) => {
  const res = await axios.get(`${LOCAL_API}/collections?name=${name}`);
  return res.data[1].id;
};

export const getDetail = async (id) => {
  const res = await axios.get(`${LOCAL_API}/products?id=${id}`);
  return res.data[0];
};

// =====================================>>>FAVORITE<<<====================

export const fromToFav = (id, dispatch) => {
  let arr = JSON.parse(localStorage.getItem("fav")) || [];
  const bool = arr.includes(id);
  if (bool) {
    arr = arr.filter((e) => e !== id);
  } else {
    arr.push(id);
  }
  if (arr.length > 0) {
    dispatch(favorite(true));
  } else {
    dispatch(favorite(false));
  }
  localStorage.setItem("fav", JSON.stringify(arr));
};

export const isFav = (id) => {
  const arr = JSON.parse(localStorage.getItem("fav")) || [];
  if (id) {
    return arr.includes(id);
  } else {
    return true;
  }
};

export const idToProduct = async (ids) => {
  if (ids) {
    return Promise.all(
      ids.map(async (id) => axios.get(`${LOCAL_API}/products/${id}`))
    ).then((values) => values);
  }
};

export const favIsEmpty = () => {
  const arr = JSON.parse(localStorage.getItem("fav")) || [];
  if (arr.length > 0) return true;
  return false;
};

// =====================================>>>CARD<<<====================

const isHave = (local, data) => {
  let color = local.filter(e => e.id == data.id).filter(e => e.color == data.color)
  if (color.length > 0) return true;
  return false;
};
export const fromOrToCard = (data, dispatch) => {

  let local = JSON.parse(localStorage.getItem("card")) || [];
  if (local) {
    if (isHave(local, data)) {
      local = local.filter((e) => e.id !== data.id && e.color !== data.color);
    } else {
      local.push(data);
    }
  }


  if (local.length > 0) {
    dispatch(card(true));
  } else {
    dispatch(card(false));
  }


  localStorage.setItem("card", JSON.stringify(local));
};

export const isCard = (id, color) => {
  const local = JSON.parse(localStorage.getItem("card"));
  return isHave(local, { id, color });
};

export const getCard = () => {
  return JSON.parse(localStorage.getItem("card")) || [];
};

export const increment = (data) => {
  const local = JSON.parse(localStorage.getItem("card")) || [];
  local.map((e) => {
    if (e.id == data.id && e.color == data.color) {
      e.count++;
    }
  });
  localStorage.setItem("card", JSON.stringify(local));
};
export const decrement = (data) => {
  const local = JSON.parse(localStorage.getItem("card")) || [];
  local.map((e) => {
    if (e.id == data.id && e.color == data.color) {

      e.count--;
    }
  });
  localStorage.setItem("card", JSON.stringify(local));
};
export const cardIsEmpty = () => {
  const arr = JSON.parse(localStorage.getItem("card")) || [];
  if (arr.length > 0) return true;
  return false;
};

export const clearCard = () => {
  const arr = JSON.parse(localStorage.getItem('card'))
  arr.length = 0
  localStorage.setItem('card', JSON.stringify(arr))
}

// =========================TOTAL==========ORDER==========================
export const lineCount = () => {
  let arr = JSON.parse(localStorage.getItem("card"));
  arr = Array.isArray(arr) && arr.length > 0 ? arr.map((e) => e.count).reduce((a, b) => a + b) : null;
  return arr;
};

export const productCount = () => {
  let arr = JSON.parse(localStorage.getItem("card"));
  arr = Array.isArray(arr) && arr.length > 0 ? arr.map((e) => ((e.size.end - e.size.start) / 2 + 1) * e.count).reduce((a, b) => a + b) : null;
  return arr;
};

export const price = () => {
  let arr = JSON.parse(localStorage.getItem("card"));
  arr = Array.isArray(arr) && arr.length > 0 ? arr.map((e) => e.count * e.price).reduce((a, b) => a + b) : null;
  return arr;
};

export const discount = () => {
  let arr = JSON.parse(localStorage.getItem("card"));
  arr = Array.isArray(arr) && arr.length > 0 ? arr.map((e) => (e.price / 100) * e.discount * e.count).reduce((a, b) => a + b) : null;
  return Math.floor(arr)
};

// =====================================>>>SEARCH<<<====================

export const searchByName = (name, limit, page) => async (dispatch) => {
  const res = await axios.get(
    `${LOCAL_API}/products?name_like=${name}&_limit=${limit}&_page=${page}`
  );
  dispatch(search({ data: res.data, total: res.headers["x-total-count"] }));
};
