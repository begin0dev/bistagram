import update from 'react/lib/update';
import FORM from '../actions/ActionTypes/form';

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

const post = {
  content: '',
  media: [],
  media_url: []
}

const search ={
  keyword:'',
  data: [],
  loading: false
}

const mypage = {
  name: '',
  nickname: '',
  website: '',
  intro: '',
  email: '',
  phone: '',
  gender: '',
  status: {
    change: false,
    loading: false,
    success: false,
    message: ''
  }
}

const password = {
  prepassword: '',
  changepassword: '',
  checkpassword: '',
  status: {
    loading: false,
    success: false,
    message: ''
  }
}

const submitStatus = {
  signup: false,
  signin: false,
  logged: false
}

const initialState = {
  register: {
    ...register
  },
  login: {
    ...login
  },
  post:{
    ...post
  },
  search:{
    ...search
  },
  mypage: {
    ...mypage
  },
  password: {
    ...password
  },
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
    profileUpdate: {
        ...request
    },
    passwordUpdate: {
        ...request
    }
  },
  submitStatus: { ...submitStatus }
}

const pending = {fetching: true, fetched: false, error: null};
const fulfilled = {fetching: false, fetched: true, error: null};
const rejected = {fetching: false, fetched: false}

function form(state=initialState, action) {
  const payload = action.payload;
  switch (action.type) {

    case FORM.POSTFORM_RESET:
      return{
        ...state,
        post: {
          ...post
        },
        password: {
          ...password
        }
      }

    case FORM.SET_POST_MEDIA_RESET:
      return{
        ...state,
        post: {
          ...state.post,
          media: [],
          media_url: []
        }
      }

    case FORM.SET_POST_MEDIA:
      return{
        ...state,
        post: {
          ...state.post,
          media: [
            ...state.post.media,
            payload.media
          ],
          media_url: [
            ...state.post.media_url,
            payload.media_url
          ]
        }
      }

    case FORM.MOVE_MEDIA:
      const { lastX, nextX } = payload;
      const dragmedia = state.post.media[lastX];
      const dragmedia_url = state.post.media_url[lastX];
      return update(state,{
        post: {
          media: {
            $splice: [
              [lastX, 1],
              [nextX, 0, dragmedia],
            ]
          },
          media_url: {
            $splice: [
              [lastX, 1],
              [nextX, 0, dragmedia_url],
            ]
          }
        }
      })

    case FORM.DELETE_MEDIA:
      return{
        ...state,
        post: {
          ...state.post,
          media: [
            ...state.post.media.slice(0, payload.index),
            ...state.post.media.slice((payload.index+1), state.post.media.length)
          ],
          media_url: [
            ...state.post.media_url.slice(0, payload.index),
            ...state.post.media_url.slice((payload.index+1), state.post.media_url.length)
          ]
        }
      }

    case FORM.CHANGE_FORMDATA:
      return {
        ...state,
        [payload.form]: {
          ...state[payload.form],
          [payload.name]: payload.value
        }
      }

    case FORM.SET_MYPAGE_FORM:
      return {
        ...state,
        mypage: {
          ...state.mypage,
          name: payload.name,
          nickname: payload.nickname,
          website: payload.website,
          intro: payload.intro,
          email: payload.email,
          phone: payload.phone,
          gender: payload.gender
        }
      }

    case FORM.CHANGE_MYPAGE_FORM:
      return {
        ...state,
        mypage: {
          ...state.mypage,
          [payload.name]: payload.value,
          status: {
            ...state.mypage.status,
            change: true
          }
        }
      }

    case FORM.PROFILE_UPDATE + "_PENDING":
      return {
        ...state,
        mypage: {
          ...state.mypage,
          status: {
            ...state.mypage.status,
            loading: true
          }
        },
        requests: {
            ...state.requests,
            profileUpdate: { ...pending }
        }
      }
    case FORM.PROFILE_UPDATE + '_FULFILLED':
      return {
        ...state,
        mypage: {
          ...state.mypage,
          status: {
            ...state.mypage.status,
            loading: false,
            success: payload.data.code===3?true:false,
            message: payload.data.message
          }
        },
        requests: {
            ...state.requests,
            profileUpdate: { ...pending }
        }
      }
    case FORM.PROFILE_UPDATE + '_REJECTED':
      return {
        ...state,
        mypage: {
          ...state.mypage,
          status: {
            ...state.mypage.status,
            loading: false,
            success: false,
            message: payload.response.data.message
          }
        },
        requests: {
          ...state.requests,
          profileUpdate: { ...rejected, error: payload }
        }
      };


    case FORM.PASSWORD_UPDATE + "_PENDING":
      return {
        ...state,
        password: {
          ...state.password,
          status: {
            ...state.password.status,
            loading: true
          }
        },
        requests: {
            ...state.requests,
            passwordUpdate: { ...pending }
        }
      }
    case FORM.PASSWORD_UPDATE + '_FULFILLED':
      return {
        ...state,
        password: {
          ...state.password,
          status: {
            ...state.password.status,
            loading: false,
            success: payload.data.code===3?true:false,
            message: payload.data.message
          }
        },
        requests: {
            ...state.requests,
            passwordUpdate: { ...pending }
        }
      }
    case FORM.PASSWORD_UPDATE + '_REJECTED':
      return {
        ...state,
        password: {
          ...state.password,
          status: {
            ...state.password.status,
            loading: false,
            success: false,
            message: payload.response.data.message
          }
        },
        requests: {
          ...state.requests,
          passwordUpdate: { ...rejected, error: payload }
        }
      };

    case FORM.SET_PROFILE_ERROR:
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name],
          status: {
            ...state[payload.name].status,
            loading: false,
            success: false,
            message: payload.message
          }
        }
      }

    case FORM.CHANGE_CHECK:
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

    case FORM.FORMDATA_RESET:
      return {
        ...state,
        register: {
          ...register
        },
        login: {
          ...login
        }
      }

    case FORM.SET_ERRORMESSAGE:
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

    case FORM.SET_SUBMIT_STATUS:
      return {
        ...state,
        submitStatus: {
          ...submitStatus,
          [payload.name]: payload.value
        }
      };

    //ID check
    case FORM.CHECK_USERNAME + "_PENDING":
      return {
        ...state,
        requests: {
            ...state.requests,
            checkUserName: { ...pending }
        }
      }
    case FORM.CHECK_USERNAME + '_FULFILLED':
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
    case FORM.CHECK_USERNAME + '_REJECTED':
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
    case FORM.CHECK_NICKNAME + "_PENDING":
      return {
        ...state,
        requests: {
          ...state.requests,
          checkNickName: { ...pending }
        }
      }
    case FORM.CHECK_NICKNAME + '_FULFILLED':
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
    case FORM.CHECK_NICKNAME + '_REJECTED':
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
    case FORM.SIGNUP + "_PENDING":
      return {
        ...state,
        submitStatus: {
          ...state.submitStatus,
          signup: true
        },
        requests: {
          ...state.requests,
          signup: { ...pending }
        }
      }
    case FORM.SIGNUP + '_FULFILLED':
      return {
        ...state,
        register: {
          ...state.register,
          status:{
            ...state.register.status,
            error: payload.data.code!==3?true:false,
            message: payload.data.msg
          }
        },
        submitStatus: {
          ...state.submitStatus,
          logged: payload.data.code!==3?false:true
        },
        requests: {
          ...state.requests,
          signup: { ...fulfilled }
        }
      }
    case FORM.SIGNUP + '_REJECTED':
      return {
        ...state,
        register: {
          ...state.register,
          status:{
            ...state.register.status,
            error: true,
            message: "Bistagram에 가입하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
          }
        },
        submitStatus: {
          ...state.submitStatus,
          signup: false
        },
        requests: {
          ...state.requests,
          signup: { ...rejected, error: payload }
        }
      };

    //signin
    case FORM.SIGNIN + "_PENDING":
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
    case FORM.SIGNIN + '_FULFILLED':
      return {
        ...state,
        submitStatus: {
          ...state.submitStatus,
          logged: payload.data.code!==3?false:true
        },
        login: {
          ...state.login,
          status:{
            ...state.login.status,
            error: payload.data.code!==3?true:false,
            message: payload.data.msg
          }
        },
        requests: {
          ...state.requests,
          signin: { fulfilled }
        }
      }
    case FORM.SIGNIN + '_REJECTED':
      return {
        ...state,
        login: {
          ...state.login,
          status:{
            ...state.login.status,
            error: true,
            message: "Bistagram에 로그인하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
          }
        },
        submitStatus: {
            ...state.submitStatus,
            signin: false,
            logged: payload
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


export default form;
