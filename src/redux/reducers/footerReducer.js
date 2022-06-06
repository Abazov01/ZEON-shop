const initialState = {
  contacts: [],
  social: [],
  logo:''
};
const FOOTER = "FOOTER";
export const footerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FOOTER:
      return { ...state, contacts: payload.contacts, social: payload.social, logo: payload.logo };
    default:
      return state;
  }
};

export const footer = (payload) => ({ type: FOOTER, payload: payload });
