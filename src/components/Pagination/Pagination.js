import { useState, useEffect } from "react";
import './Pagination.css';

export default function Pagination({totalPages, handleCurrentPage}) {
    const [active, setActive] = useState(0);
    const allPages = [...Array(totalPages).keys()];

    useEffect(() => {
      setActive(1);
    }, [])

    useEffect(() => {
        if(active > totalPages) {
            setActive(totalPages);
        }
    }, [totalPages])


    const clickHandler = (curPage) => {
        curPage = curPage > totalPages ? totalPages : curPage;
        setActive(curPage);
        handleCurrentPage(curPage);
    }

    return (
      <div className="pagination-wrapper">
        {allPages.map((curPage) => {
            curPage = curPage+1;
          return (
            <button
              key={curPage}
              className={curPage === active ? "active-cur-page" : ""}
              onClick={() => clickHandler(curPage)}
            >
              {curPage}
            </button>
          );
        })}
      </div>
    );
}
