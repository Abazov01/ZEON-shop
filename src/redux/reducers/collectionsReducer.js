const COLLECTIONS = "COLLECTIONS";
const HOMECOLLECTIONS = "HOMECOLLECTIONS";

const defState = {
  collections: [],
  homeCollections: [],
  total: null,
  limit: null
};

export const collectionsReducer = (state = defState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COLLECTIONS:
      return { ...state, collections: payload.data, total: payload.total, limit: payload.limit };
    case HOMECOLLECTIONS:
      return { ...state, homeCollections: [...state.homeCollections, ...payload] };
    default:
      return state;
  }
};

export const collect = (pay) => ({type:COLLECTIONS, payload:pay})
export const homeCollections = (pay) => ({type:HOMECOLLECTIONS, payload: pay})
