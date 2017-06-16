import { createAction } from 'redux-actions';

import AUTH from './ActionTypes/auth';
import * as service from '../services/auth';

/*
    payload: {
        form,
        name,
        value
    }
*/
export const changeUserData = createAction(AUTH.CHANGE_USERDATA);

export const checkUserId = (id) => ({
  type: AUTH.CHECK_USERID,
  payload: {
    promise: service.checkUserId(id)
  }
})

export const checkUserNick = (nick) => ({
  type: AUTH.CHECK_USERNICK,
  payload: {
    promise: service.checkUserNick(nick)
  }
})

export const changeCheck = createAction(AUTH.CHANGE_CHECK);

export const authDataReset = createAction(AUTH.AUTHDATA_RESET);

export const setSubmitStatus = createAction(AUTH.SET_SUBMIT_STATUS);
export const setErrorMessage = createAction(AUTH.SET_ERRORMESSAGE);


export const signUp = (params) => ({
  type: AUTH.SIGNUP,
  payload: {
    promise: service.SignUp(params)
  }
})

export const signIn = (params) => ({
  type: AUTH.SIGNIN,
  payload: {
    promise: service.SignIn(params)
  }
})
