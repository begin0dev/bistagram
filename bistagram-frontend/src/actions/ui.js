import { createAction } from 'redux-actions';

import UI from './ActionTypes/ui';

export const setHeader = createAction(UI.SET_HEADER);
export const setHeaderModal = createAction(UI.SET_HEADER_MODAL);
export const setLoadingInitial = createAction(UI.SET_LOADING_INITIAL);
export const setLoading = createAction(UI.SET_LOADING);
export const setUiModal = createAction(UI.SET_UI_MODAL);
export const setFollowModalInitial = createAction(UI.SET_FOLLOW_MODAL_INITIAL);
