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

export const recommendFollow = (params) => ({
  type: AUTH.RECOMMEND_FOLLOW,
  payload: {
    promise: service.recommendFollow(params)
  }
})

export const setFollowUser = createAction(AUTH.SET_FOLLOW_USER);

export const following = (params) => ({
  type: AUTH.FOLLOWING,
  payload: {
    promise: service.following(params)
  }
})

export const unfollow = (params) => ({
  type: AUTH.UNFOLLOW,
  payload: {
    promise: service.unfollow(params)
  }
})
