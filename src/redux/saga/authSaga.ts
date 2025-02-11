/* eslint-disable @typescript-eslint/no-explicit-any */
import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {LogInFormType, SignUpFormType} from '@/constant/validation/authSchema';
import {authActions} from '../slice/authSlice';
import {IResponse} from '@/types/common';
import authApi from '@/services/authApi';
import {setToken} from '@/utils/tokenHelper';

function* handleLogin(action: PayloadAction<LogInFormType>) {
  try {
    const {data, message}: IResponse = yield call(
      authApi.logIn,
      action.payload
    );
    setToken(data.access_token);
    toast.success(message);
    yield put(authActions.loginSuccess());
  } catch (error: any) {
    yield put(authActions.handleError(error.message));
  }
}

function* handleSignUp(action: PayloadAction<SignUpFormType>) {
  try {
    const {status, message} = yield call(authApi.signUp, action.payload);
    if (status) {
      toast.success(message);
      yield put(authActions.signupSuccess());
    }
  } catch (error: any) {
    yield put(authActions.handleError(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(authActions.login, handleLogin);
  yield takeLatest(authActions.signup, handleSignUp);
}
