import FOLLOW from '../actions/ActionTypes/follow';

const request = {
    fetching: false,
    fetched: false,
    error: null
}

const initialState = {
  user: [],
  index: -1,
  start: 0,
  isMore: true,
  requests: {
    recommendFollow: {
      ...request
    },
    following: {
      ...request
    },
    unfollow: {
      ...request
    }
  }
}

const pending = {fetching: true, fetched: false, error: null};
const fulfilled = {fetching: false, fetched: true, error: null};
const rejected = {fetching: false, fetched: false}

function post(state=initialState, action) {
  const payload = action.payload;
  switch (action.type) {

    case FOLLOW.SET_FOLLOW_CLICK_INDEX:
      return{
        ...state,
        index: payload
      }

    case FOLLOW.RECOMMEND_FOLLOW + "_PENDING":
      return{
        ...state,
        requests: {
          ...state.requests,
          recommendFollow: { ...pending }
        }
      }
    case FOLLOW.RECOMMEND_FOLLOW + '_FULFILLED':
      return {
        ...state,
        user:[
          ...payload.data
        ],
        isMore: payload.data.length < 10?false:true,
        requests: {
          ...state.requests,
          recommendFollow: { ...fulfilled }
        }
      }
    case FOLLOW.RECOMMEND_FOLLOW + '_REJECTED':
      return {
        ...state,
        requests: {
          ...state.requests,
          recommendFollow: { ...rejected, error: payload }
        }
      };

    case FOLLOW.FOLLOWING + "_PENDING":
      return{
        ...state,
        requests: {
          ...state.requests,
          following: { ...pending }
        }
      }
    case FOLLOW.FOLLOWING + '_FULFILLED':
      return {
        ...state,
        user:[
          ...state.user.slice(0, state.index),
          {...state.user[state.index],
            follow: payload?1 : 0
          },
          ...state.user.slice(state.index+1, state.user.length),
        ],
        index: -1,
        requests: {
          ...state.requests,
          following: { ...fulfilled }
        }
      }
    case FOLLOW.FOLLOWING + '_REJECTED':
      return {
        ...state,
        index: -1,
        requests: {
          ...state.requests,
          following: { ...rejected, error: payload }
        }
      };

    case FOLLOW.UNFOLLOW + "_PENDING":
      return{
        ...state,
        requests: {
          ...state.requests,
          following: { ...pending }
        }
      }
    case FOLLOW.UNFOLLOW + '_FULFILLED':
      return {
        ...state,
        user:[
          ...state.user.slice(0, state.index),
          {...state.user[state.index],
            follow: payload?0 : 1
          },
          ...state.user.slice(state.index+1, state.user.length),
        ],
        index: -1,
        requests: {
          ...state.requests,
          following: { ...fulfilled }
        }
      }
    case FOLLOW.UNFOLLOW + '_REJECTED':
      return {
        ...state,
        index: -1,
        requests: {
          ...state.requests,
          following: { ...rejected, error: payload }
        }
      };

    default:
      return state;
  }

}

export default post;
