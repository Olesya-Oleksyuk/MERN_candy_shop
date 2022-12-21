import React from 'react';
import { useHistory } from 'react-router-dom';

import femaleFaceImg from '../../assets/cartoon-female-face.png';
import CandyShopLargeLogo from '../../svg/candyShopLargeLogo';

import './style.scss';

const StartScreen = () => {
  const history = useHistory();

  return (
    <div className="no-scroll-wrapper">
      <div className="start-page">
        <div className="content">
          <div className="content__large-logo"><CandyShopLargeLogo /></div>
          <div className="content__moto">сладко и ярко</div>
          <div className="content__text">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor!
            {' '}
          </div>
          <div className="content__row">
            <button className="content__button regular-button" onClick={() => history.push('/home')}>каталог</button>
            <button className="content__button regular-button" onClick={() => history.push('/login')}>заказать</button>
          </div>
        </div>
        <div className="logo">
          <div className="logo__wrapper">
            <img className="logo__pic" src={femaleFaceImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
