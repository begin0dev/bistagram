import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import follow from './follow';

const reducers = {
    auth, post, follow
}

export default combineReducers(reducers);
