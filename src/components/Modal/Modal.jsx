import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
import {useBestPosts} from '../../hooks/useBestPosts';

export const Modal = ({id, closeModal}) => {
  const {posts} = useBestPosts();
  const {comments, loading} = useCommentsData(id);
  const overlayRef = useRef(null);

  const post = posts.find(p => p.id === id);

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


  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {loading ? (
          <p>Loading...</p>
        ) : (
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
            <ul>
              {comments.map(comment => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
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
