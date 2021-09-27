/* eslint-disable react/button-has-type */
import React from 'react';
import cns from 'classnames';
import classes from './button.module.scss';

const ButtonBlue = ({
  className,
  onBlur,
  type,
  onClick,
  name,
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      name={name}
      onBlur={onBlur}
      disabled={disabled}
      className={cns(className, classes.btn1)}
    >
      {children}
    </button>
  );
};

const ButtonLBlue = ({
  className,
  onBlur,
  type,
  onClick,
  name,
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      name={name}
      onBlur={onBlur}
      disabled={disabled}
      className={cns(className, classes.btn2)}
    >
      {children}
    </button>
  );
};

const IconLBBtn = ({
  className,
  onBlur,
  type,
  onClick,
  name,
  disabled = false,
  children,
  src,
  active,
}) => {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      name={name}
      onBlur={onBlur}
      disabled={disabled}
      className={cns(className, classes.btn3, { [classes.btn3Active]: active })}
    >
      <img src={src} className={cns(classes.btnIcon, 'mr-1')} alt="btn" />
      {children}
    </button>
  );
};

const ButtonBlue2 = ({
  className,
  onBlur,
  type,
  onClick,
  name,
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      name={name}
      onBlur={onBlur}
      disabled={disabled}
      className={cns(className, classes.btn4)}
    >
      {children}
    </button>
  );
};

export { ButtonBlue, ButtonLBlue, IconLBBtn, ButtonBlue2 };
