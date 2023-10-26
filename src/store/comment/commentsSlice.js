import {createSlice} from '@reduxjs/toolkit';
import {fetchCommentsAsync} from './commentAction';

const initialState = {
  comment: 'Hello, Redux',
  loading: false,
  data: {post: null, comments: []},
  error: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCommentsAsync.pending.type]: (state) => {
      state.error = '';
      state.loading = true;
    },
    [fetchCommentsAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    [fetchCommentsAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.err;
    },

  }
});

export default commentsSlice.reducer;
