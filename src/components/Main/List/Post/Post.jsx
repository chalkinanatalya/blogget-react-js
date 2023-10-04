import style from './Post.module.css';
import PropTypes from 'prop-types';
import notphoto from './img/notphoto.jpg';
import {formatDate} from '../../../../utils/formatDate';
import {Rating} from './Rating/Rating';
import {Content} from './Content/Content';
import {ReactComponent as DeleteIcon} from './img/delete.svg';

export const Post = ({postData}) => {
  const {title, ups, date, created, thumbnail} = postData;
  const thumbnailReg = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))/i;
  return (
    <li className={style.post}>
      <img className={style.img} src={thumbnailReg.test(thumbnail) ? thumbnail : notphoto } alt={title} />
      <button className={style.delete}>
        <DeleteIcon width={24} height={24}/>
      </button>
      <Content postData={postData}/>
      <Rating ups={ups}/>
      <time className={style.date} dateTime={date}>{formatDate(created)}</time>
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
