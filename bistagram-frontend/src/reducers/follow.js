import FOLLOW from '../actions/ActionTypes/follow';

const request = {
    fetching: false,
    fetched: false,
    error: null
}

const initialState = {
  user: [],
  expstart: 0,
  isMore: true,
  status: [],
  request: {
    recommendMainFollow: {
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
    case FOLLOW.RECOMMEND_MAINFOLLOW + "_PENDING":
      return{
        ...state,
        requests: {
          ...state.requests,
          recommendMainFollow: { ...pending }
        }
      }
    case FOLLOW.RECOMMEND_MAINFOLLOW + '_FULFILLED':
      return {
        ...state,
        user:[
          ...payload.data
        ],
        requests: {
          ...state.requests,
          recommendMainFollow: { ...fulfilled }
        }
      }
    case FOLLOW.RECOMMEND_MAINFOLLOW + '_REJECTED':
      return {
        ...state,
        requests: {
          ...state.requests,
          recommendMainFollow: { ...rejected, error: payload }
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
          ...state.user,

        ],
        requests: {
          ...state.requests,
          following: { ...fulfilled }
        }
      }
    case FOLLOW.FOLLOWING + '_REJECTED':
      return {
        ...state,
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
