import HISTORY from '../actions/ActionTypes/history';

const request = {
  fetching: false,
  fetched: false,
  error: null
}

const initialState = {
  history:[

  ],
  requests: {
    getHistory: {
      ...request
    }
  }
}

const pending = {fetching: true, fetched: false, error: null};
const fulfilled = {fetching: false, fetched: true, error: null};
const rejected = {fetching: false, fetched: false}

function history(state=initialState, action) {
  const payload = action.payload;
  switch (action.type) {

    case HISTORY.GET_HISTORY + "_PENDING":
        return {
            ...state,
            requests: {
                ...state.requests,
                getHistory: { ...pending }
            }
        }
    case HISTORY.GET_HISTORY + "_FULFILLED":
        return {
            ...state,
            history:[
                ...payload.data
            ],
            requests: {
                ...state.requests,
                getHistory: { ...fulfilled }
            }
        }
    case HISTORY.GET_HISTORY + "_REJECTED":
        return {
            ...state,
            requests: {
                ...state.requests,
                getHistory: { ...rejected, error: payload }
            }
        }


    default:
      return state;
  }
}


export default history;
