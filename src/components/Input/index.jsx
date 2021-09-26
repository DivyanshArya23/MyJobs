import React from 'react';
import cns from 'classnames';
import cls from './input.module.scss';

const Input = ({
  className,
  onBlur,
  type,
  onChange,
  name,
  placeholder,
  value,
  error,
  errorClass,
  ...restProps
}) => (
  <>
    <input
      className={cns(cls.input, className, { [cls.errorclass]: error })}
      type={type || 'text'}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      onBlur={onBlur}
      value={value}
      {...restProps}
    />
    {error && (
      <div className={errorClass || 'pt-1 formError'}>
        <span className="text-danger">{error || ''}</span>
      </div>
    )}
  </>
);

export default Input;
