import { combineReducers } from 'redux';

import auth from './auth';
import post from './post';
import form from './form';
import follow from './follow';
import history from './history';
import ui from './ui';

const reducers = {
    auth, post, follow, form, ui, history
}

export default combineReducers(reducers);
