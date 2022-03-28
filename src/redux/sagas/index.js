import { all } from "redux-saga/effects";
import formSaga from "./formSaga";

export default function* rootSaga(){
    yield all([
        formSaga(),
    ]);
}