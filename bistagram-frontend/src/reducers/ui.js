import UI from '../actions/ActionTypes/ui';

const loading = {
  main: false,
  explore: false,
  history: false
}

const initialState = {
  header: true,
  loading: {
    ...loading
  }
}

function ui(state=initialState, action) {
  const payload = action.payload;
  switch (action.type) {

    case UI.SET_HEADER:
      return{
        ...state,
        header: payload
      }

    case UI.SET_LOADING_INITIAL:
      return{
        ...state,
        loading: {
          ...loading
        }
      }

    case UI.SET_LOADING:
      return{
        ...state,
        loading: {
          ...state.loading,
          [payload.name]: payload.value
        }
      }

    default:
      return state;
  }
}


export default ui;
