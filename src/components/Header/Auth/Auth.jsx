import style from './Auth.module.css';
import login from './img/login.svg'

export const Auth = () => {
  return (
    <button className={style.button}>
      <img className={style.photo} src={login} alt="Авторизация"/>
    </button>
  );
}