import React from 'react'
import './paginate.scss'
import ReactPaginate from 'react-paginate'

export default function Paginate({total, limit, setPage}) {
    const handleChange = (click) =>{
        setPage(click.selected+1)
    }
  return (
        <div className="pagination-wrapper">
            <ReactPaginate
            previousLabel=''
            nextLabel=''
            breakLabel='...'
            pageCount={Math.ceil(total/limit)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(e)=>{setPage(e.selected + 1);window.scrollTo({top: 0, behavior:'smooth'})}}
            containerClassName={'pagination'}
            pageClassName={'__page'}
            nextClassName={'__next'}
            previousClassName={'__previous'}
            breakClassName={'__break'}
            activeClassName={'active'}
        />
        </div>
  )
}
