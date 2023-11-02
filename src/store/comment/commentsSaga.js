import {put, takeLatest, call, select} from 'redux-saga/effects';
import axios from 'axios';
import {URL_API} from '../../api/const';
import {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailed
} from './commentsSlice';
import {deleteToken} from '../tokenReducer';

function* fetchCommentsSaga(action) {
  const {id} = action.payload;
  const token = yield select(state => state.token.token);

  if (!token || !id) return;

  try {
    console.log('Making API request...');
    const response = yield call(axios.get, `${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`
      },
    });

    if (response.status === 401) {
      yield put(deleteToken());
      throw new Error('Unauthorized');
    }

    const post = response.data[0].data.children[0].data;
    const comments = response.data[1].data.children.map(item => item.data);
    yield put(fetchCommentsSuccess({post, comments}));
    console.log('API response:', response);
  } catch (error) {
    yield put(fetchCommentsFailed(error.message));
  }
}

export function* watchCommentsSaga() {
  yield takeLatest(fetchCommentsRequest.type, fetchCommentsSaga);
}
