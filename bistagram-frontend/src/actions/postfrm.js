import { createAction } from 'redux-actions';

import POSTFRM from './ActionTypes/postfrm';

export const postformReset = createAction(POSTFRM.POSTFORM_RESET);
export const setPostContent = createAction(POSTFRM.SET_POST_CONTENT);
export const setPostMediaReset = createAction(POSTFRM.SET_POST_MEDIA_RESET);
export const setPostMedia = createAction(POSTFRM.SET_POST_MEDIA);
export const moveMedia = createAction(POSTFRM.MOVE_MEDIA);
export const deleteMedia = createAction(POSTFRM.DELETE_MEDIA);
export const toggleDragging = createAction(POSTFRM.TOGGLE_DRAGGING);
