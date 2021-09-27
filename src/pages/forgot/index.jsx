import React, { useEffect } from 'react';
import cns from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';
import UpperLayout from '../../components/UpperLayout';
import LowerLayout from '../../components/LowerLayout';
import Input from '../../components/Input';
import classes from './forgot.module.scss';
import { ButtonLBlue } from '../../components/Button';
import axios from '../../utils/axios';
import logger from '../../utils/logger';
import { REGEX } from '../../config/regex';
import { API } from '../../config/apiurl';
import { TOAST_MSG } from '../../config';
import { checkUserLogin } from '../../utils/methods/login';

const Login = () => {
  const { addToast } = useToasts();
  useEffect(() => {
    checkUserLogin(false);
  }, []);

  const { touched, errors, handleSubmit, getFieldProps, setFieldError } =
    useFormik({
      initialValues: {
        email: '',
      },
      onSubmit: async (formValues) => {
        try {
          const res = await axios.get(
            `/${API.AUTH_RESET_PASSWORD}?email=${formValues.email}`
          );
          if (res.success) {
            addToast(TOAST_MSG.FORGOT_STEP_SENT, {
              appearance: 'success',
            });
            const resetToken = res?.data?.token;
            Router.push(`/resetpassword/${resetToken}`);
          }
        } catch (error) {
          logger.log('error:', error);
          setFieldError('email', error?.data?.message);
        }
      },
      validationSchema: yup.object().shape({
        email: yup
          .string()
          .required('Email is required')
          .matches(REGEX.EMAIL, 'Enter a valid Email ID'),
      }),
    });
  return (
    <div className={classes.main}>
      <UpperLayout className={classes.upperContainer} />
      <LowerLayout className={classes.lowerContainer} />
      <form onSubmit={handleSubmit} className={cns(classes.form, 'col-4 p-4')}>
        <div className="container">
          <div className={cns('row mb-0', classes.formHeader)}>
            <div className="col-12">Forgot Your Password ?</div>
            <div className={cns('col-12 py-3', classes.subtext)}>
              Enter the email associated with your account and we'll send you
              the instructions to reset your password.
            </div>
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
            <ButtonLBlue
              type="submit"
              onClick={handleSubmit}
              className="px-5 mx-auto"
            >
              Submit
            </ButtonLBlue>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
