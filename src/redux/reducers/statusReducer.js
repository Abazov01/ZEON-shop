const initialState = {
  hits: [],
  news: [],
};

export const statusReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "Хит продаж":
        return {...state, hits: [...state.hits, ...payload]}
    case "Новинки":
        return {...state, news: [...state.news, ...payload]}
    default:
       return state
  }
};
