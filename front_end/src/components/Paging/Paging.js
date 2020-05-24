import React from 'react';
import {PaginationItem, PaginationLink} from "reactstrap";

const Paging = ({pageIdx, total, setPage}) => {
  if (total > 0) {
    return (
        <Paging aria-label="Page navigation example">
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
        </Paging>
    )
  } else {
    return ""
  }
}

export default Paging;