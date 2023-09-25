import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';

export const Auth = () => (
  <button className={style.button}>
    <LoginIcon className={style.svg}/>
  </button>
);
