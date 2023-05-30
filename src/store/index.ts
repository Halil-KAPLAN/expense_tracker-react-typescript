import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import { UserState } from "../types/user";
import { CategoryState } from "../types/category";
import categoryReducer from "./reducers/categoryReducer";

export interface AppState {
  user: UserState;
  categories: CategoryState;
  records: any;
}

const rootReducer = combineReducers<AppState>({
  user: userReducer,
  categories: categoryReducer,
  records: () => {
    return null;
  },
});

export default rootReducer;
