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
  index: -1,
  replyindex: -1,
  status: {
    modal: false,
    post: false,
    like: false,
    reply: false,
    uploadPost: false
  },
  requests: {
    searchPosts:{
      ...request
    },
    likeAtc:{
      ...request
    },
    notlikeAtc:{
      ...request
    },
    insertReply:{
      ...request
    },
    deleteReply: {
      ...request
    },
    getAllReplies: {
      ...request
    },
    uploadPost: {
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

    case POST.SET_POST_INDEX:
      return{
        ...state,
        index: payload.index,
        replyindex: payload.replyindex,
      }

    case POST.SET_MODAL:
      return{
        ...state,
        index: payload.index,
        status: {
          modal: !state.status.modal
        }
      }

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

    case POST.LIKE_ATC + "_PENDING":
      return{
        ...state,
        status: {
          ...state.status,
          like: true
        },
        requests: {
          ...state.requests,
          likeAtc: { ...pending }
        }
      }
    case POST.LIKE_ATC + '_FULFILLED':
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, state.index),
          {...state.posts[state.index],
              atclikecount: state.posts[state.index].atclikecount + (payload?1:0),
              like: payload?true:false
          },
          ...state.posts.slice(state.index+1, state.posts.length)
        ],
        index: -1,
        status: {
          ...state.status,
          like: false
        },
        requests: {
          ...state.requests,
          likeAtc: { ...fulfilled }
        }
      }
    case POST.LIKE_ATC + '_REJECTED':
      return {
        ...state,
        status: {
          ...state.status,
          like: false
        },
        index: -1,
        requests: {
          ...state.requests,
          likeAtc: { ...rejected, error: payload }
        }
      };

    case POST.NOTLIKE_ATC + "_PENDING":
      return{
        ...state,
        status: {
          ...state.status,
          like: true
        },
        requests: {
          ...state.requests,
          likeAtc: { ...pending }
        }
      }
    case POST.NOTLIKE_ATC + '_FULFILLED':
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, state.index),
          {...state.posts[state.index],
              atclikecount: state.posts[state.index].atclikecount - (payload?1:0),
              like: payload?false:true
          },
          ...state.posts.slice(state.index+1, state.posts.length)
        ],
        index: -1,
        status: {
          ...state.status,
          like: false
        },
        requests: {
          ...state.requests,
          likeAtc: { ...fulfilled }
        }
      }
    case POST.NOTLIKE_ATC + '_REJECTED':
      return {
        ...state,
        index: -1,
        status: {
          ...state.status,
          like: false
        },
        requests: {
          ...state.requests,
          likeAtc: { ...rejected, error: payload }
        }
      };

    case POST.INSERT_REPLY + "_PENDING":
      return{
        ...state,
        status: {
          ...state.status,
          reply: true
        },
        requests: {
          ...state.requests,
          insertReply: { ...pending }
        }
      }
    case POST.INSERT_REPLY + '_FULFILLED':
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, state.index),
          {
            ...state.posts[state.index],
              replies: [
                ...state.posts[state.index].replies,
                !payload.data.message&&payload.data
              ],
              repliescount: state.posts[state.index].repliescount + (!payload.data.message?1:0)
          },
          ...state.posts.slice(state.index+1, state.posts.length)
        ],
        index: -1,
        status: {
          ...state.status,
          reply: false
        },
        requests: {
          ...state.requests,
          insertReply: { ...fulfilled }
        }
      }
    case POST.INSERT_REPLY + '_REJECTED':
      return {
        ...state,
        index: -1,
        status: {
          ...state.status,
          reply: false
        },
        requests: {
          ...state.requests,
          deleteReply: { ...rejected, error: payload }
        }
      };

    case POST.DELETE_REPLY + "_PENDING":
      return{
        ...state,
        status: {
          ...state.status,
          reply: true
        },
        requests: {
          ...state.requests,
          deleteReply: { ...pending }
        }
      }
    case POST.DELETE_REPLY + '_FULFILLED':
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, state.index),
          {
            ...state.posts[state.index],
              replies: payload.data?[
                ...state.posts[state.index].replies.slice(0, state.replyindex),
                ...state.posts[state.index].replies.slice(state.replyindex+1, state.posts[state.index].replies.length)
              ]:[...state.posts[state.index].replies],
              repliescount: state.posts[state.index].repliescount - (payload.data?1:0)
          },
          ...state.posts.slice(state.index+1, state.posts.length)
        ],
        index: -1,
        replyindex: -1,
        status: {
          ...state.status,
          reply: false
        },
        requests: {
          ...state.requests,
          insertReply: { ...fulfilled }
        }
      }
    case POST.DELETE_REPLY + '_REJECTED':
      return {
        ...state,
        index: -1,
        replyindex: -1,
        status: {
          ...state.status,
          reply: false
        },
        requests: {
          ...state.requests,
          deleteReply: { ...rejected, error: payload }
        }
      };


    case POST.GET_ALL_REPLIES + "_PENDING":
      return{
        ...state,
        status: {
          ...state.status,
          reply: true
        },
        requests: {
          ...state.requests,
          getAllReplies: { ...pending }
        }
      }
    case POST.GET_ALL_REPLIES + '_FULFILLED':
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, state.index),
          {
            ...state.posts[state.index],
              replies:[...payload.data.rows,...state.posts[state.index].replies]
          },
          ...state.posts.slice(state.index+1, state.posts.length)
        ],
        index: -1,
        status: {
          ...state.status,
          reply: false
        },
        requests: {
          ...state.requests,
          getAllReplies: { ...fulfilled }
        }
      }
    case POST.GET_ALL_REPLIES + '_REJECTED':
      return {
        ...state,
        index: -1,
        status: {
          ...state.status,
          reply: false
        },
        requests: {
          ...state.requests,
          getAllReplies: { ...rejected, error: payload }
        }
      };

    case POST.UPLOAD_POST + "_PENDING":
      return{
        ...state,
        status:{
          ...state.status,
          uploadPost: true
        },
        requests: {
          ...state.requests,
          uploadPost: { ...pending }
        }
      }
    case POST.UPLOAD_POST + '_FULFILLED':
      return {
        ...state,
        posts:[
          ...payload.data,
          ...state.posts          
        ],
        status:{
          ...state.status,
          uploadPost: false
        },
        requests: {
          ...state.requests,
          uploadPost: { ...fulfilled }
        }
      }
    case POST.UPLOAD_POST + '_REJECTED':
      return {
        ...state,
        status:{
          ...state.status,
          uploadPost: false
        },
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
