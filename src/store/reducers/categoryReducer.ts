import { CategoryAction, CategoryState } from "../../types/category";

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: "",
};

const categoryReducer = (
  state: CategoryState = initialState,
  action: CategoryAction
) => {
  switch (action.type) {
    case "GET_CATEGORIES_START":
      return { ...state, loading: true, error: "" };
    case "GET_CATEGORIES_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_CATEGORIES_ERROR":
      return { ...state, loading: false, error: "Error fetching categories!" };
    case "ADD_CATEGORIES_START":
      return { ...state, loading: true, error: "" };
    case "ADD_CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_CATEGORIES_ERROR":
      return { ...state, loading: false, error: "Error add from!" };
    default:
      return state;
  }
};

export default categoryReducer;
