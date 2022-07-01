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
import { phone } from "../redux/reducers/phonsReducer.js";
import { prompting } from "../redux/reducers/promptingReducer";
import { price, discount } from "./index";

const API = "https://628b6c0d667aea3a3e2ef5f3.mockapi.io/api/";
const LOCAL_API = "http://localhost:5000";
const answer =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. Ut cras ut rhoncus fermentum pharetra a sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. ";
const newsObj = {
  title: "Lorem ipsum dolor sit amet",
  text: "Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis scelerisque congu econgu econgu econguecongu econguecon guecon guecon guecong ueconguecong uec ongue. Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque  Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis ",
};
const uid = JSON.parse(localStorage.getItem("currentUser"))?.uid;
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
  dispatch(phone(res.data[0].phons));
};

export const prompts = (name) => async (dispatch) => {
  let res = await axios.get(`${LOCAL_API}/products?name_like=${name}`);
  res = res.data.map((e) => e.name);
  res = new Set(res);
  dispatch(prompting(res));
};

export const sendMessage = (text) => {
  axios
    .post(
      `https://api.telegram.org/bot5234422230:AAG71qcmLjzlcH8V92lmPR_doGzO-4PwRB8/sendMessage?chat_id=-617026245&text=${text}`
    )
    .then(console.log)
    .catch(console.error);
};
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

export const bread = (arr) => async (dispatch) => {
  arr.shift();
  if (arr[0] == "result") arr.pop();
  if (arr.length == 2) {
    const res = await axios.get(`${LOCAL_API}/collections?id=${+arr[1]}`);
    arr[1] = await res.data[0].name;
  } else if (arr.length == 3) {
    const coll = await axios.get(`${LOCAL_API}/collections?id=${+arr[1]}`);
    const prod = await axios.get(`${LOCAL_API}/products?id=${+arr[2]}`);
    arr[1] = await coll.data[0].name;
    arr[2] = await prod.data[0].name;
  }
  dispatch({ type: "BREAD", payload: arr });
};

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

export const fromToFav2 = async (id, dispatch) => {
  if (uid) {
    let res = await axios.get(`${LOCAL_API}/users?uid=${uid}`);
    let data = res.data[0];
    const isHave = data && data.fav.includes(id);
    if (isHave) {
      data.fav = data.fav.filter((e) => e != id);
    } else {
      data.fav.push(id);
    }
    if (data.fav.length > 0) {
      dispatch(favorite(true));
    } else {
      dispatch(favorite(false));
    }
    axios.patch(LOCAL_API + `/users/${data.id}`, data);
  }
};

export const isFav2 = async (id) => {
  if (uid) {
    let res = await axios.get(`${LOCAL_API}/users?uid=${uid}`);
    if (id) {
      return await res.data[0].fav.includes(id);
    } else {
      return true;
    }
  }
  return false;
};

export const idToProduct = async (ids) => {
  if (ids) {
    return Promise.all(
      ids.map(async (id) => axios.get(`${LOCAL_API}/products/${id}`))
    ).then((values) => values);
  }
};

export const favIsEmpty2 = async () => {
  if (uid) {
    let res = await axios.get(`${LOCAL_API}/users?uid=${uid}`);
    if (res.data[0].fav.length > 0) return true;
  }
  return false;
};

// =====================================>>>CARD<<<====================

const isHave = (local, data) => {
  let color = local
    .filter((e) => e.id == data.id)
    .filter((e) => e.color == data.color);
  if (color.length > 0) return true;
  return false;
};

export const fromToCard2 = async (obj, dispatch) => {
  if (uid) {
    const res = await axios.get(LOCAL_API + `/users?uid=${uid}`);
    let data = res.data[0];
    if (isHave(data.card, obj)) {
      data.card = data.card.filter((e) =>
        e.id == obj.id && e.color == obj.color ? false : true
      );
    } else {
      console.log("add");
      data.card.push(obj);
    }
    if (data.card.length > 0) {
      dispatch(card(true));
    } else {
      dispatch(card(false));
    }
    axios.patch(LOCAL_API + `/users/${data.id}`, data);
  }
};

export const isCard2 = async (id, color) => {
  if (uid) {
    const res = await axios(LOCAL_API + "/users?uid=" + uid);
    return isHave(res.data[0].card, { id, color });
  }
};

export const getCard2 = async () => {
  if (uid) {
    const res = await axios.get(LOCAL_API + `/users?uid=${uid}`);
    return res.data[0].card;
  }
};

export const increment2 = async (data) => {
  if (uid) {
    const res = await axios.get(LOCAL_API + "/users?uid=" + uid);
    let user = res.data[0];
    user.card.map((e) => {
      if (e.id == data.id && e.color == data.color) {
        e.count++;
      }
    });
    axios.patch(LOCAL_API + `/users/${user.id}`, user);
  }
};

