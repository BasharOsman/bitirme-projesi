import { ADD_BLOGNEWS, GET_BLOGNEWSS, GET_BLOGNEWS, DELETE_BLOGNEWS, BLOGNEWS_LOADING, EDIT_BLOGNEWS } from '../actions/types';

const initialState = {
    newss: [],
    loading: false,
    news: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BLOGNEWSS:
            return {
                ...state,
                newss: action.payload,
                loading: false
            };

        case GET_BLOGNEWS:
            return {
                ...state,
                news: state.newss.find(news => news.slug === action.payload),

            };

        case DELETE_BLOGNEWS:
            return {
                ...state,
                newss: state.newss.filter(news => news._id !== action.payload)
            };

        case ADD_BLOGNEWS:
            return {
                ...state,
                newss: [action.payload, ...state.newss]
            };

        case EDIT_BLOGNEWS:
            return {
                ...state,
                newss: state.newss.map((news, i) => news._id === action.payload.id ? { ...news } : news) //<----ERROR 
            };

        case BLOGNEWS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;

    }
}