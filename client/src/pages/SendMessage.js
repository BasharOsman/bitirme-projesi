import React, { Component } from 'react'
import { Container, Button, Form, FormGroup, Label, Input, Row, Col, Table, Badge, Alert } from 'reactstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMessages, addMessage } from '../actions/messageActions';
import propTypes from 'prop-types';
const queryString = require('query-string');


class SendMessage extends Component {
    constructor() {
        super();
        this.state = {
            to: '',
            from: '',
            body: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        this.props.getMessages();
        this.setState({
            to: queryString.parse(this.props.location.search).to
        });
    }
    static propTypes = {
        addMessage: propTypes.func.isRequired,
        getMessages: propTypes.func.isRequired,
        Messages: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool,

        auth: propTypes.object.isRequired //<--------- add user proptypes
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.to === '' || this.state.title === '' || this.state.body === '') {
            this.setState({
                msg: 'all filled required',
                msgColor: 'danger'
            });
        } else {
            console.log(this.state)
            const newMessage = {
                from: this.props.auth.user.name,
                to: this.state.to,
                title: this.state.title,
                body: this.state.body ///<---------------------add values to database useing name in form
            }
            this.props.addMessage(newMessage);
            this.setState({
                msg: 'Your Message has send',
                msgColor: 'success',
                to: '',
                title: '',
                body: ''
            })
        }


    }

    render() {


        if (this.props.isAuthenticated) {
            if (this.props.auth.user.name !== this.props.match.params.name) {
                this.props.history.push('/')
            }
        }

        let MessagesFilter;
        if (this.props.Messages.Messages) {
            MessagesFilter = this.props.Messages.Messages.filter(Message => {
                return Message.to === this.props.match.params.name;
            })
        }

        const { body, title, to } = this.state
        return (
            <div>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        {this.state.msg ? <Alert color={this.state.msgColor}>{this.state.msg}</Alert> : null}
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="to">User Name</Label>
                                    <Input type="text" name="to" id="to" placeholder="user name" value={to} onChange={this.onChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="title">Subject</Label>
                            <Input type="text" name="title" id="Subject" placeholder="add a Subject " value={title} onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="body">Message</Label>
                            <Input type="textarea" name="body" id="message" style={{ resize: "none", height: "150px" }} value={body} onChange={this.onChange} />
                        </FormGroup>
                        <Button className="mb-3">Submit</Button>

                    </Form>
                    <Table>
                        <thead>
                            <tr>
                                <th >#</th>
                                <th>Title</th>
                                <th>from</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MessagesFilter ? MessagesFilter.length === 0 ? <tr >
                                <th colSpan="4">you didn't receive any Messages </th>
                            </tr>
                                : MessagesFilter.map(({ from, title, date, isnew, slug }, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i}</th>
                                        <td><Link to={`/user/${this.props.match.params.name}/message/${slug}`}><p>{title}</p></Link></td>
                                        <td><Link to={`/user/${from}`}><p>{from}</p></Link></td>
                                        <td><Moment format="YY-MM-DD HH:mm">{date}</Moment> {isnew ? <Badge color="success">new</Badge> : <Badge color="danger">read</Badge>}</td>
                                    </tr>
                                )) : <tr >
                                    <th colSpan="4">you didn't receive any Messages </th>
                                </tr>}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    Messages: state.Messages,
    isAuthenticated: state.auth.isAuthenticated,

    auth: state.auth //<--------- add user proptypes
});

export default connect(mapStateToProps, { getMessages, addMessage })(SendMessage);