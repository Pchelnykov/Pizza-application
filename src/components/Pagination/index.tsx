import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationParams = {
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationParams> = ({ onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel='...'
        nextLabel=' >'
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel='<'
      />
    </div>
  );
};

export default Pagination;
