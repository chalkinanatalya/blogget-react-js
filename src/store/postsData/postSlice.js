import {createSlice} from '@reduxjs/toolkit';
import {fetchPostsAsync} from './postsAction';

const initialState = {
  loading: false,
  posts: [],
  error: '',
  after: '',
  isLast: false,
  page: ''
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
      state.after = '';
      state.isLast = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const {children, after} = action.payload;

          if (state.after && children) {
            state.posts = [...state.posts, ...children];
          } else if (children) {
            state.posts = children;
          }

          state.after = after;
          state.isLast = !after;
          state.error = '';
        }
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {changePage} = postsSlice.actions;
export default postsSlice.reducer;

