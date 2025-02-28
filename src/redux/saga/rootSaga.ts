import {all} from 'redux-saga/effects';
import {authSaga} from './authSaga';
import {toolSaga} from './toolSaga';
import {canvasManagerSaga} from './canvasManagerSaga';
import {canvasObjectSaga} from './canvasObjectSaga';
import {canvasSaga} from './canvasSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    canvasSaga(),
    toolSaga(),
    canvasObjectSaga(),
    canvasManagerSaga(),
  ]);
}
