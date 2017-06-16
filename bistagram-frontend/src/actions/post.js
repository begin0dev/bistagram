import POST from './ActionTypes/post';
import * as service from '../services/post';

export const searchPosts = (params) => ({
  type: POST.SEARCH_POSTS,
  payload: {
    promise: service.searchPosts(params)
  }
})
