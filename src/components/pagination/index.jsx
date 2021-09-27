import React, { useState, useEffect } from 'react';
import cns from 'classnames';
import cls from './pagination.module.scss';

const PageBox = ({ number = 'x', onClick, active }) => {
  return (
    <div
      aria-hidden="true"
      className={cns(cls.pageBox, { [cls.activeBox]: active }, 'mx-1')}
      onClick={onClick}
    >
      <span className={cns(cls.number)}>{number}</span>
    </div>
  );
};

const NavBox = ({ type, onClick, disable }) => {
  return (
    <div
      aria-hidden="true"
      className={cns(cls.navbox, 'mx-1', { [cls.disable]: disable })}
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
  nop,
  lowerLimit,
  upperLimit,
  itemsToShow,
  setLowerLimit,
  setupperLimit,
}) => {
  const [pageBoxes, setPageBoxes] = useState([]);

  const [currPage, setCurrPage] = useState(1);
  const nextPage = () => {
    if (currPage + 1 <= nop) {
      setCurrPage(currPage + 1);
      setLowerLimit(lowerLimit + itemsToShow);
      setupperLimit(upperLimit + itemsToShow);
    }
  };
  const prevPage = () => {
    if (currPage - 1 > 0) {
      setCurrPage(currPage - 1);
      setLowerLimit(lowerLimit - itemsToShow);
      setupperLimit(upperLimit - itemsToShow);
    }
  };

  const handlePageBoxClick = (n) => {
    setCurrPage(n);
    setLowerLimit(itemsToShow * (n - 1));
    setupperLimit(itemsToShow * n);
  };

  const constructPageBoxes = () => {
    const newPageBoxes = [];
    const btnCount = nop;
    for (let i = 0; i < btnCount; i += 1) {
      newPageBoxes.push(
        <PageBox
          active={currPage === i + 1}
          key={i}
          number={i + 1}
          onClick={() => {
            handlePageBoxClick(i + 1);
          }}
        />
      );
    }
    setPageBoxes(newPageBoxes);
  };

  useEffect(() => {
    constructPageBoxes();
  }, [nop, currPage]);

  return (
    nop && (
      <div className={cns(cls.pagination, 'py-5 d-flex flex-row')}>
        <NavBox type="prev" disable={currPage - 1 < 1} onClick={prevPage} />
        {pageBoxes}
        <NavBox type="next" disable={currPage + 1 > nop} onClick={nextPage} />
      </div>
    )
  );
};

export default Pagination;

export { PageBox, NavBox, Pagination };
