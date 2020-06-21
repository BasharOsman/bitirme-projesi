import { GET_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, MESSAGES_LOADING, GET_MESSAGE, EDIT_MESSAGE } from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

//get all Messages
export const getMessages = () => dispatch => {
    dispatch(setMessagesLoading());
    axios
        .get('/api/usermessage')
        .then(res => dispatch({
            type: GET_MESSAGES,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//get single Message
export const getMessage = (slug) => (dispatch) => {
    axios
        .get(`/api/usermessage/${slug}`)
        .then(res =>
            dispatch({
                type: GET_MESSAGE,
                payload: slug
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//delete İtem
export const deleteMessage = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/usermessage/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_MESSAGE,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//add Message
export const addMessage = (Message) => (dispatch, getState) => {
    axios
        .post('/api/usermessage', Message, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_MESSAGE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
export const editMessage = (id, Message) => (dispatch, getState) => {
    axios
        .put(`/api/usermessage/${id}`, Message, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: EDIT_MESSAGE,
                payload: {
                    id,
                    data: res.data
                }
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
export const setMessagesLoading = () => {
    return {
        type: MESSAGES_LOADING,
    };
};