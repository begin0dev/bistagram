import AUTH from '../actions/ActionTypes/auth';

const request = {
  fetching: false,
  fetched: false,
  error: null
}

const Status ={
  error: false,
  message: ''
}

const checked ={
  username: undefined,
  nickname: undefined,
  password: undefined
}

const register ={
  username: '',
  name: '',
  nickname: '',
  password: '',
  checked: {
    ...checked
  },
  status: {
    ...Status
  }
}

const login ={
  username: '',
  password: '',
  status: {
    ...Status
  }
}

const session ={
  sessionID: null,
  user: {
    username: null,
    name: null,
    nickname: null,
    profileimgname: null,
    state: null
  },
  followInfo: {
    followers: 0,
    following: 0
  },
  logged: false
}

const submitStatus = {
  signup: false,
  signin: false
}

const initialState ={
  register: { ...register },
  login: { ...login },
  session: { ...session },
  requests: {
    checkUserName: {
        ...request
    },
    checkNickName: {
        ...request
    },
    signup: {
        ...request
    },
    signin: {
        ...request
    },
    checkSession: {
        ...request
    }
  },
  submitStatus: { ...submitStatus }
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

    case AUTH.CHANGE_CHECK:
      return {
        ...state,
        register: {
          ...state.register,
          checked:{
            ...state.register.checked,
            [payload.name]: payload.value
          }
        }
      }

    case AUTH.AUTHDATA_RESET:
      return {
        ...state,
        register: {
          ...register
        },
        login: {
          ...login
        }
      }

    case AUTH.SET_ERRORMESSAGE:
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name],
          status:{
            ...state[payload.name].status,
            error: true,
            message: [payload.msg]
          }
        }
      }

    case AUTH.SET_SUBMIT_STATUS:
      return {
        ...state,
        submitStatus: {
          ...submitStatus,
          [payload.name]: payload.value
        }
      };

    //ID check
    case AUTH.CHECK_USERNAME + "_PENDING":
      return {
        ...state,
        requests: {
            ...state.requests,
            checkUserName: { ...pending }
        }
      }
    case AUTH.CHECK_USERNAME + '_FULFILLED':
      return {
        ...state,
        register: {
          ...state.register,
          checked:{
            ...state.register.checked,
            username: payload.data.possible
          }
        },
        requests: {
          ...state.requests,
          checkUserName: { ...fulfilled }
        }
      }
    case AUTH.CHECK_USERNAME + '_REJECTED':
      return {
        ...state,
        register: {
          ...state.register,
          checked:{
            ...state.register.checked,
            username: false
          }
        },
        requests: {
          ...state.requests,
          checkUserName: { ...rejected, error: payload }
        }
      };

    //NICK check
    case AUTH.CHECK_NICKNAME + "_PENDING":
      return {
        ...state,
        requests: {
          ...state.requests,
          checkNickName: { ...pending }
        }
      }
    case AUTH.CHECK_NICKNAME + '_FULFILLED':
      return {
        ...state,
        register: {
          ...state.register,
          checked:{
            ...state.register.checked,
            nickname: payload.data.possible
          }
        },
        requests: {
          ...state.requests,
          checkNickName: { ...fulfilled }
        }
      }
    case AUTH.CHECK_NICKNAME + '_REJECTED':
      return {
        ...state,
        register: {
          ...state.register,
          checked:{
            ...state.register.checked,
            nickname: false
          }
        },
        requests: {
          ...state.requests,
          checkNickName: { ...rejected, error: payload }
        }
      };

    //signup
    case AUTH.SIGNUP + "_PENDING":
      return {
        ...state,
        requests: {
          ...state.requests,
          signup: { ...pending }
        }
      }
    case AUTH.SIGNUP + '_FULFILLED':
      return {
        ...state,
        session: {
          ...state.session,
          logged: payload.data.result
        },
        requests: {
          ...state.requests,
          signup: { ...fulfilled }
        }
      }
    case AUTH.SIGNUP + '_REJECTED':
      return {
        ...state,
        register: {
          ...state.register,
          status:{
            ...state.register.status,
            error: true,
            message: "Instagram에 가입하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
          }
        },
        submitStatus: {
          ...submitStatus,
          signup: false
        },
        requests: {
          ...state.requests,
          signup: { ...rejected, error: payload }
        }
      };

    //signin
    case AUTH.SIGNIN + "_PENDING":
      return {
        ...state,
        submitStatus: {
            ...state.submitStatus,
            signin: true
        },
        requests: {
            ...state.requests,
            signin: { ...pending  }
        }
      }
    case AUTH.SIGNIN + '_FULFILLED':
      return {
        ...state,
        session: {
          ...state.session,
          user:{
            ...state.session.user,
            username: payload.data.username,
            name: payload.data.name,
            nickname: payload.data.nick,
            intro: payload.data.intro,
            profileimgname: payload.data.profileimgname,
            state: payload.data.state
          },
          logged: !payload.data?false:true
        },
        requests: {
          ...state.requests,
          signin: { fulfilled }
        }
      }
    case AUTH.SIGNIN + '_REJECTED':
      return {
        ...state,
        register: {
          ...state.login,
          status:{
            ...state.login.status,
            error: true,
            message: "Instagram에 로그인하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
          }
        },
        submitStatus: {
            ...state.submitStatus,
            signin: false
        },
        requests: {
          ...state.requests,
          signin: { ...rejected, error: payload }
        }
      };

  default:
    return state;
  }
}

export default auth;