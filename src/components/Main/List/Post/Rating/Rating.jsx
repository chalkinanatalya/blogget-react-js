import style from './Rating.module.css';
import PropTypes from 'prop-types';

export const Rating = ({ups}) => {
  console.log(ups);
  return (
    <div className={style.rating}>
      <button className={style.up} aria-label="увеличить рейтинг"/>
      <p className={style.ups}>{ups}</p>
      <button className={style.down} aria-label="понизить рейтинг"/>
    </div>
  );
};

Rating.propTypes = {
  ups: PropTypes.number,
};
