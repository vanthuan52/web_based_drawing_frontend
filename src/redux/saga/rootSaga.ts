import {all} from 'redux-saga/effects';
import {authSaga} from './authSaga';
import {canvasSaga} from './canvasSaga';
import {canvasManagerSaga} from './canvasManagerSaga';
import {canvasObjectSaga} from './canvasObjectSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    canvasSaga(),
    canvasObjectSaga(),
    canvasManagerSaga(),
  ]);
}
