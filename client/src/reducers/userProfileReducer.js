import { GET_PROFILES, ADD_PROFILE, DELETE_PROFILE, PROFILE_LOADING, GET_PROFILE, EDIT_PROFILE } from '../actions/types';

const initialState = {
    loading: false,
    profile: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };

        case GET_PROFILE:
            return {
                ...state,
                profile: state.profiles.find(profile => profile.username === action.payload),

            };

        case DELETE_PROFILE:
            return {
                ...state,
                profiles: state.profiles.filter(profile => profile._id !== action.payload)
            };

        case ADD_PROFILE:
            return {
                ...state,
                profiles: [action.payload, ...state.profiles]
            };

        case EDIT_PROFILE:
            return {
                ...state,
                profiles: state.profiles.map((profile, i) => profile._id === action.payload.id ? { ...profile } : profile) //<----ERROR 
            };
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;

    }
}