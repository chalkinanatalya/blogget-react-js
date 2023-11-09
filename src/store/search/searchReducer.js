import {SEARCH_REQUEST, SEARCH_REQUEST_ERROR, SEARCH_REQUEST_SUCCESS, SEARCH_RESET} from './saerchAction';

const initialState = {
  loading: false,
  posts: [],
  error: '',
  after: '',
  hasMoreData: true,
  query: ''
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        query: action.search
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.posts],
        error: '',
        after: action.after,
        hasMoreData: !!action.after
      };
    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SEARCH_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
