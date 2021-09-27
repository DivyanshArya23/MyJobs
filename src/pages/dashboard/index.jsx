import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import UpperLayout from '../../components/UpperLayout';
import LowerLayout from '../../components/LowerLayout';
import cls from './dashboard.module.scss';
import JobCard from '../../components/JobCard';
import { checkUserLogin } from '../../utils/methods/login';
import getPostedJobs from '../../utils/methods/getPostedJobs';
import { Pagination } from '../../components/pagination';

const Dashboard = () => {
  const [allJobsData, setallJobsData] = useState({});
  const [postedJobs, setPostedJobs] = useState([]);
  const [lowerLimit, setLowerLimit] = useState(0);
  const [jobsToShow] = useState(4);
  const [upperLimit, setupperLimit] = useState(lowerLimit + jobsToShow);
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

  return (
    <div className={cls.main}>
      <UpperLayout className={cls.upperContainer} />
      <LowerLayout className={cls.lowerContainer}>
        <div className="row">
          {postedJobs?.slice(lowerLimit, upperLimit).map((job) => {
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
          lowerLimit={lowerLimit}
          upperLimit={upperLimit}
          setLowerLimit={setLowerLimit}
          setupperLimit={setupperLimit}
          itemsToShow={jobsToShow}
          nop={Math.ceil(allJobsData?.metadata?.count / jobsToShow)}
        />
      </LowerLayout>
    </div>
  );
};
export const getStaticProps = () => ({ props: {} });
export default Dashboard;
