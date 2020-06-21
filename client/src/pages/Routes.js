import React, { Component } from 'react';

import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import Home from './';
import Chat from './Chat';
import Contactus from './Contactus';
import UsersPage from './users';
import News from './News';
import BlogNewsPage from './BlogNewsPage';

import Dashboard from './adminDashboard';

import Post from './Post';
import Profile from './Profile';
import EditProfile from './EditProfile';

import SendMessage from './SendMessage';
import Message from './Message';
import Error404 from './404';

/* import ChatStore from '../Chatstore'; */
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={props => {
                return loggedIn ? <Comp {...props} /> : <Redirect to="/404" />;
            }}
        />
    );
};

class Routes extends Component {


    static propTypes = {
        auth: propTypes.object.isRequired
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;

        return (

            <Switch>
                <Route exact path="/" component={Home} />
                {/* <ChatStore> */}
                {/* <Route exact path="/Chat" component={Chat} /> */}
                <ProtectedRoute exact path="/Chat" loggedIn={isAuthenticated} component={Chat} />
                {/* </ChatStore> */}
                <Route exact path="/Contact" component={Contactus} />
                <Route exact path="/news" component={News} />
                <Route exact path="/news/:slug" component={BlogNewsPage} />
                <ProtectedRoute exact path="/Dashboard" loggedIn={isAuthenticated && user.role === "admin"} component={Dashboard} />
                <ProtectedRoute exact path="/Users" loggedIn={isAuthenticated && user.role === "admin"} component={UsersPage} />
                <Route exact path="/Post/:slug" component={Post} />
                <Route exact path="/user/:name" component={Profile} />
                <ProtectedRoute exact path="/user/:name/profile/edit/:id" loggedIn={isAuthenticated} component={EditProfile} />
                <ProtectedRoute exact path="/user/:name/message" loggedIn={isAuthenticated} component={SendMessage} />
                <ProtectedRoute exact path="/user/:name/message/:slug" loggedIn={isAuthenticated} component={Message} />
                <Route exact path="/404" component={Error404} />
                <Redirect to='404' />
            </Switch>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Routes);