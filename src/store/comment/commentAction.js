import axios from 'axios';
import {URL_API} from '../../api/const';
import {deleteToken} from '../tokenReducer';

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

export const fetchCommentsSuccess = (data) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: data,
});

export const fetchCommentsFailure = (error) => ({
  type: FETCH_COMMENTS_FAILURE,
  error,
});

export const fetchCommentsAsync = (id) => (dispatch, getState) => {
  const token = getState().token.token;
  if (!token || !id) return;

  dispatch(fetchCommentsRequest());

  axios(`${URL_API}/comments/${id}`, {
    headers: {
      Authorization: `bearer ${token}`
    },
  })
    .then(response => {
      const post = response.data[0].data.children[0].data;
      const comments = response.data[1].data.children.map(item => item.data);
      dispatch(fetchCommentsSuccess({post, comments}));
    })
    .catch(err => {
      if (err.response && err.response.status === 401) {
        dispatch(deleteToken());
      }
      dispatch(fetchCommentsFailure(err.message));
    });
};
