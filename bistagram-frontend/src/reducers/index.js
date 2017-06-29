import { combineReducers } from 'redux';

import auth from './auth';
import post from './post';
import form from './form';
import ui from './ui';

const reducers = {
    auth,
    post,
    form,
    ui
}

export default combineReducers(reducers);
