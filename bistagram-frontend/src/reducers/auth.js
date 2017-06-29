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
  hiscount: -1,
  followInfo: {
    followers: 0,
    following: 0
  },
  histories:[

  ],
  logged: false
}

const initialState ={
  userinfo: {
    ...userinfo
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
                }
            },
            logged: payload.data.logged
            }
    case AUTH.CHECK_SESSION + "_REJECTED":
        return {
            ...state,
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
  default:
    return state;
  }
}

export default auth;
