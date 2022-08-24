import React from "react";
import s from "./Pagination.module.scss";

const Pagination = ({totalUsersCount,pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
        if (i === 25) break;
    }
    return (
        <div>
            {pages.map((p) => (
                <span
                    className={currentPage === p && s.selectedPage}
                    onClick={(e) => onPageChanged(p)}
                >
                    {p}
                </span>
            ))}
        </div>
    );
};

export default Pagination;
