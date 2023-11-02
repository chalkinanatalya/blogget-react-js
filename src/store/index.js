import {tokenMiddleware, tokenReducer} from './tokenReducer';
import commentsReducer from './comment/commentsSlice';
import {authReducer} from './auth/authReducer';
import postsReducer from './postsData/postsSlice';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import {searchReducer} from './search/searchReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    comment: commentsReducer,
    auth: authReducer,
    posts: postsReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware)
});

sagaMiddleware.run(rootSaga);
