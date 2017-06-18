import POST from './ActionTypes/post';
import * as service from '../services/post';

export const searchPosts = (params) => ({
  type: POST.SEARCH_POSTS,
  payload: {
    promise: service.searchPosts(params)
  }
})

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
