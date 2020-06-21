import { GET_USERS, USERS_LOADING, DELETE_USER, USER_UPDATED, GET_USER } from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const getUsers = () => dispatch => {
    dispatch(setUsersLoading());
    axios
        .get('/api/users')
        .then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteUser = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/users/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_USER,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
export const getUser = (id) => (dispatch, getState) => {
    axios
        .get(`/api/users/${id}`, tokenConfig(getState), )
        .then(res =>
            dispatch({
                type: GET_USER,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const editUser = (id) => (dispatch, getState) => {
    axios
        .post(`/api/users/${id}`, tokenConfig(getState), )
        .then(res =>
            dispatch({
                type: USER_UPDATED,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING,
    };
};