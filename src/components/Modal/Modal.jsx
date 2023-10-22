import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useEffect, useRef, useState} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
import {FormComment} from '../Main/List/Post/FormComment/FormComment';
import {Comments} from './Comments/Comments';
import AuthLoader from '../../UI/AuthLoader';
import {useNavigate, useParams} from 'react-router-dom';

export const Modal = () => {
  const {id, page} = useParams();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const data = useCommentsData(id);
  // console.log('data: ', data);
  const {status, post, comments} = data;
  console.log('comments: ', comments);

  const [isFormVisible, setFormVisible] = useState(false);
  const textareaRef = useRef(null);

  const handleCommentButtonClick = () => {
    setFormVisible(true);
  };

  const handleClick = e => {
    if (!e.target) return;
    const target = e.target;
    if (target === overlayRef.current) {
      navigate(`category/${page}`);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      navigate(`category/${page}`);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isFormVisible && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFormVisible]);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && <AuthLoader />}
        {status === 'error' && 'Error'}
        {status === 'loaded' && (
          <>
            <h2 className={style.title}>{post?.title}</h2>
            <div className={style.content}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank',
                    }
                  }
                }
              }}>{post?.selftext}</Markdown>
            </div>
            <p className={style.author}>{post?.author}</p>
            {isFormVisible ? (
                      <FormComment textareaRef={textareaRef} />
                    ) : (
                      <button onClick={handleCommentButtonClick} className={style.btn}>
                        Написать комментарий
                      </button>
                    )}
            {comments && comments.length > 0 && comments.map(comment => (
              <Comments key={comment.id} comment={comment} created={post?.created} />
            ))}
          </>
        )}
        <button className={style.close} onClick={() => {
          navigate(`category/${page}`);
        }}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
  closeModal: PropTypes.func
};
