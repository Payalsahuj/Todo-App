"use client";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useContext, useEffect } from "react";
import { todoContext } from "./HomePage";

export const Pagination = () => {
  const { currentPage, setCurrentPage, totalPages } = useContext(todoContext);

  return (
    <>
      <div className="pagination-controls">
        <button
          className="pagination-prev"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ArrowBackIosNewIcon /> Previous
        </button>
        <div className="pagination-pages">
          <span className="pagination-current">{currentPage}</span> /{" "}
          <span className="pagination-total">{totalPages}</span>
        </div>
        <button
          className="pagination-next"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next <ArrowForwardIosIcon />
        </button>
      </div>
    </>
  );
};
