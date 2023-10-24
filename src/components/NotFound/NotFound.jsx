import style from './NotFound.module.css';

export const NotFound = () => {
  console.log(style);
  return (
    <div className={style.container}>
      <h1 className={style.errorCode}>404</h1>
      <p className={style.errorMessage}>Страница не найдена.</p>
    </div>
  );
};
