import {useEffect, useState} from 'react';
import {Text} from '../../../UI/Text/Text';
import {urlAuth} from '../../../api/auth';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import PropTypes from 'prop-types';
import {URL_API} from '../../../api/const';

export const Auth = ({token}) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    if (!token) return;
    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`
      },
    }).then(response => response.json()
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      }
      ))
      .catch(err => {
        console.error(err);
        setAuth({});
      });
  }, [token]);
  return (
    <div className={style.container}>
      {auth.name ? (
        <button className={style.btn}>
          <img className={style.img} src={auth.img} title={`Аватар ${auth.name}`}/>
        </button>
    ) : (
      <Text className={style.authLink} As="a" href={urlAuth}>
        <LoginIcon className={style.svg}/>
      </Text>
    )}
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
};
