import {useState, useContext} from 'react';
import {Text} from '../../../UI/Text/Text';
import {urlAuth} from '../../../api/auth';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import PropTypes from 'prop-types';
import {authContext} from '../../../context/authContext';
import {useDispatch} from 'react-redux';
import {deleteToken} from '../../../store';

export const Auth = () => {
  const [showLogout, setShowLogout] = useState(false);
  const {auth, clearAuth} = useContext(authContext);
  const dispatch = useDispatch();

  const toggleLogoutButton = () => {
    setShowLogout(!showLogout);
  };

  const logOut = () => {
    dispatch(deleteToken());
    clearAuth();
  };

  return (
    <div className={style.container}>
      {auth.name ? (
        <>
          <button className={style.btn}>
            <img className={style.img} src={auth.img} title={`Аватар ${auth.name}`} onClick={toggleLogoutButton}/>
          </button>
          {showLogout && <button className={style.logout} onClick={logOut}>Выйти</button>}
        </>
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
