const initial = [];
const NEWS = "NEWS";

export const newsReducer = (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
      case NEWS:
          return payload
      default:
          return state
  }
};

export const news = (pay) => ({type: NEWS, payload:pay})