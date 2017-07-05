import SEARCH from '../actions/ActionTypes/search';

const request = {
  fetching: false,
  fetched: false,
  error: null
}

const posts = {
  atcindex: -1,
  atccount: -1,
  popular: [],
  recent: [],
  moreView: false,
  isMore: false,
  loading: false
}

const modalState = {
  modal: false,
  likeLoading: false,
  replyLoading: false,
  innermodal: false
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
    },
    modalPostLike: {
        ...request
    },
    modalPostNotLike: {
        ...request
    },
    modalPostInsertReply: {
        ...request
    },
    modalPostDeleteReply: {
        ...request
    }
  }
}

const pending = {fetching: true, fetched: false, error: null};
const fulfilled = {fetching: false, fetched: true, error: null};
const rejected = {fetching: false, fetched: false}

function search(state=initialState, action) {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {

    case SEARCH.SET_MODAL_INIT:
      return {
        ...state,
        posts: {
          ...state.posts,
          atcindex: -1
        },
        modalState: {
          ...modalState
        },
        modalpost: {}
      };

    case SEARCH.SET_MODAL_POST_INDEX:
      return {
        ...state,
        posts: {
          ...state.posts,
          atcindex: payload
        }
      };

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


    case SEARCH.MODAL_POST_LIKE + "_PENDING":
      return {
        ...state,
        modalState: {
          ...state.modalState,
          likeLoading: true
        },
        requests: {
            ...state.requests,
            modalPostLike: { ...pending }
        }
      }
    case SEARCH.MODAL_POST_LIKE + '_FULFILLED':
      let atcctgname = '';
      let targetindex = -1;
      if(state.posts.atcindex<9){
        atcctgname="popular";
        targetindex=state.posts.atcindex;
      }else{
        atcctgname="recent";
        targetindex=state.posts.atcindex-9;
      }
      return {
        ...state,
        posts:{
          ...state.posts,
          [atcctgname]: [
            ...state.posts[atcctgname].slice(0, targetindex),
            {
              ...state.posts[atcctgname][targetindex],
              likecount: state.posts[atcctgname][targetindex].likecount + (payload?1:0)
            },
            ...state.posts[atcctgname].slice(targetindex+1, state.posts[atcctgname].length)
          ]
        },
        modalpost: {
          ...state.modalpost,
          atclike:{
            ...state.modalpost.atclike,
            like: payload?1:0,
            likecount: state.modalpost.atclike.likecount + (payload?1:0)
          }
        },
        modalState: {
          ...state.modalState,
          likeLoading: false
        },
        requests: {
          ...state.requests,
          modalPostLike: { ...fulfilled }
        }
      }
    case SEARCH.MODAL_POST_LIKE + '_REJECTED':
      return {
        ...state,
        modalState: {
          ...state.modalState,
          likeLoading: false
        },
        requests: {
          ...state.requests,
          modalPostLike: { ...rejected, error: payload }
        }
      };


    case SEARCH.MODAL_POST_NOTLIKE + "_PENDING":
      return {
        ...state,
        modalState: {
          ...state.modalState,
          likeLoading: true
        },
        requests: {
          ...state.requests,
          modalPostNotLike: { ...pending }
        }
      }
    case SEARCH.MODAL_POST_NOTLIKE + '_FULFILLED':
      if(state.posts.atcindex<9){
        atcctgname="popular";
        targetindex=state.posts.atcindex;
      }else{
        atcctgname="recent";
        targetindex=state.posts.atcindex-9;
      }
      return {
        ...state,
        posts:{
          ...state.posts,
          [atcctgname]: [
            ...state.posts[atcctgname].slice(0, targetindex),
            {
              ...state.posts[atcctgname][targetindex],
              likecount: state.posts[atcctgname][targetindex].likecount - (payload?1:0)
            },
            ...state.posts[atcctgname].slice(targetindex+1, state.posts[atcctgname].length)
          ]
        },
        modalpost: {
          ...state.modalpost,
          atclike:{
            ...state.modalpost.atclike,
            like: payload?0:1,
            likecount: state.modalpost.atclike.likecount - (payload?1:0)
          }
        },
        modalState: {
          ...state.modalState,
          likeLoading: false
        },
        requests: {
          ...state.requests,
          modalPostNotLike: { ...fulfilled }
        }
      }
    case SEARCH.MODAL_POST_NOTLIKE + '_REJECTED':
      return {
        ...state,
        modalState: {
          ...state.modalState,
          likeLoading: false
        },
        requests: {
          ...state.requests,
          modalPostNotLike: { ...rejected, error: payload }
        }
      };

    case SEARCH.MODAL_POST_INSERT_REPLY + "_PENDING":
      return {
        ...state,
        modalState: {
          ...state.modalState,
          replyLoading: true
        },
        requests: {
          ...state.requests,
          modalPostInsertReply: { ...pending }
        }
      }
    case SEARCH.MODAL_POST_INSERT_REPLY + '_FULFILLED':
      if(state.posts.atcindex<9){
        atcctgname="popular";
        targetindex=state.posts.atcindex;
      }else{
        atcctgname="recent";
        targetindex=state.posts.atcindex-9;
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          [atcctgname]: [
            ...state.posts[atcctgname].slice(0, targetindex),
            {
              ...state.posts[atcctgname][targetindex],
              replycount: state.posts[atcctgname][targetindex].replycount + (!payload.data.message?1:0)
            },
            ...state.posts[atcctgname].slice(targetindex+1, state.posts[atcctgname].length)
          ]
        },
        modalState: {
          ...state.modalState,
          replyLoading: false
        },
        modalpost: {
          ...state.modalpost,
          replies:[
              ...state.modalpost.replies,
              !payload.data.message&&payload.data
          ],
          replycount: state.modalpost.replycount + !payload.data.message?1:0
        },
        requests: {
          ...state.requests,
          modalPostInsertReply: { ...fulfilled }
        }
      }
    case SEARCH.MODAL_POST_INSERT_REPLY + '_REJECTED':
      return {
        ...state,
        modalState: {
          ...state.modalState,
          replyLoading: false
        },
        requests: {
          ...state.requests,
          modalPostInsertReply: { ...rejected, error: payload }
        }
      };

    case SEARCH.MODAL_POST_DELETE_REPLY + "_PENDING":
      return {
        ...state,
        modalState: {
          ...state.modalState,
          replyLoading: true
        },
        requests: {
          ...state.requests,
          modalPostDeleteReply: { ...pending }
        }
      }
    case SEARCH.MODAL_POST_DELETE_REPLY + '_FULFILLED':
      if(state.posts.atcindex<9){
        atcctgname="popular";
        targetindex=state.posts.atcindex;
      }else{
        atcctgname="recent";
        targetindex=state.posts.atcindex-9;
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          [atcctgname]: [
            ...state.posts[atcctgname].slice(0, targetindex),
            {
              ...state.posts[atcctgname][targetindex],
              replycount: state.posts[atcctgname][targetindex].replycount - (payload.data?1:0)
            },
            ...state.posts[atcctgname].slice(targetindex+1, state.posts[atcctgname].length)
          ]
        },
        modalState: {
          ...state.modalState,
          replyLoading: false
        },
        modalpost: {
          ...state.modalpost,
          replies:[
              ...state.modalpost.replies.slice(0, meta.replyindex),
              ...state.modalpost.replies.slice(meta.replyindex+1, state.modalpost.replies.length)
          ],
          replycount: state.modalpost.replycount - payload.data?1:0
        },
        requests: {
          ...state.requests,
          modalPostDeleteReply: { ...fulfilled }
        }
      }
    case SEARCH.MODAL_POST_DELETE_REPLY + '_REJECTED':
      return {
        ...state,
        modalState: {
          ...state.modalState,
          replyLoading: false
        },
        requests: {
          ...state.requests,
          modalPostDeleteReply: { ...rejected, error: payload }
        }
      };

    case SEARCH.SET_INNER_MODAL:
      return {
        ...state,
        modalState: {
          ...state.modalState,
          innermodal: !state.modalState.innermodal
        }
      };

    default:
      return state;
  }
}


export default search;
