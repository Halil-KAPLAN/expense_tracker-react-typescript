import { ThunkDispatch } from "redux-thunk";

export interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string;
}

export type CategoryType = "income" | "expense";

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  color: string;
}

export interface CategoryForm {
  name: string;
  type: CategoryType;
  color?: string;
}

interface GET_START {
  type: "GET_CATEGORIES_START";
}
interface GET_SUCCESS {
  type: "GET_CATEGORIES_SUCCESS";
  payload: Category[];
}
interface GET_ERROR {
  type: "GET_CATEGORIES_ERROR";
}

interface ADD_START {
  type: "ADD_CATEGORIES_START";
}
interface ADD_SUCCESS {
  type: "ADD_CATEGORIES_SUCCESS";
  payload: Category;
}
interface ADD_ERROR {
  type: "ADD_CATEGORIES_ERROR";
}

interface UPDATE_START {
  type: "UPDATE_CATEGORIES_START";
}
interface UPDATE_SUCCESS {
  type: "UPDATE_CATEGORIES_SUCCESS";
  payload: Category;
}
interface UPDATE_ERROR {
  type: "UPDATE_CATEGORIES_ERROR";
}

interface DELETE_START {
  type: "DELETE_CATEGORIES_START";
}
interface DELETE_SUCCESS {
  type: "DELETE_CATEGORIES_SUCCESS";
  payload: number;
}
interface DELETE_ERROR {
  type: "DELETE_CATEGORIES_ERROR";
}

export type CategoryAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR
  | UPDATE_START
  | UPDATE_SUCCESS
  | UPDATE_ERROR
  | DELETE_START
  | DELETE_SUCCESS
  | DELETE_ERROR;
export type CategoryDispatch = ThunkDispatch<
  CategoryState,
  void,
  CategoryAction
>;
