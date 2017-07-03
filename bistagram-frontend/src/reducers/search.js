import SEARCH from '../actions/ActionTypes/search';

const request = {
  fetching: false,
  fetched: false,
  error: null
}

const posts ={
  atccount: -1,
  popular: [],
  recent: [],
  page: {
    hash: false,
    person: false
  }
}

const initialState = {
  isModal: false,
  moreView: false,
  isMore: false,
  loading: false,
  posts: {
    ...posts
  },
  requests: {
    searchHash: {
        ...request
    },
    addHash: {
        ...request
    }
  }
}

const pending = {fetching: true, fetched: false, error: null};
const fulfilled = {fetching: false, fetched: true, error: null};
const rejected = {fetching: false, fetched: false}

function search(state=initialState, action) {
  const payload = action.payload;
  switch (action.type) {

    case SEARCH.SEARCH_HASH + "_PENDING":
      return {
        ...state,
        posts: {
          ...state.posts,
          page: {
            hash: true,
            person: false
          }
        },
        requests: {
            ...state.requests,
            searchHash: { ...pending }
        }
      }
    case SEARCH.SEARCH_HASH + '_FULFILLED':
      return {
        ...state,
        posts: {
          ...state.posts,
          atccount: payload.data.atccount,
          popular: payload.data.popular,
          recent: payload.data.recent
        },
        isMore: payload.data.popular.length===9 && payload.data.atccount>(payload.data.popular.length+payload.data.recent.length)?true:false,
        requests: {
          ...state.requests,
          searchHash: { ...fulfilled }
        }
      }
    case SEARCH.SEARCH_HASH + '_REJECTED':
      return {
        ...state,
        requests: {
          ...state.requests,
          searchHash: { ...rejected, error: payload }
        }
      };

    case SEARCH.ADD_HASH + "_PENDING":
      return {
        ...state,
        posts: {
          ...state.posts,
          page: {
            hash: true,
            person: false
          }
        },
        loading: true,
        moreView: true,
        requests: {
            ...state.requests,
            searchHash: { ...pending }
        }
      }
    case SEARCH.ADD_HASH + '_FULFILLED':
      return {
        ...state,
        posts: {
          ...state.posts,
          recent: [
            ...state.posts.recent,
            ...payload.data
          ]
        },
        isMore: state.posts.popular.length===9 && state.posts.atccount>(state.posts.popular.length+state.posts.recent.length+payload.data.length)?true:false,
        loading: false,
        requests: {
          ...state.requests,
          searchHash: { ...fulfilled }
        }
      }
    case SEARCH.ADD_HASH + '_REJECTED':
      return {
        ...state,
        loading: false,
        requests: {
          ...state.requests,
          searchHash: { ...rejected, error: payload }
        }
      };
    default:
      return state;
  }
}


export default search;
