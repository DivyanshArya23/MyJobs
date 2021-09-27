import React, { useState, useEffect } from 'react';
import cns from 'classnames';
import cls from './pagination.module.scss';

const PageBox = ({ number = 1 }) => {
  return (
    <div className={cns(cls.pageBox, 'mx-1')}>
      <span className={cns(cls.number)}>{number}</span>
    </div>
  );
};

const NavBox = ({ type, onClick }) => {
  return (
    <div
      aria-hidden="true"
      className={cns(cls.navbox, 'mx-1')}
      onClick={onClick}
    >
      {
        {
          prev: <i className="fa fa-angle-double-left" aria-hidden="true" />,
          next: <i className="fa fa-angle-double-right" aria-hidden="true" />,
        }[type]
      }
    </div>
  );
};

const Pagination = ({
  totalItemCount,
  itemPerPage,
  onPrevClick,
  onNextClick,
  maxPageBtn = 5,
}) => {
  const [nop, setnop] = useState(0);
  const [pageBoxes, setPageBoxes] = useState([]);

  const constructPageBoxes = () => {
    const newPageBoxes = [];
    const btnCount = Math.min(nop, maxPageBtn);
    for (let i = 0; i < btnCount; i += 1) {
      newPageBoxes.push(<PageBox number={i + 1} />);
    }
    setPageBoxes(newPageBoxes);
  };

  useEffect(() => {
    setnop(Math.ceil(totalItemCount / itemPerPage));
  }, []);

  useEffect(() => {
    constructPageBoxes();
  }, [nop]);

  return (
    <div className={cns(cls.pagination, 'py-5 d-flex flex-row')}>
      <NavBox type="prev" onClick={onPrevClick} />
      {pageBoxes}
      <NavBox type="next" onClick={onNextClick} />
    </div>
  );
};

export default Pagination;

export { PageBox, NavBox, Pagination };
