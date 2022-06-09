import { combineReducers } from "redux";
import { footerReducer } from "./footerReducer";
import { headerReducer } from "./headerReducer";
import { boolReducer } from './booleanReducer';
import { questionsReducer } from './questionsReducer';
import { newsReducer } from './newsReducer';
import { aboutReducer } from './aboutReducer';
import { collectionsReducer } from './collectionsReducer';
import { statusReducer } from './statusReducer';

export const rootReducer = combineReducers({
    footer: footerReducer,
    header: headerReducer,
    booleans: boolReducer,
    questions: questionsReducer,
    news: newsReducer,
    about: aboutReducer,
    collections: collectionsReducer,
    statuses: statusReducer,
})