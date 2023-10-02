import {useContext, useEffect, useState} from 'react';
import {tokenContext} from '../context/tokenContext';
import {URL_API} from '../api/const';

export const useBestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token, delToken} = useContext(tokenContext);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/best.json`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data.data.children.map(item => item.data));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching best posts:', error);
        setLoading(false);
        if (error.message === 'Unauthorized') {
          delToken();
        }
      });
  }, [token]);

  return {posts, loading};
};
