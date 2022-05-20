import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Appreducer from "../app/reducers";

const store = createStore(Appreducer, applyMiddleware(thunk));

export default store;
