import React, { Component } from 'react';
import DataTable from '../components/DataTable';

import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/usersActions';
import propTypes from 'prop-types';

import '../App.css';
var columns = [
    { title: 'Name', prop: 'name' },
    { title: 'Email', prop: 'email' },
    { title: 'Rigester date', prop: 'rigester_date' },
    { title: 'Role', prop: 'role' },

    { title: 'Delete', prop: 'Delete' },
];

class UserTable extends Component {

    componentDidMount() {
        this.props.getUsers();
    }

    static propTypes = {
        getUsers: propTypes.func.isRequired,
        users: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool,

        auth: propTypes.object.isRequired //<--------- add user proptypes
    }

    render() {
        const users = this.props.users.users;
        return (
            <DataTable
                keys="name"
                columns={columns}
                initialData={users}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
    isAuthenticated: state.auth.isAuthenticated,

    auth: state.auth //<--------- add user proptypes
});

export default connect(mapStateToProps, { getUsers, deleteUser })(UserTable);
