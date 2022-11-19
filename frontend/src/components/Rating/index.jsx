import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { COLOR, RATING_TYPE, STAR_TYPE } from './constants';

const Rating = ({
  ratingValue, reviewsNumber, starColor, ratingType,
}) => {
  const getStar = (starIndex, key) => {
    const { FULL, HALF, EMPTY } = STAR_TYPE;

    const starType = (index) => {
      if (ratingValue >= index) return FULL;
      if (ratingValue >= index - 0.5) return HALF;
      return EMPTY;
    };
    return (<i className={starType(starIndex)} style={{ color: starColor }} key={key} />);
  };

  const getRatingScale = (type) => [...Array(type)].map((_, i) => getStar(i + 1, i));

  return (
    <div className="rating">
      <span>
        { getRatingScale(ratingType) }
      </span>
      { !!reviewsNumber && (
        <div>
          Просмотров:&nbsp;
          {reviewsNumber}
        </div>
      )}
      { !reviewsNumber && (
        <div>
          Просмотров нет
        </div>
      )}
    </div>
  );
};

Rating.defaultProps = {
  starColor: COLOR.GOLD,
  ratingType: RATING_TYPE.FIVE_STARS,
};

Rating.propTypes = {
  ratingValue: PropTypes.number.isRequired,
  reviewsNumber: PropTypes.number.isRequired,
  starColor: PropTypes.oneOf((Object.values(COLOR))),
  ratingType: PropTypes.oneOf((Object.values(RATING_TYPE))),
};

export default Rating;
