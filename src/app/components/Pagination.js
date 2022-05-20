import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationReact from "react-js-pagination";

function Pagination() {
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();

  const _totalPages = () => {
    for (let i = 0; reduxData.userData?.total_pages; i++) {
      <p>{i}</p>;
    }
  };

  return <div>{_totalPages()}</div>;
}

export default Pagination;
