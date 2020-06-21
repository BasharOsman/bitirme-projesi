import React, { Component, Fragment, } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    DropdownItem

} from 'reactstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types';



import Container from 'reactstrap/lib/Container';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal'
import Logout from './auth/logout';

import { Link } from 'react-router-dom';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        auth: propTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }



    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>

                <NavItem>
                    <Link to="/Contact" className="nav-link">Contact</Link>
                </NavItem>
                <NavItem>
                    <Link to="/news" className="nav-link">News</Link>
                </NavItem>
                <NavItem>
                    <Link to="/chat" className="nav-link">Chat</Link>
                </NavItem>
                <NavItem>
                    <div className="dropdown ml-1">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="">

                                <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                            </span>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {user && user.role === "admin" ?
                                <span>
                                    <Link to="/Dashboard" className="dropdown-item">Dashboard</Link>
                                    <div className="dropdown-divider"></div>
                                </span>
                                : null}

                            {user ? <Link to={`/user/${user.name}`} className="dropdown-item">My Profile</Link> : null}
                            <DropdownItem divider />
                            <button className="dropdown-item" ><Logout /></button>

                        </div>
                    </div>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>

                <NavItem>
                    <Link to="/Contact" className="nav-link">Contactus</Link>
                </NavItem>
                <NavItem>
                    <Link to="/news" className="nav-link">News</Link>
                </NavItem>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-4">
                    <Container>
                        <NavbarBrand href="/">Simple blog</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}

                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);