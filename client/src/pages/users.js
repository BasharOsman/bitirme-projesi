import React, { Component } from 'react';
import { Container } from 'reactstrap';

import UserTable from '../components/userstable';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Userpage extends Component {
    render() {
        return (
            <Container>
                <div>
                    <h3>User page</h3>
                </div>
                <div>
                    <UserTable />
                </div>
            </Container>
        );
    }
}

export default Userpage;