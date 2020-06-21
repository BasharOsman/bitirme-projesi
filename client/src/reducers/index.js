import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import MessageReducer from './messageReducer';
import userProfileReducer from './userProfileReducer';
import blognewsReducer from './blognewsReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    users: userReducer,
    comments: commentReducer,
    Messages: MessageReducer,
    profile: userProfileReducer,
    blognews: blognewsReducer

});