import { createAction } from 'redux-actions';

import UI from './ActionTypes/ui';

export const setHeader = createAction(UI.SET_HEADER);
export const setLoadingInitial = createAction(UI.SET_LOADING_INITIAL);
export const setLoading = createAction(UI.SET_LOADING);
