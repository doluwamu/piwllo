import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const TasksPaginate = ({ pages, page, keyword = "", taskRank = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          console.log(x);
          return (
            <Link
              key={x + 1}
              to={
                keyword
                  ? `/tasks/search/${keyword}/page/${x + 1}`
                  : taskRank
                  ? `/tasks/${taskRank}/${x + 1}`
                  : `/page/${x + 1}`
              }
            >
              <div>{x + 1}</div>
            </Link>
          );
        })}
      </Pagination>
    )
  );
};

export default TasksPaginate;
