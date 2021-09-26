import React from 'react';
import cns from 'classnames';
import classes from './card.module.scss';

const Card = ({ data }) => {
  return (
    <div
      className={cns(
        'd-flex flex-row mt-2 justify-content-between',
        classes.cards
      )}
    >
      {data?.map(({ title, description }) => (
        <div className={cns('p-3', classes.colCard)}>
          <div className={cns('', classes.title)}>{title}</div>
          <div className={cns('py-2', classes.description)}>{description}</div>
        </div>
      ))}
    </div>
  );
};
export default Card;
