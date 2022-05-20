import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchFavoritesUser, addfavoriteUser, favoriteById } from "../actions";

function Favorites() {
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchFavorite, setSearchFavorite] = useState("");

  const _searchFilter = () => {
    let list = [...reduxData.favoriteUsers];
    let updatedArray = [];
    updatedArray = list.filter((user) => {
      const fullName = user.first_name
        .concat(" ", user.last_name)
        .toLowerCase();

      return fullName.search(searchFavorite.toLowerCase()) !== -1;
    });
    console.log(updatedArray);
    dispatch(searchFavoritesUser(updatedArray));
  };

  var _removeFavor = (id) => {
    let list = [...reduxData.favoriteUsers];
    var index = list
      .map((x) => {
        return x.id;
      })
      .indexOf(id);
    list.splice(index, 1);
    let favoriteList = [...reduxData.favoriteId];
    favoriteList.splice(index, 1);
    dispatch(addfavoriteUser(list));
    dispatch(favoriteById(favoriteList));
  };

  console.log(reduxData);
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-2">
        {reduxData.favoriteUsers.length > 0 && (
          <nav className="navbar navbar-light bg-light">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search User"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setSearchFavorite(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  onClick={() => _searchFilter()}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </nav>
        )}

        <div className="col-12">
          <h3>
            Your Favorite User Count: {reduxData.favoriteUsers.length || 0}
          </h3>
        </div>
        <div className="col-6">
          {reduxData.searchedFavorites.length > 0
            ? reduxData.searchedFavorites.length > 0 &&
              reduxData.searchedFavorites.map((users, index) => (
                <div className="card mt-2" key={index}>
                  <div className="card-body">
                    {users.first_name} {users.last_name}
                    <span className="ml-2">
                      <i
                        className="fa fa-star star-active"
                        onClick={() => _removeFavor(users.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </div>
                </div>
              ))
            : reduxData.favoriteUsers.length > 0 &&
              reduxData.favoriteUsers.map((users, index) => (
                <div className="card mt-2" key={index}>
                  <div className="card-body">
                    {users.first_name} {users.last_name}
                    <span className="ml-2">
                      <i
                        className="fa fa-star star-active"
                        onClick={() => _removeFavor(users.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}

export default Favorites;
