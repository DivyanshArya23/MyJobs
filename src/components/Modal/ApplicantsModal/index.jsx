import React from 'react';
import cns from 'classnames';
import cls from './applicants.module.scss';
import AplCard from '../../ApplicantCard';

const AplModal = ({ isOpen, data, toggle }) => {
  return (
    <div className={cns(cls.backdrop, isOpen ? 'd-block' : 'd-none')}>
      <div className={cns(cls.modal, 'p-4')}>
        <div className={cns('d-flex flex-row pb-3', cls.header)}>
          <div className="d-flex flex-column">Applicants for this Job</div>
          <div className="d-flex flex-column justify-content-center">
            <i
              className="fa fa-times pointer"
              aria-hidden="true"
              onClick={toggle}
            />
          </div>
        </div>
        <div className={cns(cls.subHeading, 'py-2')}>
          Total {data?.length || 0} Applications
        </div>
        <div className={cns(cls.dataView, 'row')}>
          {data?.map((candidate) => {
            return <AplCard data={candidate} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AplModal;
