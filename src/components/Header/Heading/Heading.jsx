import PropTypes from 'prop-types';
import {Text} from '../../../UI/Text/Text';
import style from './Heading.module.css';

export const Heading = ({text}) => (
  <Text
    As="h1"
    className={style.heading}
    size={22}
    tsize={26}
    center
  >{text}
  </Text>
);

Heading.propTypes = {
  text: PropTypes.string,
};
