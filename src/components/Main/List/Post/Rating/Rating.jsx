import {Text} from '../../../../../UI/Text/Text';
import style from './Rating.module.css';
import PropTypes from 'prop-types';

export const Rating = ({ups}) => (
  <div className={style.rating}>
    <button className={style.up} aria-label="увеличить рейтинг"/>
    <Text As="p"
      size={12}
      tsize={16}
      className={style.ups}
      color="grey99"
      bold>
      {ups}
    </Text>
    <button className={style.down} aria-label="понизить рейтинг"/>
  </div>
);

Rating.propTypes = {
  ups: PropTypes.number,
};
