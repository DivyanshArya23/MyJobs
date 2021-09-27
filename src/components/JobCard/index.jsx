import React, { useState } from 'react';
import cns from 'classnames';
import { useToasts } from 'react-toast-notifications';
import cls from './jobcard.module.scss';
import { ButtonBlue2 } from '../Button';
import AplModal from '../Modal/ApplicantsModal';
import getJobApplicants from '../../utils/methods/getJobApplicants';

const JobCard = ({ id, title, description, location }) => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const { addToast } = useToasts();

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleViewApl = async () => {
    try {
      const applicantsData = await getJobApplicants(id);
      setModalData(applicantsData);
      setModal(true);
    } catch (error) {
      addToast(error, { appearance: 'error' });
      setModal(false);
      setModalData([]);
    }
  };
  return (
    <>
      <div key={id} className={cns('col-12 col-md-3 p-3', cls.card)}>
        <div className={cns(cls.main)}>
          <div className={cns(cls.title, 'col-12 pt-3 pb-2')}>{title}</div>
          <div className={cns(cls.description, 'col-12')}>{description}</div>
          <div
            className={cns(
              'd-flex flex-row justify-content-between pt-2 pb-2',
              cls.btmRow
            )}
          >
            <div
              className={cns(
                cls.location,
                'd-flex flex-row py-2 ml-3 align-items-center'
              )}
            >
              <i className="fa fa-map-marker themed" aria-hidden="true" />
              <div className="d-inline-block ml-2">{location}</div>
            </div>
            <div className={cns(cls.viewApl, 'd-flex flex-row py-2 px-0')}>
              <ButtonBlue2 className="py-2 mr-2 px-3" onClick={handleViewApl}>
                View Applications
              </ButtonBlue2>
            </div>
          </div>
        </div>
      </div>
      <AplModal isOpen={modal} data={modalData} toggle={toggleModal} />
    </>
  );
};

export default JobCard;
