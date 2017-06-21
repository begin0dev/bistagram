import { createAction } from 'redux-actions';

import POST from './ActionTypes/post';
import * as service from '../services/post';

export const searchPosts = (params) => ({
  type: POST.SEARCH_POSTS,
  payload: {
    promise: service.searchPosts(params)
  }
})

export const setPostIndex = createAction(POST.SET_POST_INDEX);
export const setModal = createAction(POST.SET_MODAL);

export const likeAtc = (params) => ({
  type: POST.LIKE_ATC,
  payload: {
    promise: service.likeAtc(params)
  }
})

export const notlikeAtc = (params) => ({
  type: POST.NOTLIKE_ATC,
  payload: {
    promise: service.notlikeAtc(params)
  }
})

export const insertReply = (params) => ({
  type: POST.INSERT_REPLY,
  payload: {
    promise: service.insertReply(params)
  }
})

export const deleteReply = (params) => ({
  type: POST.DELETE_REPLY,
  payload: {
    promise: service.deleteReply(params)
  }
})

export const getAllReplies = (params) => ({
  type: POST.GET_ALL_REPLIES,
  payload: {
    promise: service.getAllReplies(params)
  }
})

export const setPostContent = createAction(POST.SET_POST_CONTENT);
export const setPostMedia = createAction(POST.SET_POST_MEDIA);
