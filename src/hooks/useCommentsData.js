import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCommentsRequest} from '../store/comment/commentsSlice';

export const useCommentsData = (id) => {
  const data = useSelector(state => state.comment.data);
  const loading = useSelector(state => state.comment.loading);
  const error = useSelector(state => state.comment.error);
  const dispatch = useDispatch();

  let status = 'idle';
  if (loading) {
    status = 'loading';
  } else if (error) {
    status = 'error';
  } else if (data.post || data.comments) {
    status = 'loaded';
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsRequest(id));
    }
  }, [id, dispatch]);

  return {...data, loading, error, status};
};


