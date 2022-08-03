import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import { injectStore } from "../setup/axios";
// Store includes: reducers, middleware...(ex: composeWithDevTools)
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

injectStore(store);

export default store;
