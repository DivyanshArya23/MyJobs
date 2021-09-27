import React, { useState, useEffect } from 'react';
// import cns from 'classnames';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Router from 'next/router';
// import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import UpperLayout from '../../components/UpperLayout';
import LowerLayout from '../../components/LowerLayout';
// import Input from '../../components/Input';
import cls from './dashboard.module.scss';
import JobCard from '../../components/JobCard';
// import { ButtonLBlue } from '../../components/Button';
import axios from '../../utils/axios';
import { API } from '../../config/apiurl';
import { checkUserLogin, getToken } from '../../utils/methods/login';
import getPostedJobs from '../../utils/methods/getPostedJobs';
import { Pagination } from '../../components/pagination';
// import logger from '../../utils/logger';
// import * as actions from '../../redux/actions';
// import { REGEX } from '../../config/regex';
// import { API } from '../../config/apiurl';
// import { STORAGE_KEYS } from '../../config';

const Dashboard = () => {
  const [allJobsData, setallJobsData] = useState({});
  const [postedJobs, setPostedJobs] = useState([]);
  const [lowerLimit, setLowerLimit] = useState(0);
  const [jobsToShow, setJobsToShow] = useState(4);
  const { addToast } = useToasts();

  useEffect(async () => {
    try {
      const res = await getPostedJobs();
      setallJobsData(res);
      setPostedJobs(res?.data);
    } catch (error) {
      addToast(error, {
        appearance: 'error',
      });
    }
    checkUserLogin();
  }, []);

  const nextPage = () => {
    setLowerLimit(lowerLimit + jobsToShow);
  };
  const prevPage = () => {
    setLowerLimit(lowerLimit - jobsToShow);
  };

  return (
    <div className={cls.main}>
      <UpperLayout className={cls.upperContainer} />
      <LowerLayout className={cls.lowerContainer}>
        <div className="row">
          {postedJobs?.slice(lowerLimit, jobsToShow).map((job) => {
            return (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                description={job.description}
                location={job.location}
              />
            );
          })}
        </div>

        <Pagination
          totalItemCount={allJobsData?.metadata?.count}
          itemPerPage={jobsToShow}
          onNextClick={nextPage}
          onPrevClick={prevPage}
        />
      </LowerLayout>
    </div>
  );
};

export default Dashboard;
