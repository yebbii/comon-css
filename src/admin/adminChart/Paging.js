import React from "react";
import '../adminChart/paging.css';
import Pagination from "react-js-pagination";
import { HiOutlineChevronLeft, HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { HiOutlineChevronRight, HiOutlineChevronDoubleRight } from "react-icons/hi";

const Paging = ({ page, count, setPage }) => {

    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={(<HiOutlineChevronLeft className="single-Icon" />)}
            nextPageText={(<HiOutlineChevronRight className="single-Icon" />)}
            firstPageText={(<HiOutlineChevronDoubleLeft className="double-Icon" />)}
            lastPageText={(<HiOutlineChevronDoubleRight className="double-Icon" />)}
            onChange={setPage}
        />
    );
};

export default Paging;