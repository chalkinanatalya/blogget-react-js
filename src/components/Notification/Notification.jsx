import style from './Notification.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react';

export const Notification = ({message, closeNotification}) => {
  const overlayRef = useRef(null);

  const handleClick = e => {
    if (!e.target) return;
    const target = e.target;
    if (target === overlayRef.current) {
      closeNotification();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      closeNotification();
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
      <div className={style.notification}>
        <p className={style.message}>Big oooooops! Something went wrong: {message}</p>
        <button className={style.close} onClick={closeNotification}>
          x
        </button>
      </div>
    </div>,
    document.getElementById('notification-root')
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  closeNotification: PropTypes.func.isRequired
};
