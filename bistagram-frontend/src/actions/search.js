import { createAction } from 'redux-actions';

import * as service from '../services/search';
import SEARCH from './ActionTypes/search';

export const searchHash = (params) => ({
  type: SEARCH.SEARCH_HASH,
  payload: {
    promise: service.searchHash(params)
  }
})

export const addHash = (params) => ({
  type: SEARCH.ADD_HASH,
  payload: {
    promise: service.addHash(params)
  }
})

export const getModalPost = (params) => ({
  type: SEARCH.GET_MODAL_POST,
  payload: {
    promise: service.getModalPost(params)
  }
})

export const setModalInit = createAction(SEARCH.SET_MODAL_INIT);
