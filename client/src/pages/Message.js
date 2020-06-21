import React, { Component } from 'react'
import { Container, Button, Spinner } from 'reactstrap';

import Moment from 'react-moment';

import { connect } from 'react-redux';
import { getMessage, getMessages, editMessage } from '../actions/messageActions';
import propTypes from 'prop-types';



class SendMessage extends Component {
    constructor() {
        super();
        this.state = {

        };

    }

    componentDidMount() {
        this.props.getMessages();
        this.props.getMessage(this.props.match.params.slug);
        if (this.props.isAuthenticated) {
            if (this.props.auth.user.name !== this.props.match.params.name) {
                console.log('this.props.match.params.name', this.props.match.params.name)
            }
        }

    }

    static propTypes = {
        getMessage: propTypes.func.isRequired,
        getMessages: propTypes.func.isRequired,
        editMessage: propTypes.func.isRequired,
        Messages: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool,

        auth: propTypes.object.isRequired //<--------- add user proptypes
    }

    goBack = () => this.props.history.goBack()

    render() {
        if (this.props.Messages.Message.isnew === true) {
            const editMessage = {
                from: this.props.Messages.Message.from,
                to: this.props.Messages.Message.to,
                title: this.props.Messages.Message.title,
                body: this.props.Messages.Message.body,
                isnew: false
            }
            this.props.editMessage(this.props.Messages.Message._id, editMessage);
        }

        const { from, title, date, body, isnew } = this.props.Messages.Message;
        return (
            <div>
                <Container>
                    {from ?
                        <React.Fragment>
                            <h2>You reserved {isnew} Message from {from}</h2>
                            <h3>title: {title}</h3>
                            <h4>Message:</h4>
                            <p>{body}</p>
                            <Moment className="text-right" format="MM-DD hh:mm a">{date}</Moment>
                            <br />
                            <Button onClick={() => this.goBack()} className="mt-3">return</Button>
                        </React.Fragment>
                        : <Spinner size="lg" color="secondary" />
                    }

                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    Messages: state.Messages,
    Message: state.Message,
    isAuthenticated: state.auth.isAuthenticated,

    auth: state.auth //<--------- add user proptypes
});

export default connect(mapStateToProps, { getMessage, getMessages, editMessage })(SendMessage);