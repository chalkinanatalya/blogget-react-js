export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_ERROR = 'SEARCH_REQUEST_ERROR';
export const SEARCH_RESET = 'SEARCH_RESET';

export const searchRequest = (search) => (
  {
    type: SEARCH_REQUEST,
    search,
  }
);

export const searchRequestSuccess = ({posts, after}) => (
  {
    type: SEARCH_REQUEST_SUCCESS,
    posts,
    after,
  }
);

export const searchRequestError = (error) => (
  {
    type: SEARCH_REQUEST_ERROR,
    error
  }
);

export const searchReset = (error) => (
  {
    type: SEARCH_RESET,
    error
  }
);
