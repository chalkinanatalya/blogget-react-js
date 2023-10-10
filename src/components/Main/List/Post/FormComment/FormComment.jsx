import {useContext} from 'react';
import {Text} from '../../../../../UI/Text/Text';
import style from './FormComment.module.css';
import PropTypes from 'prop-types';
import {authContext} from '../../../../../context/authContext';
import {useDispatch, useSelector} from 'react-redux';
import {updateComment} from '../../../../../store';


export const FormComment = ({textareaRef}) => {
  const value = useSelector(state => state.comment);
  const dispatch = useDispatch();

  const {auth} = useContext(authContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('VAL', value);
  };

  const handleChange = e => {
    dispatch(updateComment(e.target.value));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Text As="h3" size={14} tsize={18}>{auth.name}</Text>
      <textarea
        className={style.textarea}
        defaultValue={value}
        onChange={handleChange}>
      </textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  );
};


FormComment.propTypes = {
  textareaRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(Element)})
  ]).isRequired
};
