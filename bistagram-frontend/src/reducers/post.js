import POST from '../actions/ActionTypes/post';

const request = {
    fetching: false,
    fetched: false,
    error: null
}

const initialState = {
  posts: [],
  start: 0,
  isMore: true,
  status: {
    post: true,
    reply: true
  },
  request: {
    searchPosts:{
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
    case POST.SEARCH_POSTS + "_PENDING":
      return{
        ...state,
        requests: {
          ...state.requests,
          searchPosts: { ...pending }
        }
      }
    case POST.SEARCH_POSTS + '_FULFILLED':
      return {
        ...state,
        posts:[
          ...state.posts,
          ...payload.data
        ],
        start: state.start + payload.data.length,
        isMore: payload.data.length<5 ?false:true,
        requests: {
          ...state.requests,
          searchPosts: { ...fulfilled }
        }
      }
    case POST.SEARCH_POSTS + '_REJECTED':
      return {
        ...state,
        requests: {
          ...state.requests,
          searchPosts: { ...rejected, error: payload }
        }
      };
    default:
      return state;
  }

}

export default post;
