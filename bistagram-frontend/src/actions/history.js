import HISTORY from './ActionTypes/history';
import * as service from '../services/history';

export const getHistory = (username) => ({
  type: HISTORY.GET_HISTORY,
  payload: {
    promise: service.getHistory()
  }
})
