import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';

const fetchWithTokenCheck = async (url, options, onUnauthorized) => {
  const response = await fetch(url, options);

  if (response.status === 401 && onUnauthorized) {
    onUnauthorized();
  }

  return response;
};

export const useAuth = (token, onUnauthorized) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    if (!token) return;
    fetchWithTokenCheck(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`
      },
    }, onUnauthorized).then(response => response.json()
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      }
      ))
      .catch(err => {
        console.error(err);
        setAuth({});
      });
  }, [token, onUnauthorized]);

  return auth;
};
