import React, { useEffect } from 'react';
import cns from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Router from 'next/router';
import UpperLayout from '../../components/UpperLayout';
import LowerLayout from '../../components/LowerLayout';
import Input from '../../components/Input';
import classes from './signup.module.scss';
import { ButtonLBlue, IconLBBtn } from '../../components/Button';
import axios from '../../utils/axios';
import logger from '../../utils/logger';
import { REGEX } from '../../config/regex';
import { API } from '../../config/apiurl';
import { checkUserLogin } from '../../utils/methods/login';

const Signup = () => {
  useEffect(() => {
    checkUserLogin(false);
  }, []);
  const {
    touched,
    errors,
    handleSubmit,
    values,
    setFieldValue,
    getFieldProps,
  } = useFormik({
    initialValues: {
      userRole: '',
      fullname: '',
      email: '',
      password1: '',
      password2: '',
      skills: '',
    },
    onSubmit: async (formValues) => {
      const postData = {
        email: formValues.email,
        userRole: formValues.userRole,
        password: formValues.password1,
        confirmPassword: formValues.password2,
        name: formValues.fullname,
        skills: formValues.skills,
      };
      try {
        const res = await axios.post(`/${API.AUTH_REGISTER}`, postData);
        if (res.success) {
          Router.push('/login');
        }
      } catch (error) {
        logger.log('error:', error);
      }
    },
    validationSchema: yup.object().shape({
      userRole: yup.number().required('Select a type'),
      fullname: yup
        .string()
        .required('Fullname is required')
        .matches(REGEX.SINGLENAME, 'Enter Full Name'),
      email: yup
        .string()
        .required('Email is required')
        .matches(REGEX.EMAIL, 'Enter a valid Email ID'),
      password1: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must contain atleast 6 characters'),
      password2: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must contain atleast 6 characters')
        // eslint-disable-next-line func-names
        .test('password2', 'Passwords do not match!', function (value) {
          // eslint-disable-next-line react/no-this-in-sfc
          const pass1 = this.parent.password1;
          return pass1 === value;
        }),
    }),
  });
  return (
    <div className={cns(classes.main)}>
      <UpperLayout className={classes.upperContainer} />
      <LowerLayout className={classes.lowerContainer} />
      <form onSubmit={handleSubmit} className={cns(classes.form, 'col-4 p-4')}>
        <div className="container">
          <div className={cns('row mb-0', classes.formHeader)}>
            <div className="col-12">Signup</div>
          </div>
          <div className={cns('row mt-3 mb-1')}>
            <div className="col-12">
              <label htmlFor="userRole" className={cns('formInputLabel')}>
                I am a*
              </label>
            </div>
            <div className="col-12">
              <IconLBBtn
                className="mr-1"
                src="/images/group.png"
                active={values?.userRole === 0}
                onClick={() => {
                  setFieldValue('userRole', 0);
                }}
                {...getFieldProps('userRole')}
              >
                Recruiter
              </IconLBBtn>
              <IconLBBtn
                src="/images/group.png"
                active={values?.userRole === 1}
                onClick={() => {
                  setFieldValue('userRole', 1);
                }}
                {...getFieldProps('userRole')}
              >
                Candidate
              </IconLBBtn>
              {errors?.userRole && (
                <div className="pt-1 text-left formError">
                  <span className="text-danger">{errors?.userRole}</span>
                </div>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="fullname" className={cns('formInputLabel')}>
                Full Name*
              </label>
              <Input
                placeholder="Enter your full name"
                error={
                  touched?.fullname && errors?.fullname ? errors?.fullname : ''
                }
                {...getFieldProps('fullname')}
              />
            </div>
          </div>
          <div className={cns('row mb-1')}>
            <div className="col-12">
              <label htmlFor="email" className={cns('formInputLabel')}>
                Email Address*
              </label>
              <Input
                placeholder="Enter your Email"
                error={touched?.email && errors?.email ? errors?.email : ''}
                {...getFieldProps('email')}
              />
            </div>
          </div>
          <div className={cns('row mb-1')}>
            <div className="col-12 col-md-6">
              <label htmlFor="password1" className={cns('formInputLabel')}>
                Create Password*
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                error={
                  touched?.password1 && errors?.password1
                    ? errors?.password1
                    : ''
                }
                {...getFieldProps('password1')}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="password2" className={cns('formInputLabel')}>
                Confirm Password*
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                error={
                  touched?.password2 && errors?.password2
                    ? errors?.password2
                    : ''
                }
                {...getFieldProps('password2')}
              />
            </div>
          </div>
          <div className={cns('row mb-5')}>
            <div className="col-12">
              <label htmlFor="skills" className={cns('formInputLabel')}>
                Skills
              </label>
              <Input
                placeholder="Enter comma seperated skills"
                error={touched?.skills && errors?.skills ? errors?.skills : ''}
                {...getFieldProps('skills')}
              />
            </div>
          </div>
          <div className={cns('row mb-5')}>
            <ButtonLBlue
              type="submit"
              onClick={handleSubmit}
              className="px-5 mx-auto"
            >
              Signup
            </ButtonLBlue>
          </div>

          <div
            className={cns(
              'row mt-1 mb-3 justify-content-center',
              classes.newUserText
            )}
          >
            Have an account?&nbsp;
            <span
              aria-hidden="true"
              className="text-blue pointer"
              onClick={() => {
                Router.push('/login');
              }}
            >
              Login
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
export const getStaticProps = () => ({ props: {} });
export default Signup;
