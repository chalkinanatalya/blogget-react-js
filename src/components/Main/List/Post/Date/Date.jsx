import {formatDate} from '../../../../../utils/formatDate';
import style from './Date.module.css';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
export const Date = ({date, created}) => {
  // console.log(date);
  return (
    <time className={style.date} dateTime={date}>{formatDate(created)}</time>
  );
};

Date.propTypes = {
  date: PropTypes.node,
  created: PropTypes.number,
};
