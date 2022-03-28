import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index.js";
// import createSagaMiddleware from "@redux-saga/core";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/index.js";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;