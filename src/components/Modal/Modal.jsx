import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useEffect, useRef, useState} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
import {FormComment} from '../Main/List/Post/FormComment/FormComment';
import {Comments} from '../Main/List/Post/Comments/Comments';
import AuthLoader from '../../UI/AuthLoader';

export const Modal = ({
  id,
  created,
  title,
  author,
  markdown,
  closeModal}) => {
  const {comments, status} = useCommentsData(id);
  const overlayRef = useRef(null);

  const [isFormVisible, setFormVisible] = useState(false);
  const textareaRef = useRef(null);

  const handleCommentButtonClick = () => {
    setFormVisible(true);
  };

  const handleClick = e => {
    if (!e.target) return;
    const target = e.target;
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      closeModal();
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
            <h2 className={style.title}>{title}</h2>
            <div className={style.content}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank',
                    }
                  }
                }
              }}>{markdown}</Markdown>
            </div>
            <p className={style.author}>{author}</p>
            {isFormVisible ? (
                      <FormComment textareaRef={textareaRef} />
                    ) : (
                      <button onClick={handleCommentButtonClick} className={style.btn}>
                        Написать комментарий
                      </button>
                    )}
            {comments && comments.length > 0 && comments.map(comment => (
              <Comments key={comment.id} comment={comment} created={created} />
            ))}
          </>
        )}
        <button className={style.close} onClick={closeModal}>
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
