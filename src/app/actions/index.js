import axios from "axios";
import {
  FETCH_USERS_DATA,
  ADD_FAVORITE_USER,
  FAVORITE_BY_ID,
  SEARCH_DATA_USER,
  SEARCHED_FAVORITE_USER,
  INITIAL_LOADER,
  USER_LIST,
} from "../types/index";

export const getUserList = (data) => ({
  type: FETCH_USERS_DATA,
  data,
});

export const searchDataUser = (data) => ({
  type: SEARCH_DATA_USER,
  data,
});

export const addfavoriteUser = (data) => ({
  type: ADD_FAVORITE_USER,
  data,
});

export const favoriteById = (data) => ({
  type: FAVORITE_BY_ID,
  data,
});

export const searchFavoritesUser = (data) => ({
  type: SEARCHED_FAVORITE_USER,
  data,
});
export const initialLoader = (value) => ({
  type: INITIAL_LOADER,
  value,
});

export const userData = (data) => ({
  type: USER_LIST,
  data,
});

export const fetchData = (page) => {
  return (dispatch) => {
    dispatch(initialLoader(true));
    return axios
      .get(
        ` https://reqres.in/api/users?page=${
          page ? page : 1
        }&per_page=${6}&delay=1`
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch(getUserList(data));
        dispatch(userData(data.data));
        dispatch(initialLoader(false));
      })

      .catch((error) => {
        dispatch(initialLoader(false));
        throw error;
      });
  };
};
