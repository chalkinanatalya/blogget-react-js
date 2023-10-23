import axios from 'axios';
import {URL_API} from '../../api/const';
import {deleteToken} from '../tokenReducer';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS_AFTER = 'ETCH_POSTS_SUCCESS_AFTER';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts.children, // posts
  after: posts.after
});

export const fetchPostsSuccessAfter = (posts) => ({
  type: FETCH_POSTS_SUCCESS_AFTER,
  payload: posts.children,
  after: posts.after
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  error,
});

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  page
});

export const fetchPostsAsync = (newPage) => (dispatch, getState) => {
  let page = getState().posts.page;

  if (newPage) {
    page = newPage;
    dispatch(changePage(page));
  }

  const token = getState().token.token;
  const after = getState().posts.after;
  const loading = getState().posts.loading;
  const isLast = getState().posts.isLast;

  if (!token || loading || isLast) return;

  dispatch(fetchPostsRequest());

  axios(`${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`
    },
  })
    .then(({data}) => {
      if (after) {
        dispatch(fetchPostsSuccessAfter(data.data));
      } else {
        dispatch(fetchPostsSuccess(data.data));
      }
    })
    .catch(err => {
      console.error(err);
      if (err.response && err.response.status === 401) {
        dispatch(deleteToken());
      }
      dispatch(fetchPostsFailure(err.message));
    });
};
