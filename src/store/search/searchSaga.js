import {takeLatest, put, select, call} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import {SEARCH_REQUEST, searchRequestError, searchRequestSuccess} from './saerchAction';

function* fetchSearch(action) {
  const searchQuery = action.search;
  if (!searchQuery) {
    console.error('Пустой запрос поиска');
    return;
  }
  const token = yield select(state => state.token.token);
  const after = yield select(state => state.search.after);
  try {
    const afterParam = after ? `&after=${after}` : '';
    const response = yield call(fetch, `${URL_API}/search?q=${searchQuery}&limit=25${afterParam}`, {
      headers: {
        Authorization: `bearer ${token}`
      },
    });

    const data = yield response.json();
    console.log(data.data.children);

    yield put(searchRequestSuccess({
      posts: data.data.children,
      after: data.data.after
    }));
  } catch (e) {
    console.error('Ошибка при запросе:', e);
    yield put(searchRequestError(e.toString()));
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
