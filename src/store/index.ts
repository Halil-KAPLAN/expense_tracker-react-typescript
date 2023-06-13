import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import { UserState } from "../types/user";
import { CategoryState } from "../types/category";
import categoryReducer from "./reducers/categoryReducer";
import recordReducer from "./reducers/recordReducer";
import { RecordState } from "../types/record";

export interface AppState {
  user: UserState;
  categories: CategoryState;
  records: RecordState;
}

const rootReducer = combineReducers<AppState>({
  user: userReducer,
  categories: categoryReducer,
  records: recordReducer,
});

export default rootReducer;
