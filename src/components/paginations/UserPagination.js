import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../pagination.css";

const UsersPaginate = ({ page, pages }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          return (
            <LinkContainer key={x + 1} to={`/users/list/page/${x + 1}`}>
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

export default UsersPaginate;
