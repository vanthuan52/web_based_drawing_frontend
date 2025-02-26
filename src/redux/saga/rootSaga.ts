import {all} from 'redux-saga/effects';
import {authSaga} from './authSaga';
import {toolSaga} from './toolSaga';
import {canvasManagerSaga} from './canvasManagerSaga';
import {canvasObjectSaga} from './canvasObjectSaga';

export default function* rootSaga() {
  yield all([authSaga(), toolSaga(), canvasObjectSaga(), canvasManagerSaga()]);
}
