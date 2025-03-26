"use client";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useContext } from "react";
import { todoContext } from "../page";

export const Pagination = () => {
  const { currentPage, setCurrentPage } = useContext(todoContext);
  return (
    <>
      <div className="pagination-controls">
        <button
          className="pagination-prev"
          //   disabled={pagination.currentPage === 1}
          //   onClick={() => setCurrentPage(pagination.currentPage - 1)}
        >
          <ArrowBackIosNewIcon /> Previous
        </button>
        <div className="pagination-pages">
          <span className="pagination-current">{currentPage + ""}</span> /{" "}
          <span className="pagination-total">{10}</span>
        </div>
        <button
          className="pagination-next"
          //   disabled={pagination.currentPage === totalPages}
          //   onClick={() => setCurrentPage(pagination.currentPage + 1)}
        >
          Next <ArrowForwardIosIcon />
        </button>
      </div>
    </>
  );
};
