import {useRef} from 'react';
import {Text} from '../../../../../UI/Text/Text';
import style from './FormComment.module.css';

export const FormComment = () => {
  const textareaRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(textareaRef.current.value);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Text As="h3" size={14} tsize={18}>Имя авторизованного пользователя</Text>
      <textarea ref={textareaRef} className={style.textarea}></textarea>
      <button className={style.btn}>Отправить</button>
    </form>
  );
};
