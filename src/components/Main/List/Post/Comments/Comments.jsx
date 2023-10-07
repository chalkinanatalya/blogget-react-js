import {Text} from '../../../../../UI/Text/Text';
import {Date} from '../Date/Date';
import style from './Comments.module.css';
import PropTypes from 'prop-types';

export const Comments = ({date, created, id, comment}) => {
  if (!comment) return <p>Нет комментариев</p>;
  return (
    <ul className={style.list}>
      <li className={style.item} key={id}>
        <Text As="h3" className={style.author} size={18} tsize={22}>{comment.author}</Text>
        <Text As="p" className={style.comment} size={14} tsize={18}>{comment.body}</Text>
        <Date date={date} created={created}/>
      </li>
    </ul>
  );
};

Comments.propTypes = {
  date: PropTypes.node,
  id: PropTypes.node,
  comment: PropTypes.object.isRequired,
  created: PropTypes.number
};
