import FOLLOW from './ActionTypes/follow';
import * as service from '../services/follow';

export const recommendMainFollow = (params) => ({
  type: FOLLOW.RECOMMEND_MAINFOLLOW,
  payload: {
    promise: service.recommendMainFollow(params)
  }
})

export const following = (params) => ({
  type: FOLLOW.FOLLOWING,
  payload: {
    promise: service.following(params)
  }
})

export const unfollow = (params) => ({
  type: FOLLOW.UNFOLLOW,
  payload: {
    promise: service.unfollow(params)
  }
})
