import { GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT, COMMENTS_LOADING, GET_COMMENT, EDIT_COMMENT } from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

//get all comments
export const getComments = () => async dispatch => {
    dispatch(setCommentsLoading());
    await axios
        .get('/api/post/Comment')
        .then(res => dispatch({
            type: GET_COMMENTS,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//get single comment
export const getComment = (id) => (dispatch) => {
    axios
        .get(`/api/post/Comment/${id}`)
        .then(res =>
            dispatch({
                type: GET_COMMENT,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//delete İtem
export const deleteComment = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/post/Comment/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_COMMENT,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//add comment
export const addComment = (comment) => (dispatch, getState) => {
    axios
        .post('/api/post/Comment', comment, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//update comment
export const editComment = (id, comment) => (dispatch, getState) => {
    axios
        .put(`/api/post/Comment/${id}`, comment, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: EDIT_COMMENT,
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

export const setCommentsLoading = () => {
    return {
        type: COMMENTS_LOADING,
    };
};