import React, { memo } from "react";
import { Button } from "react-bootstrap";

const LoadMore = ({ currentPage, totalItem, perPage, currentPageAction }) => {
  return (
    <>
      {currentPage < parseInt(totalItem / perPage) + 1 && (
        <Button
          size="sm"
          className="mt-2 load-more-btn"
          onClick={() => currentPageAction(currentPage + 1)}
        >
          Load More
        </Button>
      )}
    </>
  );
};
export default memo(LoadMore);
