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

export const changeUserData = createAction(AUTH.CHANGE_USERDATA);

export const logout = () => ({
  type: AUTH.LOGOUT,
  payload: {
    promise: service.logout()
  }
})
