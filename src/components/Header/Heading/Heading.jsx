import PropTypes from 'prop-types';

export const Heading = (props) => (
  <h1>{props.text}</h1>
);

Heading.propTypes = {
  text: PropTypes.string,
};
