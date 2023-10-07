import style from './Content.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text/Text';
import {useState} from 'react';
import {Modal} from '../../../../Modal/Modal';

export const Content = ({postData}) => {
  const {title, author, id, created, selftext: markdown} = postData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className={style.content}>
      <Text As="h2" className={style.title}>
        <Text
          As="a"
          bold
          size={14}
          tsize={22}
          className={style.linkPost}
          href="#post"
          onClick={(event) => {
            handleLinkClick(event);
          }}
        >
          {title}
        </Text>
      </Text>
      <Text
        As="a"
        size={12}
        tsize={14}
        color="orange"
        className={style.linkAuthor}
        href="#author">{author}
      </Text>
      {isModalOpen && id && <Modal id={id} created={created} title={title} author={author} markdown={markdown} closeModal={() => {
        setIsModalOpen(false);
      }}/>}

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
