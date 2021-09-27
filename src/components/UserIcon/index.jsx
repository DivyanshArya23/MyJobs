import React from 'react';
import cls from './usericon.module.scss';

const UserIcon = ({ name }) => {
  return (
    <div className={cls.icon}>
      <span>{name?.slice(0, 1).toUpperCase()}</span>
    </div>
  );
};

export default UserIcon;
