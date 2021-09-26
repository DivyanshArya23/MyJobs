import React, { useState } from 'react';
import cns from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import Router from 'next/router';
// import { useDispatch } from 'react-redux';
import UpperLayout from '../../components/UpperLayout';
import LowerLayout from '../../components/LowerLayout';
import Input from '../../components/Input';
import classes from './postjob.module.scss';
import { ButtonLBlue } from '../../components/Button';
import axios from '../../utils/axios/jobs';
import logger from '../../utils/logger';
// import * as actions from '../../redux/actions';
// import { REGEX } from '../../config/regex';
// import { API } from '../../config/apiurl';
// import { STORAGE_KEYS } from '../../config';
import { getToken } from '../../utils/methods/login';

const PostJob = () => {
  // const dispatch = useDispatch();
  const { touched, errors, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      title: '',
      description: '',
      location: '',
    },
    onSubmit: async (formValues) => {
      const postData = {
        title: formValues.title,
        description: formValues.description,
        location: formValues.location,
      };
      try {
        const res = await axios.post(``, postData, {
          // auth: { bearer: {} },
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        //   if (res.success) {
        //     const userData = res.data;
        //     sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        //     dispatch(actions.updateUser(userData));
        //     Router.push("/dashboard");
        //   }
        logger.log('posted::', res);
      } catch (error) {
        logger.log('error:', error);
      }
    },
    validationSchema: yup.object().shape({
      title: yup.string().required('Title is required'),
      description: yup.string().required('Description is required'),
      location: yup.string().required('Location is required'),
    }),
  });
  return (
    <div className={classes.main}>
      <UpperLayout className={classes.upperContainer} />
      <LowerLayout className={classes.lowerContainer} />
      <form onSubmit={handleSubmit} className={cns(classes.form, 'col-4 p-4')}>
        <div className="container">
          <div className={cns('row mb-0', classes.formHeader)}>
            <div className="col-12">Post a Job</div>
          </div>
          <div className={cns('row mb-0')}>
            <div className="col-12 mb-2">
              <label htmlFor="title" className={cns('formInputLabel')}>
                Job title*
              </label>
              <Input
                placeholder="Enter job title"
                error={touched?.title && errors?.title ? errors?.title : ''}
                {...getFieldProps('title')}
              />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="description" className={cns('formInputLabel')}>
                Description*
              </label>
              <Input
                className={classes.descInput}
                placeholder="Enter job description"
                error={
                  touched?.description && errors?.description
                    ? errors?.description
                    : ''
                }
                {...getFieldProps('description')}
              />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="location" className={cns('formInputLabel')}>
                Location*
              </label>
              <Input
                placeholder="Enter Location"
                error={
                  touched?.location && errors?.location ? errors?.location : ''
                }
                {...getFieldProps('location')}
              />
            </div>
          </div>
          <div className={cns('row mt-3 mb-1')}>
            <ButtonLBlue
              type="submit"
              onClick={handleSubmit}
              className="px-5 mx-auto"
            >
              Post
            </ButtonLBlue>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
