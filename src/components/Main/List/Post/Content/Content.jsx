import style from './Content.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text/Text';
import {useState} from 'react';
import {Modal} from '../../../../Modal/Modal';

export const Content = ({postData}) => {
  console.log('postData: ', postData);
  const {title, author, selftext: markdown} = postData;
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
            console.log(1);
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
      {isModalOpen && <Modal title={title} author={author} markdown={markdown} />}
      {console.log('markdown: ', markdown)}

    </div>
  );
};

Content.propTypes = {
  postData: PropTypes.object,
  markdown: PropTypes.string,
};
