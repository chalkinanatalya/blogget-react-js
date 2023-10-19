import axios from 'axios';
import {URL_API} from '../../api/const';
import {deleteToken} from '../tokenReducer';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  error,
});

export const fetchPostsAsync = () => (dispatch, getState) => {
  const token = getState().token.token;
  if (!token) return;

  dispatch(fetchPostsRequest());

  axios(`${URL_API}/best`, {
    headers: {
      Authorization: `bearer ${token}`
    },
  })
    .then(response => {
      const posts = response.data.data.children.map(item => item.data);
      dispatch(fetchPostsSuccess(posts));
    })
    .catch(err => {
      console.error(err);
      if (err.response && err.response.status === 401) {
        dispatch(deleteToken());
      }
      dispatch(fetchPostsFailure(err.message));
    });
};
