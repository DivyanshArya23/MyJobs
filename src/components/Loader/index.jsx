import { useSelector } from 'react-redux';
import classes from './Loader.module.scss';

const Loader = () => {
  const loader = useSelector((state) => state.loader);
  return loader ? <div className={classes.loading}>Loading&#8230;</div> : <></>;
};

export default Loader;
