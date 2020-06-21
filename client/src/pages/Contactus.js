
import React from 'react';
import axios from 'axios';
import Recaptcha from 'react-recaptcha';

import { Row, Col, Container, Alert } from 'reactstrap';

let recaptchaInstance;

class Cont extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            msg: null,
            color: '',
            isVerified: false
        }
    }

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

    handleSubmit(e) {
        e.preventDefault();
        this.resetRecaptcha();
        if (this.state.isVerified) {
            if (this.state.name === '' || this.state.email === '' || this.state.message === '') {
                this.setState({
                    msg: "all field required.",
                    color: "danger",
                });
            } else {
                axios({
                    method: "POST",
                    url: "/send",
                    data: this.state
                }).then((res) => {
                    this.resetForm();

                    if (res.data.status === "success") {

                        this.setState({
                            msg: "Message Sent.",
                            color: "success",
                            isVerified: false
                        });
                    } else if (res.data.status === "fail") {

                        this.setState({
                            msg: "some thing wrong sorry.",
                            color: "danger"
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        } else {
            this.setState({
                msg: "Please verify that you are a human.",
                color: "danger"
            });
        }
    }

    resetForm() {
        this.setState({ name: '', email: '', message: '' })
    }

    render() {



        return (
            <Container>
                <Row>
                    <Col xs="7">
                        <div className="App">
                            {this.state.msg ? <Alert color={this.state.color}>{this.state.msg}</Alert> : null}
                            <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST" action="/send">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                                </div>
                                <Recaptcha
                                    ref={e => recaptchaInstance = e}
                                    sitekey="6LcemsoUAAAAAEYE683VokgWoiR4OxC9nEz_TNhh"
                                    render="explicit"
                                    theme="dark"
                                    elementID="contactusRecaptcha"
                                    onloadCallback={this.recaptchaLoaded.bind(this)}
                                    verifyCallback={this.verifyCallback.bind(this)}
                                />
                                <button type="submit" className="btn btn-primary btn-block mt-2">Send</button>
                            </form>
                        </div>
                    </Col>
                    <Col xs="4">
                        <div className="mt-3 border-left p-2  border-primary">
                            <p>email: test@test.com </p>
                            <p>phone: 055512345678</p>
                            <p>location: </p>
                            <p>Cecilia Chapman</p>
                            <p>711-2880 Nulla St.</p>
                            <p>Mankato Mississippi 96522 </p>
                        </div>
                    </Col>
                </Row>
            </Container>

        );
    }

    onNameChange(event) {
        this.setState({ name: event.target.value })
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    onMessageChange(event) {
        this.setState({ message: event.target.value })
    }
}

export default Cont;