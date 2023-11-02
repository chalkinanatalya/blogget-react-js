import {all} from 'redux-saga/effects';
import {watchSearch} from './search/searchSaga';
import {watchPostsSaga} from './postsData/postsSaga';
import {watchCommentsSaga} from './comment/commentsSaga';

export default function* rootSaga() {
  yield all([
    watchSearch(),
    watchPostsSaga(),
    watchCommentsSaga()
  ]);
}
