import React from 'react';
// import cns from 'classnames';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Router from 'next/router';
// import { useDispatch } from 'react-redux';
import UpperLayout from '../../components/UpperLayout';
import LowerLayout from '../../components/LowerLayout';
// import Input from '../../components/Input';
import classes from './dashboard.module.scss';
// import { ButtonLBlue } from '../../components/Button';
// import axios from '../../utils/axios/auth';
// import logger from '../../utils/logger';
// import * as actions from '../../redux/actions';
// import { REGEX } from '../../config/regex';
// import { API } from '../../config/apiurl';
// import { STORAGE_KEYS } from '../../config';

const Dashboard = () => {
  return (
    <div className={classes.main}>
      <UpperLayout className={classes.upperContainer} />
      <LowerLayout className={classes.lowerContainer} />
    </div>
  );
};

export default Dashboard;
