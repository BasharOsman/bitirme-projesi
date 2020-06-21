import { GET_USERS, DELETE_USER, USERS_LOADING } from '../actions/types';

const initialState = {
    users: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };

        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(item => item._id !== action.payload)
            };

        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;

    }
}