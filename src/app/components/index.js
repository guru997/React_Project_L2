import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchData,
  addfavoriteUser,
  favoriteById,
  getUserList,
  searchDataUser,
} from "../actions/index";

function AppComponent() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();

  var _addFavors = (data) => {
    console.log("data:", data);
    let list = [...reduxData.favoriteUsers];
    list.push(data);
    let favoriteList = [...reduxData.favoriteId];
    favoriteList.push(data.id);

    dispatch(addfavoriteUser(list));
    dispatch(favoriteById(favoriteList));
  };
  console.log(reduxData.favoriteId, "favorite Id");

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

  const _searchFilter = () => {
    if (search === "") {
      dispatch(fetchData());
    } else {
      let list = [...reduxData.usersList];
      let updatedArray = [];
      updatedArray = list.filter((user) => {
        const fullName = user.first_name
          .concat(" ", user.last_name)
          .toLowerCase();

        return fullName.search(search.toLowerCase()) !== -1;
      });
      console.log(updatedArray);
      dispatch(searchDataUser(updatedArray));
    }
  };

  const _pagination = (index) => {
    {
      dispatch(fetchData(index));
    }
  };

  return (
    <>
      <div className="container">
        {reduxData.loader ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-light bg-light">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search User"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setSearch(e.target.value)}
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
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th>Favorites</th>
                </tr>
              </thead>
              <tbody>
                {reduxData.userList?.length > 0 &&
                  reduxData.userList?.map((user, index) => (
                    <tr key={index}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>
                        {/* <i
                      className={`fa fa-star custom-star-design  ${
                        reduxData.favoriteId.includes(user.id) && "star-active"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={`${reduxData.favoriteId.includes(
                        user.id ? _addFavors(user) : _removeFavor(index)
                      )} `}
                    /> */}
                        {reduxData.favoriteId.includes(user.id) ? (
                          <i
                            className="fa fa-star star-active custom-star-design"
                            onClick={() => _removeFavor(user.id)}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <i
                            className="fa fa-star custom-star-design"
                            onClick={() => _addFavors(user)}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
        {reduxData.userdata?.total_pages !== 1 &&
          [...Array(reduxData.userdata?.total_pages)].map((x, index) => {
            index = index + 1;
            return (
              <button
                className={`btn btn-primary ${
                  index === 1 ? "" : "button_left"
                }`}
                onClick={() => _pagination(index)}
              >
                {index}
              </button>
            );
          })}
      </div>
    </>
  );
}

export default AppComponent;
