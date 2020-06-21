import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import propTypes from 'prop-types';


export class Logout extends Component {
    static propTypes = {
        logout: propTypes.func.isRequired
    }
    render() {
        return (
            <Fragment>
                <div onClick={this.props.logout}>Logout</div>
            </Fragment>
        )
    }
}

export default connect(null, { logout })(Logout);