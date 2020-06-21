import { GET_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, MESSAGES_LOADING, GET_MESSAGE, EDIT_MESSAGE } from '../actions/types';

const initialState = {
    loading: false,
    Message: [],
    Messages: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                Messages: action.payload,
                loading: false
            };

        case GET_MESSAGE:
            return {
                ...state,
                Message: state.Messages.find(Message => Message.slug === action.payload),

            };

        case DELETE_MESSAGE:
            return {
                ...state,
                Messages: state.Messages.filter(Message => Message._id !== action.payload)
            };

        case ADD_MESSAGE:
            return {
                ...state,
                Messages: [action.payload, ...state.Messages]
            };

        case EDIT_MESSAGE:
            return {
                ...state,
                Messages: state.Messages.map((Message, i) => Message._id === action.payload.id ? { ...Message } : Message) //<----ERROR 
            };
        case MESSAGES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;

    }
}