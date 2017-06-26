import { createAction } from 'redux-actions';

import UI from './ActionTypes/ui';

export const setHeader = createAction(UI.SET_HEADER);
export const setLoading = createAction(UI.SET_LOADING);
