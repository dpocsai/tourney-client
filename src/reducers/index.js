import { combineReducers } from "redux";

import tournaments from "./tournaments";
import authReducer from "./authReducer";

export default combineReducers({ tournaments, auth: authReducer });
