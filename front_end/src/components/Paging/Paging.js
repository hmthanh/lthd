import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

const Paging = ({pageIdx, total, setPage}) => {
  console.log("paging", pageIdx, total, setPage);
  console.log("total > 0", total > 0)
  if (total > 0) {
    return (
        <Pagination>
          <PaginationItem>
            <PaginationLink first onClick={() => setPage(0)} href="#"/>
          </PaginationItem>
          {
            Array.apply(null, Array(total)).map((i, index) => {
              if (index === pageIdx) {
                return (<PaginationItem active key={index}>
                      <PaginationLink onClick={() => setPage(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                )
              } else {
                return (<PaginationItem key={index}>
                      <PaginationLink onClick={() => setPage(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                )
              }
            })
          }
          <PaginationItem>
            <PaginationLink last onClick={() => setPage(total - 1)} href="#"/>
          </PaginationItem>
        </Pagination>
    )
  } else {
    return ""
  }
}

export default Paging;