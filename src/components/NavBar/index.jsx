import React from 'react';
import cns from 'classnames';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import classes from './navbar.module.scss';
import { ButtonBlue } from '../Button';

const Navbar = () => {
  const { asPath } = useRouter();
  const user = useSelector((state) => state.user);
  const { userRole } = user;
  return (
    <div className={cns('container-fluid d-flex flex-row', classes.wrapper)}>
      <div className={classes.logoImgDiv}>
        <img src="/images/logo.png" alt="" />
      </div>
      {
        {
          '/': (
            <div
              className={cns(
                'd-flex justify-content-end w-100',
                classes.navRow
              )}
            >
              <ButtonBlue
                onClick={() => {
                  Router.push('/login');
                }}
              >
                Login/Signup
              </ButtonBlue>
            </div>
          ),
          '/dashboard': userRole === 1 && (
            <div
              aria-hidden="true"
              className={cns(
                'd-flex justify-content-end w-100',
                classes.navRow
              )}
              onClick={() => {
                Router.push('/postjob');
              }}
            >
              <div className={cns(classes.navItem)}>Post a Job</div>
            </div>
          ),
        }[asPath]
      }
    </div>
  );
};

export default Navbar;
