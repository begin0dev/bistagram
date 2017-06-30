import AUTH from '../actions/ActionTypes/auth';

const request = {
  fetching: false,
  fetched: false,
  error: null
}

const userinfo ={
  user: {
    username: null,
    name: null,
    nickname: null,
    profileimgname: null,
    state: null
  },
  followInfo: {
    followers: [],
    following: []
  },
  hiscount: -1,
  histories:[ ],
  logged: false
}

const initialState ={
  userinfo: {
    ...userinfo
  },
  recommend:{
    clickUser: '',
    users: []
  },
  requests: {
    checkSession: {
        ...request
    },
    logout: {
        ...request
    },
    getHistory: {
        ...request
    },
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

function auth(state=initialState, action) {
  const payload = action.payload
  switch (action.type) {

    case AUTH.CHANGE_USERDATA:
      return {
        ...state,
        [payload.form]: {
          ...state[payload.form],
          [payload.name]: payload.value
        }
      }

    case AUTH.CHECK_SESSION + "_PENDING":
        return {
            ...state,
            requests: {
                ...state.requests,
                checkSession: { ...pending }
            }
        }
    case AUTH.CHECK_SESSION + "_FULFILLED":
        return {
            ...state,
            requests: {
                ...state.requests,
                checkSession: { ...fulfilled }
            },
            userinfo: {
                ...state.userinfo,
                user: !payload.data.user ? {...userinfo.user} : payload.data.user,
                hiscount: payload.data.hiscount,
                followInfo: {
                  ...payload.data.followInfo
                },
                logged: payload.data.logged
            }
        }
    case AUTH.CHECK_SESSION + "_REJECTED":
        return {
            ...state,
            userinfo: {
                ...state.userinfo,
                logged: false
            },
            requests: {
                ...state.requests,
                checkSession: { ...rejected, error: payload }
            }
        }

    case AUTH.GET_HISTORY + "_PENDING":
        return {
            ...state,
            requests: {
                ...state.requests,
                getHistory: { ...pending }
            }
        }
    case AUTH.GET_HISTORY + "_FULFILLED":
        return {
            ...state,
            userinfo:{
              ...state.userinfo,
              histories:[
                  ...payload.data.history
              ]
            },
            requests: {
                ...state.requests,
                getHistory: { ...fulfilled }
            }
        }
    case AUTH.GET_HISTORY + "_REJECTED":
        return {
            ...state,
            requests: {
                ...state.requests,
                getHistory: { ...rejected, error: payload }
            }
        }

    case AUTH.LOGOUT + "_PENDING":
      return {
        ...state,
        requests: {
            ...state.requests,
            logout: { ...pending  }
        }
      }
    case AUTH.LOGOUT + '_FULFILLED':
      return {
        ...state,
        session: {
          ...payload.data,
          logged: payload?false:true
        },
        requests: {
          ...state.requests,
          logout: { fulfilled }
        }
      }
    case AUTH.LOGOUT + '_REJECTED':
      return {
        ...state,
        session: {
          ...state.session,
          logged: true
        },
        requests: {
          ...state.requests,
          logout: { ...rejected, error: payload }
        }
      };


    case AUTH.SET_FOLLOW_USER:
      return{
        ...state,
        recommend: {
          ...state.recommend,
          clickUser: payload
        }
      }

    case AUTH.RECOMMEND_FOLLOW + "_PENDING":
      return{
        ...state,
        requests: {
          ...state.requests,
          recommendFollow: { ...pending }
        }
      }
    case AUTH.RECOMMEND_FOLLOW + '_FULFILLED':
      return {
        ...state,
        recommend:{
          ...state.recommend,
          users: [...payload.data]
        },
        requests: {
          ...state.requests,
          recommendFollow: { ...fulfilled }
        }
      }
    case AUTH.RECOMMEND_FOLLOW + '_REJECTED':
      return {
        ...state,
        requests: {
          ...state.requests,
          recommendFollow: { ...rejected, error: payload }
        }
      };

    case AUTH.FOLLOWING + "_PENDING":
      return{
        ...state,
        requests: {
          ...state.requests,
          following: { ...pending }
        }
      }
    case AUTH.FOLLOWING + '_FULFILLED':
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          followInfo:{
            ...state.userinfo.followInfo,
            follower: [
              ...state.userinfo.followInfo.follower,
              payload.data.username
            ]
          }
        },
        recommend: {
          ...state.recommend,
          clickUser:''
        },
        requests: {
          ...state.requests,
          following: { ...fulfilled }
        }
      }
    case AUTH.FOLLOWING + '_REJECTED':
      return {
        ...state,
        recommend: {
          ...state.recommend,
          clickUser:''
        },
        requests: {
          ...state.requests,
          following: { ...rejected, error: payload }
        }
      };

    case AUTH.UNFOLLOW + "_PENDING":
      return{
        ...state,
        requests: {
          ...state.requests,
          following: { ...pending }
        }
      }
    case AUTH.UNFOLLOW + '_FULFILLED':
      let filteredArray = state.userinfo.followInfo.follower.filter(item => item !== payload.data.username)
      return {
        ...state,
        userinfo: {
          ...state.userinfo,
          followInfo:{
            ...state.userinfo.followInfo,
            follower: filteredArray
          }
        },
        recommend: {
          ...state.recommend,
          clickUser:''
        },
        requests: {
          ...state.requests,
          following: { ...fulfilled }
        }
      }
    case AUTH.UNFOLLOW + '_REJECTED':
      return {
        ...state,
        recommend: {
          ...state.recommend,
          clickUser:''
        },
        requests: {
          ...state.requests,
          following: { ...rejected, error: payload }
        }
      };

    default:
      return state;
  }
}

export default auth;
