import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={({ selected }) => onPageChange(selected)}
      containerClassName={styles.pagination}
      activeClassName={styles.activePage}
      previousLinkClassName={styles.pageButton}
      nextLinkClassName={styles.pageButton}
      pageLinkClassName={styles.pageButton}
      disabledClassName={styles.disabled}
    />
  );
};

export default Pagination;
