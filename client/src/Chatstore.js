import React from 'react';
import io from 'socket.io-client';

import { connect } from 'react-redux';
import propTypes from 'prop-types';

export const CTX = React.createContext();

const initState = {
    general: [

    ],
    JavaScript: [

    ],
    PHP: [

    ],
}

function reducer(state, action) {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                ]
            }
        default:
            return state;
    }
}



let socket;

function sendChatAction(value) {
    socket.emit('chat message', value)
}

function ChatStore(props) {
    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', (msg) => {
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg })
        });
    }

    if (props.auth.user) {
        const user = props.auth.user.name;
        return (
            <CTX.Provider value={{ allChats, sendChatAction, user }}>
                {props.children}
            </CTX.Provider>
        )
    } else {
        const user = 'user ' + Math.random(100).toFixed(2);
        return (
            <CTX.Provider value={{ allChats, sendChatAction, user }}>
                {props.children}
            </CTX.Provider>
        )
    }

}

ChatStore.prototype = {
    auth: propTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(ChatStore);