import {put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {Rect, Circle} from 'fabric';
import {RootState} from '../store';
import {canvasActions, DRAWING_ACTION} from '../slice/canvasSlice';

function* handleSaveCanvas() {
  const {action} = yield select((state: RootState) => state.canvas);
  const {id, data} = action.payload;
  yield put(canvasActions.updateCanvas({id, data}));
  console.log(`Canvas ${id} saved.`);
}

function* handleDrawRectangle() {
  const {canvasInstance, action} = yield select(
    (state: RootState) => state.canvas
  );

  if (!canvasInstance) return;
  canvasInstance.add(new Rect({width: 50, height: 50, fill: 'red'}));

  yield put(canvasActions.resetAction());
}

function* handleDrawCircle() {
  const {canvasInstance, action} = yield select(
    (state: RootState) => state.canvas
  );

  if (!canvasInstance) return;
  canvasInstance.add(new Circle({radius: 25, fill: 'blue'}));

  yield put(canvasActions.resetAction());
}

function* handleClearCanvas() {
  const {canvasInstance, action} = yield select(
    (state: RootState) => state.canvas
  );

  if (!canvasInstance) return;
  canvasInstance.clear();

  yield put(canvasActions.resetAction());
}

export function* canvasSaga() {
  yield takeEvery(canvasActions.updateCanvas, handleSaveCanvas);
  yield takeLatest(canvasActions.drawRectangle, handleDrawRectangle);
  yield takeLatest(canvasActions.drawCircle, handleDrawCircle);
  yield takeLatest(canvasActions.clearCanvas, handleClearCanvas);
}
