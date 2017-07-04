import SEARCH from '../actions/ActionTypes/search';

const request = {
  fetching: false,
  fetched: false,
  error: null
}

const posts = {
  atccount: -1,
  popular: [],
  recent: [],
  moreView: false,
  isMore: false,
  loading: false
}

const modalState = {
  modal: false
}

const initialState = {
  modalState: {
    ...modalState
  },
  modalpost: {},
  posts: {
    ...posts
  },
  requests: {
    searchHash: {
        ...request
    },
    addHash: {
        ...request
    },
    getModalPost: {
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
          recent: payload.data.recent,
          isMore: payload.data.popular.length===9 && payload.data.atccount>(payload.data.popular.length+payload.data.recent.length)?true:false
        },
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
          loading: true,
          moreView: true
        },
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
          ],
          isMore: state.posts.popular.length===9 && state.posts.atccount>(state.posts.popular.length+state.posts.recent.length+payload.data.length)?true:false,
          loading: false
        },
        requests: {
          ...state.requests,
          searchHash: { ...fulfilled }
        }
      }
    case SEARCH.ADD_HASH + '_REJECTED':
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false
        },
        requests: {
          ...state.requests,
          searchHash: { ...rejected, error: payload }
        }
      };


    case SEARCH.GET_MODAL_POST + "_PENDING":
      return {
        ...state,
        requests: {
            ...state.requests,
            getModalPost: { ...pending }
        }
      }
    case SEARCH.GET_MODAL_POST + '_FULFILLED':
      return {
        ...state,
        modalState: {
          ...state.modalState,
          modal: true,
        },
        modalpost: {
          ...payload.data
        },
        requests: {
          ...state.requests,
          getModalPost: { ...fulfilled }
        }
      }
    case SEARCH.GET_MODAL_POST + '_REJECTED':
      return {
        ...state,
        modalState: {
          ...state.modalState,
          modal: false,
        },
        requests: {
          ...state.requests,
          getModalPost: { ...rejected, error: payload }
        }
      };


    case SEARCH.SET_MODAL_INIT:
      return {
        ...state,
        modalState: {
          ...modalState
        },
        modalpost: {}
      };

    default:
      return state;
  }
}


export default search;
