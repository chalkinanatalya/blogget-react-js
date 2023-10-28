import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {deleteToken} from '../tokenReducer';
import {URL_API} from '../../api/const';
import {changePage} from './postSlice';

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetch',
  async (newPage, {getState, dispatch}) => {
    const state = getState().posts;

    if (newPage) {
      dispatch(changePage(newPage));
    }

    const page = newPage || state.page;
    const {after, isLast} = state;
    const token = getState().token.token;

    if (!token || isLast) return;
    const response = await axios(`${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
      headers: {
        Authorization: `bearer ${token}`
      },
    });

    if (response.status === 401) {
      dispatch(deleteToken());
      throw new Error('Unauthorized');
    }

    if (!response.data || !response.data.data) {
      throw new Error('Invalid server response');
    }

    return response.data.data;
  }
);


