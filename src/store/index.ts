import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import { UserState } from "../types/user";

interface AppState {
  user: UserState;
  categories: any;
  records: any;
}

const rootReducer = combineReducers<AppState>({
  user: userReducer,
  categories: () => {
    return null;
  },
  records: () => {
    return null;
  },
});

export default rootReducer;
