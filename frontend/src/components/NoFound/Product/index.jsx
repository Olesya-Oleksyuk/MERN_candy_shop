import React, { useState } from 'react';
import NoProduct from '../../../svg/noProduct';
import useBreakpoints from '../../../hooks/useBreakpoints';

const NoFoundProduct = () => {
  const [isHover, setIsHover] = useState(false);

  const viewport = useBreakpoints(window);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const logoStyle = {
    height: '200',
    width: '200',
    mainColor: isHover ? '#f57a00' : '#f5e625',
    strokeColor: isHover ? '#333333' : '#ced4da',
  };

  return (
    <>
      <div className="no-found__central-container">
        <div
          className="no-found-logo"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NoProduct logoStyle={logoStyle} />
        </div>
        <p className="no-found-header">Упс! Товар не найден... </p>
      </div>
      <p className="no-found__text">
        Нам жаль, что
        {' '}
        {viewport !== 'xs' && <br />}
        мы не смогли найти товары по вашему запросу
      </p>

    </>
  );
};

export default NoFoundProduct;
