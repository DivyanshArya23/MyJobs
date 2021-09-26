import React from 'react';
import cns from 'classnames';
import UpperLayout from '../components/UpperLayout';
import LowerLayout from '../components/LowerLayout';
import Card from '../components/Card';
import classes from './home.module.scss';
import { HOME_CARDS_DATA, TrustCompanies } from '../config';
import { ButtonLBlue } from '../components/Button';

const Home = () => {
  return (
    <div>
      <UpperLayout className={classes.upperContainer}>
        <div
          className={cns('container d-flex flex-row px-5', classes.container)}
        >
          <div className={cns('my-auto col-5 ', classes.heading)}>
            Welcome to
            <br />
            My
            <span className="text-blue">Jobs</span>
            <br />
            <ButtonLBlue>Get Started</ButtonLBlue>
          </div>
          <div className={cns('my-auto col-7 ', classes.imgContainer)} />
        </div>
      </UpperLayout>
      <LowerLayout>
        <div className={cns('container px-5 py-5', classes.lowerContainer)}>
          <div className={cns('heading2 my-4')}>Why Us</div>
          <Card data={HOME_CARDS_DATA} />
          <div className={cns('heading2 pt-5')}>Companies Who Trust Us</div>

          <div className="d-flex flex-row justify-content-between">
            {TrustCompanies[0].map((src) => (
              <div className={classes.logoImgDiv1}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
          <div className="d-flex flex-row mt-2 justify-content-around">
            {TrustCompanies[1].map((src) => (
              <div className={classes.logoImgDiv1}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>
      </LowerLayout>
    </div>
  );
};

export default Home;
