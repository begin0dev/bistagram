import { createAction } from 'redux-actions';

import * as service from '../services/search';
import * as postservice from '../services/post';
import SEARCH from './ActionTypes/search';

export const searchHash = (params) => ({
  type: SEARCH.SEARCH_HASH,
  payload: {
    promise: service.searchHash(params)
  }
})

export const searchUser = (params) => ({
  type: SEARCH.SEARCH_USER,
  payload: {
    promise: service.searchUser(params)
  }
})

export const setModalPostIndex = createAction(SEARCH.SET_MODAL_POST_INDEX);

export const addHash = (params) => ({
  type: SEARCH.ADD_HASH,
  payload: {
    promise: service.addHash(params)
  }
})

export const addUserPost = (params) => ({
  type: SEARCH.ADD_USER_POST,
  payload: {
    promise: service.addUserPost(params)
  }
})

export const getModalPost = (params) => ({
  type: SEARCH.GET_MODAL_POST,
  payload: {
    promise: service.getModalPost(params)
  }
})

export const setModalInit = createAction(SEARCH.SET_MODAL_INIT);

export const modalPostLike = (params) => ({
  type: SEARCH.MODAL_POST_LIKE,
  payload: {
    promise: postservice.likeAtc(params)
  }
})

export const modalPostNotLike = (params) => ({
  type: SEARCH.MODAL_POST_NOTLIKE,
  payload: {
    promise: postservice.notlikeAtc(params)
  }
})

export const modalPostInsertReply = (params) => ({
  type: SEARCH.MODAL_POST_INSERT_REPLY,
  payload: {
    promise: postservice.insertReply(params)
  }
})

export const modalPostDeleteReply = (params) => ({
  type: SEARCH.MODAL_POST_DELETE_REPLY,
  payload: {
    promise: postservice.deleteReply(params)
  },
  meta: {
    replyindex: params.replyindex
  }
})

export const getUserFollower = (params) => ({
  type: SEARCH.GET_USER_FOLLOWER,
  payload: {
    promise: service.getUserFollower(params)
  }
})

export const getUserFollowing = (params) => ({
  type: SEARCH.GET_USER_FOLLOWING,
  payload: {
    promise: service.getUserFollowing(params)
  }
})

export const setInnerModal = createAction(SEARCH.SET_INNER_MODAL);
