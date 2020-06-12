import React from 'react';
import { Link } from 'react-router-dom';

import { clamp } from '../helpers';

function Pagination({pageCount, currentPage}) {
  return (
    <div className='pagination-lg-component'>
      <ul className='pagination pagination-lg'>
        <li className='page-item'>
          <Link className='page-link' to={`/${clamp(currentPage - 1)}`}>
            <i className='fa fa-angle-left'/>
            <span className='sr-only'>Previous</span>
          </Link>
        </li>
        {Array(pageCount).fill(null).map((_, index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
            <Link
              className='page-link'
              to={`/${index + 1}`}
              >{index + 1}</Link>
          </li>
        ))}
        <li className='page-item'>
          <Link className='page-link' to={`/${clamp(currentPage + 1, pageCount)}`}>
            <i className='fa fa-angle-right'/>
            <span className='sr-only'>Previous</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

Pagination.defaultProps = {
  pageCount: 1,
  currentPage: 1
};

export default Pagination;
