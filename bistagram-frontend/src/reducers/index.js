import { combineReducers } from 'redux';

import auth from './auth';
import post from './post';
import form from './form';
import follow from './follow';
import ui from './ui';

const reducers = {
    auth,
    post,
    follow,
    form,
    ui
}

export default combineReducers(reducers);
