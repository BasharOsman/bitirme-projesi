import { GET_PROFILES, ADD_PROFILE, DELETE_PROFILE, PROFILE_LOADING, GET_PROFILE, EDIT_PROFILE } from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

//get all Profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfilesLoading());
    axios
        .get('/api/user/Profile')
        .then(res => dispatch({
            type: GET_PROFILES,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//get single Profile
export const getProfile = (id) => (dispatch) => {
    axios
        .get(`/api/user/profile/${id}`)
        .then(res =>

            dispatch({
                type: GET_PROFILE,
                payload: id
            })).then(() => { return true })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//delete Profile
export const deleteProfile = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/user/profile/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_PROFILE,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//add Profile
export const addProfile = (Profile) => (dispatch, getState) => {
    axios
        .post('/api/user/profile', Profile, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
export const editProfile = (id, Profile) => (dispatch, getState) => {
    axios
        .put(`/api/user/profile/${id}`, Profile, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: EDIT_PROFILE,
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
export const setProfilesLoading = () => {
    return {
        type: PROFILE_LOADING,
    };
};