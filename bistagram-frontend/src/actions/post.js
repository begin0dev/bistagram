import { createAction } from 'redux-actions';

import POST from './ActionTypes/post';
import * as service from '../services/post';
import * as searchservice from '../services/search';

export const postsReset = createAction(POST.POSTS_RESET);
export const setMediaIndex = createAction(POST.SET_MEDIA_INDEX);
export const setMediaPlay = createAction(POST.SET_MEDIA_PLAY);
export const setPostReply = createAction(POST.SET_POST_REPLY);


export const searchPosts = (params) => ({
  type: POST.SEARCH_POSTS,
  payload: {
    promise: service.searchPosts(params)
  }
})

export const deletePost = (params) => ({
  type: POST.DELETE_POST,
  payload: {
    promise: service.deletePost(params)
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

export const uploadPost = (params) => ({
  type: POST.UPLOAD_POST,
  payload: {
    promise: service.uploadPost(params)
  }
})

export const getPostDetailInfo = (params) => ({
  type: POST.GET_POST_DETAIL_INFO,
  payload: {
    promise: searchservice.getModalPost(params)
  }
})

export const getPostDetailReplies = (params) => ({
  type: POST.GET_POST_DETAIL_REPLIES,
  payload: {
    promise: service.getAllReplies(params)
  }
})

export const postDetailLike = (params) => ({
  type: POST.POST_DETAIL_LIKE,
  payload: {
    promise: service.likeAtc(params)
  }
})

export const postDetailNotlike = (params) => ({
  type: POST.POST_DETAIL_NOTLIKE,
  payload: {
    promise: service.notlikeAtc(params)
  }
})

export const postDetailInsertReply = (params) => ({
  type: POST.POST_DETAIL_INSERT_REPLY,
  payload: {
    promise: service.insertReply(params)
  }
})

export const postDetailDeleteReply = (params) => ({
  type: POST.POST_DETAIL_DELETE_REPLY,
  payload: {
    promise: service.deleteReply(params)
  },
  meta: {
    replyindex: params.replyindex
  }
})