export const decrement2 = async (data) => {
  console.log(data.count);
  if (data.count > 1) {
    if (uid) {
      const res = await axios.get(LOCAL_API + "/users?uid=" + uid);
      let user = res.data[0];
      user.card.map((e) => {
        if (e.id == data.id && e.color == data.color) {
          e.count--;
        }
      });
      axios.patch(LOCAL_API + `/users/${user.id}`, user);
    }
  }
};

export const cardIsEmpty2 = async () => {
  if (uid) {
    const res = await axios(LOCAL_API + "/users?uid=" + uid);
    return res.data[0].card.length > 0 ? true : false;
  }
};

//===================================HISTORY===========================================

export const clearCard = () => {
  const arr = JSON.parse(localStorage.getItem("card"));
  arr.length = 0;
  localStorage.setItem("card", JSON.stringify(arr));
};
export const clearCard2 = async () => {
  if (uid) {
    const res = await axios.get(LOCAL_API + "/users?uid=" + uid);
    const data = res.data[0];
    const body = data.card.splice(0, data.card.length);
    const push = {
      data: body,
      date:
        new Date().getDate() +
        "." +
        (new Date().getMonth() + 1) +
        "." +
        new Date().getFullYear(),
      oclock: new Date().getHours() + ":" + new Date().getMinutes(),
    };
    data.history.push(push);
    axios.patch(LOCAL_API + `/users/${data.id}`, data);
  }
};

// ===============GETTING==============================ALL_ORDERS====================

export const getAllOrders = async () => {
  if (uid) {
    const res = await axios.get(LOCAL_API + "/users?uid=" + uid);
    return res.data[0].history;
  }
};

export const allLine = async () => {
  if (uid) {
    const data = [];
    const res = await axios.get(LOCAL_API + "/users?uid=" + uid);
    const orders = res.data[0].history.map((e) => e.data);
    orders.map((e) => e.map((e) => data.push(e)));
    const line = data.map((e) => e.count).reduce((a, b) => a + b);
    const product = data
      .map((e) => ((e.size.end - e.size.start) / 2 + 1) * e.count)
      .reduce((a, b) => a + b);
    const price = data.map((e) => e.count * e.price).reduce((a, b) => a + b);
    const discount = Math.floor(
      data
        .map((e) => (e.price / 100) * e.discount * e.count)
        .reduce((a, b) => a + b)
    );
    const total = price - discount;
    return { line, product, price, discount, total };
  }
};

// =========================TOTAL==========ORDER==========================
export const lineCount = () => {
  let arr = JSON.parse(localStorage.getItem("card"));
  arr =
    Array.isArray(arr) && arr.length > 0
      ? arr.map((e) => e.count).reduce((a, b) => a + b)
      : null;
  return arr;
};
export const lineCount2 = async () => {
  const res = await axios.get(LOCAL_API + "/users?uid=" + uid);
  const user = res.data[0];
  return user.card.map((e) => e.count).reduce((a, b) => a + b);
};

export const productCount = () => {
  let arr = JSON.parse(localStorage.getItem("card"));
  arr =
    Array.isArray(arr) && arr.length > 0
      ? arr
          .map((e) => ((e.size.end - e.size.start) / 2 + 1) * e.count)
          .reduce((a, b) => a + b)
      : null;
  return arr;
};

export const productCount2 = async () => {
  const res = await axios.get(LOCAL_API + "/users?uid=" + uid);
  const user = res.data[0];
  return user.card
    .map((e) => ((e.size.end - e.size.start) / 2 + 1) * e.count)
    .reduce((a, b) => a + b);
};

export const pricee = () => {
  let arr = JSON.parse(localStorage.getItem("card"));
  arr =
    Array.isArray(arr) && arr.length > 0
      ? arr.map((e) => e.count * e.price).reduce((a, b) => a + b)
      : null;
  return arr;
};

export const price2 = async () => {
  const res = await axios.get(LOCAL_API + "/users?uid=" + uid);
  const user = res.data[0];
  return user.card.map((e) => e.count * e.price).reduce((a, b) => a + b);
};

export const discountt = () => {
  let arr = JSON.parse(localStorage.getItem("card"));
  arr =
    Array.isArray(arr) && arr.length > 0
      ? arr
          .map((e) => (e.price / 100) * e.discount * e.count)
          .reduce((a, b) => a + b)
      : null;
  return Math.floor(arr);
};

export const discount2 = async () => {
  const res = await axios.get(LOCAL_API + "/users?uid=" + uid);
  const user = res.data[0];
  return Math.floor(
    user.card
      .map((e) => (e.price / 100) * e.discount * e.count)
      .reduce((a, b) => a + b)
  );
};
// =====================================>>>SEARCH<<<====================

export const searchByName = (name, limit, page) => async (dispatch) => {
  const res = await axios.get(
    `${LOCAL_API}/products?name_like=${name}&_limit=${limit}&_page=${page}`
  );
  dispatch(search({ data: res.data, total: res.headers["x-total-count"] }));
};
