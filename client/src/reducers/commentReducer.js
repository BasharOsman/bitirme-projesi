import { GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT, COMMENTS_LOADING, GET_COMMENT, EDIT_COMMENT } from '../actions/types';

const initialState = {
    loading: false,
    comment: [],
    comments: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loading: false
            };

        case GET_COMMENT:
            return {
                ...state,
                comment: state.comments.find(comment => comment._id === action.payload),

            };

        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload)
            };

        case ADD_COMMENT:
            return {
                ...state,
                comments: [action.payload, ...state.comments]
            };

        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment, i) => comment._id === action.payload.id ? { ...comment } : comment) //<----ERROR 
            };

        case COMMENTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;

    }
}