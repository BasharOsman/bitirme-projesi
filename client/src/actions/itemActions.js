import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ITEM, EDIT_ITEM } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

//get all items
export const getItems = () => async (dispatch) => {
    dispatch(setItemsLoading());
    await axios
        .get('/api/items')
        .then(res => {
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
            return res.data;
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//get single item
export const getItem = (slug) => (dispatch) => {
    axios
        .get(`/api/items/${slug}`)
        .then(res =>
            dispatch({
                type: GET_ITEM,
                payload: slug
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//delete İtem
export const deleteItem = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//add item
export const addItem = (item) => (dispatch, getState) => {
    axios
        .post('/api/items', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//update item
export const editItem = (id, item) => (dispatch, getState) => {
    axios
        .put(`/api/items/${id}`, item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: EDIT_ITEM,
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

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING,
    };
};