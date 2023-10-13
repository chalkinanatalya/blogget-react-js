import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {tokenReducer} from './tokenReducer';
import {commentReducer} from './commentReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  comment: commentReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
console.log('store: ', store);
