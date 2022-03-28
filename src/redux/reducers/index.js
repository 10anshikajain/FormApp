import { combineReducers } from "redux";
import form from "./form";

const rootReducer = combineReducers({
    form: form
});

export default rootReducer;