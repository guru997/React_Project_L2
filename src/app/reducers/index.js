import {
  FETCH_USERS_DATA,
  ADD_FAVORITE_USER,
  FAVORITE_BY_ID,
  SEARCH_DATA_USER,
  SEARCHED_FAVORITE_USER,
  INITIAL_LOADER,
  USER_LIST,
} from "../types/index";

const INITIAL_STATE = {
  userdata: "",
  userList: [],
  favoriteUsers: [],
  favoriteId: [],
  searchedFavorites: [],
  loader: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_DATA:
      return {
        ...state,
        userdata: action.data,
      };
    case USER_LIST:
      return {
        ...state,
        userList: action.data,
      };
    case ADD_FAVORITE_USER:
      return {
        ...state,
        favoriteUsers: action.data,
      };
    case FAVORITE_BY_ID:
      return {
        ...state,
        favoriteId: action.data,
      };
    case SEARCH_DATA_USER:
    
      return {
        ...state,
        userList: action.data,
      };
    case SEARCHED_FAVORITE_USER:
      return {
        ...state,
        searchedFavorites: action.data,
      };
    case INITIAL_LOADER:
      return {
        ...state,
        loader: action.value,
      };
    default:
      return state;
  }
};
