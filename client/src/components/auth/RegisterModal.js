import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';

import ModalBody from 'reactstrap/lib/ModalBody';
import propTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { addProfile } from '../../actions/userProfileActions'

import Recaptcha from 'react-recaptcha';
let recaptchaInstance;

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null,

        isVerified: false
    };

    static propTypes = {
        isAuthenticated: propTypes.bool,
        addProfile: propTypes.func.isRequired,
        error: propTypes.object.isRequired,
        register: propTypes.func.isRequired,
        clearErrors: propTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // if isAuthenticated close the modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // captcha functions
    recaptchaLoaded() {
        console.log.bind(this, "recaptcha loaded")
    };

    verifyCallback(res) {
        if (res) {
            this.setState({
                isVerified: true
            });
        }
    }
    // create a reset function
    resetRecaptcha() {
        recaptchaInstance.reset();
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.resetRecaptcha();
        const { isVerified, name, email, password, repass } = this.state
        if (isVerified) {
            if (password !== repass) {
                this.setState({
                    msg: "password and rePassword should be equal"
                });
            } else {
                //Create user object
                const newUser = {
                    name,
                    email,
                    password
                }
                const newProfile = {
                    username: name,
                    email
                }
                this.props.addProfile(newProfile)
                //Attempt to register
                this.props.register(newUser);
            }
        } else {
            this.setState({
                msg: "Please verify that you are a human."
            });
        }

    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit} >
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for="repass">Re Password</Label>
                                <Input
                                    type="password"
                                    name="repass"
                                    id="repass"
                                    placeholder="repeat password"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Recaptcha
                                    ref={e => recaptchaInstance = e}
                                    elementID="registerRecaptcha"
                                    sitekey="6LcemsoUAAAAAEYE683VokgWoiR4OxC9nEz_TNhh"
                                    render="explicit"
                                    theme="dark"
                                    onloadCallback={this.recaptchaLoaded.bind(this)}
                                    verifyCallback={this.verifyCallback.bind(this)}
                                />
                                <Button color="dark" style={{ marginTop: '2rem' }} block>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(mapStateToProps, { register, clearErrors, addProfile })(RegisterModal);