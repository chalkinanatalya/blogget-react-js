import axios from 'axios';
import {URL_API} from '../../api/const';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCommentsAsync = createAsyncThunk('comments/fetch', (id, {getState}) => {
  const token = getState().token.token;
  if (!token || !id) return;

  return axios(`${URL_API}/comments/${id}`, {
    headers: {
      Authorization: `bearer ${token}`
    },
  })
    .then(response => {
      const post = response.data[0].data.children[0].data;
      const comments = response.data[1].data.children.map(item => item.data);
      return {post, comments};
    })
    .catch(err => ({err: err.toString()}));
});
