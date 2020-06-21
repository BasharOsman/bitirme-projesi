import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ITEM, EDIT_ITEM } from '../actions/types';

const initialState = {
    items: [],
    loading: false,
    item: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };

        case GET_ITEM:
            return {
                ...state,
                item: state.items.find(item => item.slug === action.payload),

            };

        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };

        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };

        case EDIT_ITEM:
            return {
                ...state,
                items: state.items.map((item, i) => item._id === action.payload.id ? { ...item } : item) //<----ERROR 
            };

        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;

    }
}