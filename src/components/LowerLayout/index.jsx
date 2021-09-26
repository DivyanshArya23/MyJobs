import React from 'react';
import cns from 'classnames';
import classes from './layout.module.scss';

const Layout = ({ children, className }) => {
  return (
    <div className={cns('container-fluid', classes.wrapper, className)}>
      {children}
    </div>
  );
};

export default Layout;
