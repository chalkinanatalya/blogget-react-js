import {put, takeLatest, call, select} from 'redux-saga/effects';
import axios from 'axios';
import {URL_API} from '../../api/const';
import {fetchPostsFailed, fetchPostsSuccess, fetchPostsRequest, changePage} from './postsSlice';
import {deleteToken} from '../tokenReducer';

function* fetchPostsSaga(action) {
  const {newPage} = action;

  if (newPage) {
    yield put(changePage(newPage));
  }

  const state = yield select(state => state.posts);
  const token = yield select(state => state.token.token);
  if (!token || state.isLast) return;

  try {
    const response = yield call(axios.get, `${URL_API}/${newPage || state.page}?limit=10&${state.after ? `after=${state.after}` : ''}`, {
      headers: {
        Authorization: `bearer ${token}`
      },
    });

    if (response.status === 401) {
      yield put(deleteToken());
      throw new Error('Unauthorized');
    }

    if (!response.data || !response.data.data) {
      throw new Error('Invalid server response');
    }

    yield put(fetchPostsSuccess(response.data.data));
  } catch (error) {
    yield put(fetchPostsFailed(error.message));
  }
}

export function* watchPostsSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
}
