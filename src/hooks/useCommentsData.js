import {useContext, useEffect, useState} from 'react';
import {tokenContext} from '../context/tokenContext';
import {URL_API} from '../api/const';

export const useCommentsData = (articleId, options = {}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token, delToken} = useContext(tokenContext);

  useEffect(() => {
    if (!token || !articleId) return;

    const {
      comment,
      context = 0,
      depth,
      limit,
      showedits = false,
      showmedia = false,
      showmore = false,
      showtitle = true,
      sort = 'top',
      sr_detail: srDetails,
      theme = 'default',
      threaded = true,
      truncate
    } = options;

    const params = new URLSearchParams({
      context,
      showedits,
      showmedia,
      showmore,
      showtitle,
      sort,
      theme,
      threaded
    });
    if (comment) params.append('comment', comment);
    if (depth) params.append('depth', depth);
    if (limit) params.append('limit', limit);
    if (srDetails) params.append('sr_detail', srDetails);
    if (truncate) params.append('truncate', truncate);

    fetch(`${URL_API}/comments/${articleId}?${params.toString()}`, {
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
        if (data && Array.isArray(data) && data[1] && data[1].data && Array.isArray(data[1].data.children)) {
          setComments(data[1].data.children.map(item => item.data));
        } else {
          console.error('Unexpected data structure:', data);
          setComments([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        setLoading(false);
        if (error.message === 'Unauthorized') {
          delToken();
        }
      });
  }, [token, articleId, options]);

  return {comments, loading};
};
