import {CHANGE_PAGE, FETCH_POSTS_FAILURE, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_SUCCESS_AFTER} from './postsAction';


const initialState = {
  loading: false,
  posts: [],
  error: '',
  after: '',
  isLast: false,
  page: ''
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: '',
        after: action.after,
        isLast: !action.after
      };

    case FETCH_POSTS_SUCCESS_AFTER:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload],
        error: '',
        after: action.after,
        isLast: !action.after
      };

    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
        after: '',
        isLast: false,
      };

    default: return state;
  }
};

