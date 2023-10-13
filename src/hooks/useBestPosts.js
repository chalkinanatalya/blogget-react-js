import {useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {useSelector, useDispatch} from 'react-redux';
import {deleteToken} from '../store/tokenReducer';

export const useBestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token || fetched) return;

    setLoading(true);
    fetch(`${URL_API}/best`, {
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
          dispatch(deleteToken());
        }
      })
      .finally(() => {
        setLoading(false);
        setFetched(true);
      });
  }, [token]);

  return {posts, loading};
};
