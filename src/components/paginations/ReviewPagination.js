import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../pagination.css";

const ReviewsPaginate = ({ page, pages }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          return (
            <LinkContainer key={x + 1} to={`/reviews/page/${x + 1}`}>
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

export default ReviewsPaginate;
