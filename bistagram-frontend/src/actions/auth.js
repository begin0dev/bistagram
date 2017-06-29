import { createAction } from 'redux-actions';

import AUTH from './ActionTypes/auth';
import * as service from '../services/auth';


export const checkSession = () => ({
  type: AUTH.CHECK_SESSION,
  payload: {
    promise: service.checkSession()
  }
})

export const getHistory = (username) => ({
  type: AUTH.GET_HISTORY,
  payload: {
    promise: service.getHistory()
  }
})


/*
    payload: {
        form,
        name,
        value
    }
*/
export const changeUserData = createAction(AUTH.CHANGE_USERDATA);

export const checkUserName = (username) => ({
  type: AUTH.CHECK_USERNAME,
  payload: {
    promise: service.checkUserName(username)
  }
})

export const checkNickName = (nickname) => ({
  type: AUTH.CHECK_NICKNAME,
  payload: {
    promise: service.checkNickName(nickname)
  }
})

export const changeCheck = createAction(AUTH.CHANGE_CHECK);

export const authDataReset = createAction(AUTH.AUTHDATA_RESET);

export const setSubmitStatus = createAction(AUTH.SET_SUBMIT_STATUS);
export const setErrorMessage = createAction(AUTH.SET_ERRORMESSAGE);


export const signUp = (params) => ({
  type: AUTH.SIGNUP,
  payload: {
    promise: service.signUp(params)
  }
})

export const signIn = (params) => ({
  type: AUTH.SIGNIN,
  payload: {
    promise: service.signIn(params)
  }
})

export const logout = () => ({
  type: AUTH.LOGOUT,
  payload: {
    promise: service.logout()
  }
})
