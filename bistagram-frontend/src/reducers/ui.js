import UI from '../actions/ActionTypes/ui';


const initialState = {
  header: true,
  loading: true
}

function ui(state=initialState, action) {
  const payload = action.payload;
  switch (action.type) {

    case UI.SET_HEADER:
      return{
        ...state,
        header: payload
      }

    case UI.SET_LOADING:
      return{
        ...state,
        loading: payload
      }

    default:
      return state;
  }
}


export default ui;
