import React from 'react';
import cns from 'classnames';
import cls from './aplcard.module.scss';
import UserIcon from '../UserIcon';

const AplCard = ({ data: { email, name, skills } }) => {
  return (
    <div className="p-2 col-12 col-md-6">
      <div className={cns(cls.card, 'p-2')}>
        <div className="d-flex d-flex-row pb-3">
          <div className={cns('d-flex flex-column mr-2', cls.f15)}>
            <UserIcon name={name} />
          </div>
          <div className={cns('d-flex flex-column', cls.f15)}>
            <div className={cns('d-flex d-flex-row', cls.f15)}>{name}</div>
            <div className={cns('d-flex d-flex-row', cls.f15)}>{email}</div>
          </div>
        </div>
        <div className={cns('d-flex d-flex-row', cls.f13)}>Skills</div>
        <div className={cns('d-flex d-flex-row', cls.f15)}>{skills}</div>
      </div>
    </div>
  );
};

export default AplCard;
