import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  posts: [],
  error: '',
  after: '',
  page: '',
  hasMoreData: true,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest: state => {
      state.loading = true;
      state.error = '';
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      const {children, after} = action.payload;

      if (after && children) {
        state.posts = [...state.posts, ...children];
      } else if (children) {
        state.posts = children;
      }

      state.after = after;
      state.error = '';
      state.hasMoreData = !!after;
    },
    fetchPostsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changePage: (state, action) => {
      state.posts = [];
      state.page = action.payload;
      state.after = '';
      state.isLast = false;
    },
  },
});

export const {
  changePage,
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailed
} = postsSlice.actions;
export default postsSlice.reducer;

