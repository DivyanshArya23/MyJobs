import React, { useState } from 'react';
import cns from 'classnames';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import classes from './navbar.module.scss';
import { ButtonBlue } from '../Button';
import UserIcon from '../UserIcon';
import { handleLogout } from '../../utils/methods/login';

const Navbar = () => {
  const { asPath } = useRouter();
  const user = useSelector((state) => state.user);
  const { userRole } = user;
  return (
    <div className={cns('container-fluid d-flex flex-row', classes.wrapper)}>
      <div className={classes.logoImgDiv}>
        <img src="/images/logo.png" alt="" />
      </div>
      <div className="d-flex flex-row">
        {
          {
            '/': !user.token && (
              <div
                className={cns(
                  'd-flex justify-content-end w-100 mr-1',
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
            '/dashboard': userRole === 0 && (
              <div
                aria-hidden="true"
                className={cns(
                  'd-flex flex-row justify-content-end mr-2',
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
        {user.token && <Logout user={user} />}
      </div>
    </div>
  );
};

const Logout = ({ user }) => {
  const [showdropdown, setShowdropdown] = useState(false);
  const toggleDropDown = () => {
    setShowdropdown(!showdropdown);
  };
  const caretClick = () => {
    toggleDropDown();
  };

  return (
    <span className={classes.outerLogout}>
      <div
        className={cns('d-flex flex-row justify-content-end', classes.logout)}
      >
        <UserIcon name={user.name} />
        <i
          className={cns('fa fa-caret-down', classes.caret)}
          onClick={caretClick}
          aria-hidden="true"
        />
      </div>
      {showdropdown && (
        <div
          aria-hidden="true"
          className={cns(classes.dropdown, classes.f14, 'px-4')}
          onClick={handleLogout}
        >
          Logout
        </div>
      )}
    </span>
  );
};
export default Navbar;
