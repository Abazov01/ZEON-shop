import { combineReducers } from "redux";
import { footerReducer } from "./footerReducer";
import { headerReducer } from "./headerReducer";
import { boolReducer } from './booleanReducer';
import { questionsReducer } from './questionsReducer';
import { newsReducer } from './newsReducer';
import { aboutReducer } from './aboutReducer';
import { collectionsReducer } from './collectionsReducer';
import { statusReducer } from './statusReducer';
import { DetailReducer } from './DetailReducer';
import { searchReducer } from './searchReducer';
import { phonsReducer } from './phonsReducer';
import { breadReducer } from './breadReducer';
import { promptingReducer } from './promptingReducer';
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    footer: footerReducer,
    header: headerReducer,
    booleans: boolReducer,
    questions: questionsReducer,
    news: newsReducer,
    about: aboutReducer,
    collections: collectionsReducer,
    statuses: statusReducer,
    detail: DetailReducer,
    searchResult: searchReducer,
    phons: phonsReducer,
    bread: breadReducer,
    hints: promptingReducer,
    user:userReducer,
})