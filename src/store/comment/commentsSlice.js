import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  comment: 'Hello, Redux',
  loading: false,
  data: {post: null, comments: []},
  error: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentsRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchCommentsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailed
} = commentsSlice.actions;
export default commentsSlice.reducer;
