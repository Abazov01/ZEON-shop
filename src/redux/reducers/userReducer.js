const ID = "ID";
const IS_AUTH = "IS_AUTH";
const init = {
  uid: "",
  isAuth: false,
};

export const userReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case ID:
      return { ...state, uid: payload };
    case IS_AUTH:
      return { ...state, isAuth: payload };
    default:
      return state
  }
};

export const uId = (pay) => ({type:ID, payload:pay})
export const authState = (pay) => ({type:IS_AUTH, payload:pay})