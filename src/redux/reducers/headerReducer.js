const HEADER = "HEADER_NUMBER";
const initialState = {
  number: "",
  logo:'',
  link:''
};
export const headerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case HEADER:
      return { ...state, number: payload.number, logo: payload.logo, link: payload.link  };
    default:
      return state;
  }
};

export const header = (payload) => ({ type: HEADER, payload: payload });

