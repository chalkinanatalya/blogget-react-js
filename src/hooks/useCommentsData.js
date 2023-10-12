import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {URL_API} from '../api/const';

export const useCommentsData = (id) => {
  const [data, setData] = useState([{}, []]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.token);

  useEffect(() => {
    if (!token || !id) return;

    if (loading) {
      fetch(`${URL_API}/comments/${id}`, {
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
        .then(
          ([
            {
              data: {
                children: [{data: post}],
              },
            },
            {
              data: {
                children,
              },
            },
          ]) => {
            const comments = children.map(item => item.data);
            setData([post, comments]);
            setLoading(false);
          }
        )
        .catch(err => {
          console.error(err);
          setData([{}, []]);
          setLoading(false);
        });
    }
  }, [token, id]);

  console.log('data: ', data);

  return {data, loading};
};


