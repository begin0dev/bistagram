import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import postfrm from './postfrm';
import follow from './follow';

const reducers = {
    auth, post, follow, postfrm
}

export default combineReducers(reducers);
