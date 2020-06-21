import { ADD_BLOGNEWS, GET_BLOGNEWSS, GET_BLOGNEWS, DELETE_BLOGNEWS, BLOGNEWS_LOADING, EDIT_BLOGNEWS } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getBlognewss = () => async (dispatch) => {
    dispatch(setBlognewssLoading());
    await axios
        .get('/api/news')
        .then(res => {
            dispatch({
                type: GET_BLOGNEWSS,
                payload: res.data
            })
            return res.data;
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const getBlognews = (slug) => (dispatch) => {
    axios
        .get(`/api/news/${slug}`)
        .then(res =>
            dispatch({
                type: GET_BLOGNEWS,
                payload: slug
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const deleteBlognews = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/news/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_BLOGNEWS,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const addBlognews = (news) => (dispatch, getState) => {
    axios
        .post('/api/news', news, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_BLOGNEWS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const editBlognews = (id, news) => (dispatch, getState) => {
    axios
        .put(`/api/news/${id}`, news, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: EDIT_BLOGNEWS,
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

export const setBlognewssLoading = () => {
    return {
        type: BLOGNEWS_LOADING,
    };
};