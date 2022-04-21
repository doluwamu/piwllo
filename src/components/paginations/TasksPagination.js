import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../pagination.css";

const TasksPaginate = ({
  pages,
  page,
  keyword = "",
  taskRank = "",
  isAdmin = false,
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          return (
            <LinkContainer
              key={x + 1}
              to={
                keyword
                  ? `/task/search/${keyword}/page/${x + 1}`
                  : taskRank
                  ? `/tasks/${taskRank}/page/${x + 1}`
                  : isAdmin
                  ? `/tasks-list/page/${x + 1}`
                  : `/page/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page} activeLabel={""}>
                {x + 1}
              </Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};

export default TasksPaginate;
