import React from 'react';
import cns from 'classnames';
import classes from './layout.module.scss';
import NavBar from '../NavBar';

const Layout = ({ children, className }) => {
  return (
    <div className={cns('container-fluid', classes.wrapper, className)}>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
