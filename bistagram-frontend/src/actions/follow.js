import { createAction } from 'redux-actions';

import FOLLOW from './ActionTypes/follow';
import * as service from '../services/follow';

export const recommendFollow = (params) => ({
  type: FOLLOW.RECOMMEND_FOLLOW,
  payload: {
    promise: service.recommendFollow(params)
  }
})

export const setClickIndex = createAction(FOLLOW.SET_CLICK_INDEX);

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
