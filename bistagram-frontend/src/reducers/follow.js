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
  request: {
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
    case FOLLOW.RECOMMEND_FOLLOW + "_PENDING":
      return{
        ...state,
        requests: {
          ...state.requests,
          recommendFollow: { ...pending }
        }
      }
    case FOLLOW.RECOMMEND_FOLLOW + '_FULFILLED':
    console.log(payload)
      return {
        ...state,
        user:[
          ...payload.data
        ],
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
