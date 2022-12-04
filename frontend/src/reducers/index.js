import { combineReducers } from "redux";
import { coords } from "./coords.reducer";
import { error } from "./error.reducer";
import { hits } from "./hit.reducer";

const rootReducer = combineReducers({
    coords,
    error,
    hits
});

export default rootReducer;