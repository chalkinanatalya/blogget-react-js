import {useState} from 'react';
import {Text} from '../../../UI/Text/Text';
import {urlAuth} from '../../../api/auth';
import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import PropTypes from 'prop-types';
import {useAuth} from '../../../hooks/useAuth';

export const Auth = ({token, delToken}) => {
  const auth = useAuth(token);
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogoutButton = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    delToken();
  };
  return (
    <div className={style.container}>
      {auth.name ? (
        <>
          <button className={style.btn}>
            <img className={style.img} src={auth.img} title={`Аватар ${auth.name}`} onClick={toggleLogoutButton}/>
          </button>
          {showLogout && <button className={style.logout} onClick={handleLogout}>Выйти</button>}
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
  delToken: PropTypes.func,
};
