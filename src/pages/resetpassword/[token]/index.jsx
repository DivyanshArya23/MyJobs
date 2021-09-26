import React from 'react';
import cns from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Router from 'next/router';
// import { useDispatch } from 'react-redux';
import UpperLayout from '../../../components/UpperLayout';
import LowerLayout from '../../../components/LowerLayout';
import Input from '../../../components/Input';
import classes from './reset.module.scss';
import { ButtonLBlue } from '../../../components/Button';
import axios from '../../../utils/axios/auth';
import logger from '../../../utils/logger';
// import * as actions from '../../../redux/actions';
// import { REGEX } from '../../../config/regex';
import { API } from '../../../config/apiurl';

const ResetPassword = ({ query: { token } }) => {
  // const dispatch = useDispatch();
  const { touched, errors, handleSubmit, getFieldProps, setFieldError } =
    useFormik({
      initialValues: {
        password1: '',
        password2: '',
      },
      onSubmit: async (formValues) => {
        const postData = {
          password: formValues.password1,
          confirmPassword: formValues.password2,
          token,
        };
        try {
          const res = await axios.post(`/${API.RESET_PASSWORD}`, postData);
          if (res.success) {
            Router.push('/login');
          }
        } catch (error) {
          logger.log('error:', error);
          setFieldError('password2', error?.data?.message);
        }
      },
      validationSchema: yup.object().shape({
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
    <div className={classes.main}>
      <UpperLayout className={classes.upperContainer} />
      <LowerLayout className={classes.lowerContainer} />
      <form onSubmit={handleSubmit} className={cns(classes.form, 'col-4 p-4')}>
        <div className="container">
          <div className={cns('row mb-0', classes.formHeader)}>
            <div className="col-12">Forgot Your Password ?</div>
            <div className={cns('col-12 py-3', classes.subtext)}>
              Enter your new password below.
            </div>
          </div>
          <div className={cns('row mb-4')}>
            <div className="col-12">
              <label htmlFor="password1" className={cns('formInputLabel')}>
                New Password
              </label>
              <Input
                placeholder="Enter your Email"
                error={
                  touched?.password1 && errors?.password1
                    ? errors?.password1
                    : ''
                }
                {...getFieldProps('password1')}
              />
            </div>
            <div className="col-12">
              <label htmlFor="password2" className={cns('formInputLabel')}>
                Confirm New Password
              </label>
              <Input
                placeholder="Enter your Email"
                error={
                  touched?.password2 && errors?.password2
                    ? errors?.password2
                    : ''
                }
                {...getFieldProps('password2')}
              />
            </div>
          </div>
          <div className={cns('row mb-2')}>
            <ButtonLBlue
              type="submit"
              onClick={handleSubmit}
              className="px-5 mx-auto"
            >
              Reset
            </ButtonLBlue>
          </div>
        </div>
      </form>
    </div>
  );
};
export const getServerSideProps = ({ query }) => ({
  props: { query },
});
export default ResetPassword;
