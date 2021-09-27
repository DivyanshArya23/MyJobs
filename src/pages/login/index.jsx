import React, { useEffect } from 'react';
import cns from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import UpperLayout from '../../components/UpperLayout';
import LowerLayout from '../../components/LowerLayout';
import Input from '../../components/Input';
import classes from './login.module.scss';
import { ButtonLBlue } from '../../components/Button';
import axios from '../../utils/axios';
import * as actions from '../../redux/actions';
import { REGEX } from '../../config/regex';
import { API } from '../../config/apiurl';
import { STORAGE_KEYS, TOAST_MSG } from '../../config';
import { checkUserLogin } from '../../utils/methods/login';

const Login = () => {
  const { addToast } = useToasts();
  useEffect(() => {
    checkUserLogin(false);
  }, []);
  const dispatch = useDispatch();
  const { touched, errors, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (formValues) => {
      const postData = {
        email: formValues.email,
        password: formValues.password,
      };
      axios
        .post(`/${API.AUTH_LOGIN}`, postData)
        .then((res) => {
          addToast(TOAST_MSG.LOGIN_SUCCESS, {
            appearance: 'success',
          });
          const userData = res.data;
          sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
          dispatch(actions.updateUser(userData));
          Router.push('/dashboard');
        })
        .catch((err) => {
          addToast(err?.data?.message, {
            appearance: 'error',
          });
        });
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required('Email is required')
        .matches(REGEX.EMAIL, 'Enter a valid Email ID'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must contain atleast 6 characters'),
    }),
  });
  return (
    <div className={classes.main}>
      <UpperLayout className={classes.upperContainer} />
      <LowerLayout className={classes.lowerContainer} />
      <form onSubmit={handleSubmit} className={cns(classes.form, 'col-4 p-4')}>
        <div className="container">
          <div className={cns('row mb-0', classes.formHeader)}>
            <div className="col-12">Login</div>
          </div>
          <div className={cns('row mb-4')}>
            <div className="col-12">
              <label htmlFor="email" className={cns('formInputLabel')}>
                Email Address
              </label>
              <Input
                placeholder="Enter your Email"
                error={touched?.email && errors?.email ? errors?.email : ''}
                {...getFieldProps('email')}
              />
            </div>
          </div>
          <div className={cns('row mb-2')}>
            <div className="col-12">
              <label htmlFor="password" className={cns('formInputLabel')}>
                Password
              </label>
              <div
                aria-hidden="true"
                className="d-inline-block float-right text-blue formInputLabel pointer"
                onClick={() => {
                  Router.push('/forgot');
                }}
              >
                Forgot your Password ?
              </div>
              <Input
                type="password"
                placeholder="Enter your password"
                error={
                  touched?.password && errors?.password ? errors?.password : ''
                }
                {...getFieldProps('password')}
              />
            </div>
          </div>
          <div className={cns('row mb-5')}>
            <ButtonLBlue
              type="submit"
              onClick={handleSubmit}
              className="px-5 mx-auto"
            >
              Login
            </ButtonLBlue>
          </div>

          <div
            className={cns(
              'row mt-1 mb-3 justify-content-center',
              classes.newUserText
            )}
          >
            New to MyJobs?&nbsp;
            <span
              aria-hidden="true"
              className="text-blue pointer"
              onClick={() => {
                Router.push('/signup');
              }}
            >
              Create an account
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
export const getStaticProps = () => ({ props: {} });
export default Login;
