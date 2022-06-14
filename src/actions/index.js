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

const API = "https://628b6c0d667aea3a3e2ef5f3.mockapi.io/api/";
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

// =====================================>>>COLLECTIONS<<<====================

export const collections =
  (page = 1, limit, boolean = false) =>
  async (dispatch) => {
    const res = await axios.get(
      `http://localhost:5000/collections?_limit=${limit}&_page=${page}`
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
      `http://localhost:5000/products?status=${status}&_page=${page}&_limit=${limit}`
    );
    dispatch({ type: status, payload: res.data });
  };

// =====================================>>>DETAIL<<<====================

export const idToName = async (id) => {
  const res = await axios.get(`http://localhost:5000/collections?id=${id}`);
  return res.data[0].name;
};

export const collectDetail = (name, page, limit) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:5000/products?collection=${name}&_limit=${limit}&_page=${page}`
  );
  dispatch(collectDet({ data: res.data, total: res.headers["x-total-count"] }));
};

export const nameToId = async (name) => {
  const res = await axios.get(`http://localhost:5000/collections?name=${name}`);
  return res.data[1].id;
};

export const getDetail = async (id) => {
  const res = await axios.get(`http://localhost:5000/products?id=${id}`);
  return res.data[0];
};

// =====================================>>>FAVORITE<<<====================

export const fromToFav = (id, dispatch) => {
  let arr = JSON.parse(localStorage.getItem("fav"));
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
    // console.log(false);
  }
  localStorage.setItem("fav", JSON.stringify(arr));
};

export const isFav = (id) => {
  const arr = JSON.parse(localStorage.getItem("fav"));
  if (id) {
    return arr.includes(id);
  } else {
    return true;
  }
};

export const idToProduct = async (ids) => {
  if (ids) {
    return Promise.all(
      ids.map(async (id) => axios.get(`http://localhost:5000/products/${id}`))
    ).then((values) => values);
  }
};

export const favIsEmpty = () => {
  const arr = JSON.parse(localStorage.getItem("fav"));
  if (arr.length > 0) return true;
  return false;
};

// =====================================>>>CARD<<<====================

const isHave = (local, data) => {
  let id = local.map((e) => e.id);
  let color = local.map((e) => e.color);
  id = id.includes(data.id);
  color = color.includes(data.color);
  if (id && color) return true;
  return false;
};

export const fromOrToCard = (data, dispatch) => {
  const filter = (e, fromToCard) => {
    if (e.id == fromToCard.id && e.color == fromToCard.color) {
      return false;
    }
    return true;
  };

  let local = JSON.parse(localStorage.getItem("card"));
  if (local) {
    if (isHave(local, data)) {
      // console.log("local", local);
      local = local.filter((e) => filter(e, data));
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
  return JSON.parse(localStorage.getItem("card"));
};

export const increment = (data) => {
  const local = JSON.parse(localStorage.getItem("card"));
  local.map((e) => {
    if (e.id == data.id && e.color == data.color) {
      // console.log("inc");
      e.count++;
    }
  });
  localStorage.setItem("card", JSON.stringify(local));
};
export const decrement = (data) => {
  const local = JSON.parse(localStorage.getItem("card"));
  local.map((e) => {
    if (e.id == data.id && e.color == data.color) {
      // console.log("dec");

      e.count--;
    }
  });
  localStorage.setItem("card", JSON.stringify(local));
};
export const cardIsEmpty = () => {
  const arr = JSON.parse(localStorage.getItem("card"));
  if (arr.length > 0) return true;
  return false;
};

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
  arr = Array.isArray(arr) && arr.length > 0 ? arr.map((e) => (e.price / 100) * e.discount).reduce((a, b) => a + b) : null;
  return Math.floor(arr)
};

// =====================================>>>SEARCH<<<====================

export const searchByName = (name, limit, page) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:5000/products?name_like=${name}&_limit=${limit}&_page=${page}`
  );
  dispatch(search({ data: res.data, total: res.headers["x-total-count"] }));
};
