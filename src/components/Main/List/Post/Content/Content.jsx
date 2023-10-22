import style from './Content.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text/Text';
import {Link, useParams} from 'react-router-dom';

export const Content = ({postData}) => {
  const {title, author, id} = postData;
  const {page} = useParams();

  return (
    <div className={style.content}>
      <Text As="h2" className={style.title}>
        <Link className={style.linkPost} to={`/category/${page}/post/${id}`}>
          <Text
            bold
            size={14}
            tsize={22}
            className={style.linkPost}
          >
            {title}
          </Text>
        </Link>
      </Text>
      <Text
        As="a"
        size={12}
        tsize={14}
        color="orange"
        className={style.linkAuthor}
        href="#author">{author}
      </Text>
    </div>
  );
};

Content.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    id: PropTypes.string.isRequired,
    created: PropTypes.number,
    selftext: PropTypes.string
  }),
};
