import { createAction } from 'redux-actions';

import FORM from './ActionTypes/form';

export const postformReset = createAction(FORM.POSTFORM_RESET);
export const setPostContent = createAction(FORM.SET_POST_CONTENT);
export const setPostMediaReset = createAction(FORM.SET_POST_MEDIA_RESET);
export const setPostMedia = createAction(FORM.SET_POST_MEDIA);
export const moveMedia = createAction(FORM.MOVE_MEDIA);
export const deleteMedia = createAction(FORM.DELETE_MEDIA);
