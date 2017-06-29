import { createAction } from 'redux-actions';

import * as service from '../services/auth';
import FORM from './ActionTypes/form';

export const postformReset = createAction(FORM.POSTFORM_RESET);
export const setPostContent = createAction(FORM.SET_POST_CONTENT);
export const setPostMediaReset = createAction(FORM.SET_POST_MEDIA_RESET);
export const setPostMedia = createAction(FORM.SET_POST_MEDIA);
export const moveMedia = createAction(FORM.MOVE_MEDIA);
export const deleteMedia = createAction(FORM.DELETE_MEDIA);

export const changeUserData = createAction(FORM.CHANGE_USERDATA);

export const checkUserName = (username) => ({
  type: FORM.CHECK_USERNAME,
  payload: {
    promise: service.checkUserName(username)
  }
})

export const checkNickName = (nickname) => ({
  type: FORM.CHECK_NICKNAME,
  payload: {
    promise: service.checkNickName(nickname)
  }
})

export const changeCheck = createAction(FORM.CHANGE_CHECK);

export const formDataReset = createAction(FORM.FORMDATA_RESET);

export const setSubmitStatus = createAction(FORM.SET_SUBMIT_STATUS);
export const setErrorMessage = createAction(FORM.SET_ERRORMESSAGE);


export const signUp = (params) => ({
  type: FORM.SIGNUP,
  payload: {
    promise: service.signUp(params)
  }
})

export const signIn = (params) => ({
  type: FORM.SIGNIN,
  payload: {
    promise: service.signIn(params)
  }
})
