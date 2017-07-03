import { combineReducers } from 'redux';

import auth from './auth';
import post from './post';
import form from './form';
import search from './search';
import ui from './ui';

const reducers = {
    auth,
    post,
    form,
    search,
    ui
}

export default combineReducers(reducers);
