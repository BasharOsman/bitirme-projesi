import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getUsers } from '../actions/usersActions';
import { getBlognewss } from '../actions/blognewsActions';
import { getComments } from '../actions/commentActions';
import { getMessages } from '../actions/messageActions';
import { getItems } from '../actions/itemActions';

import { Card, CardText, Col, Row, CardHeader } from 'reactstrap';
import CountUp from 'react-countup';

import propTypes from 'prop-types';

import '../App.css';
class Status extends Component {

    async  componentDidMount() {
        await this.props.getUsers();
        await this.props.getComments();
        await this.props.getMessages();
        await this.props.getBlognewss();
        await this.props.getItems();
    }

    static propTypes = {
        getUsers: propTypes.func.isRequired,
        users: propTypes.object.isRequired,
        getItems: propTypes.func.isRequired,
        item: propTypes.object.isRequired,
    }

    render() {
        const users = this.props.users.users;
        const news = this.props.blognews.newss;
        const comments = this.props.comments.comments;
        const messages = this.props.Messages.Messages;
        const items = this.props.item.items;
        console.log(this.props.Messages)
        if (this.props.item.loading || this.props.users.loading || this.props.blognews.loading || this.props.comments.loading || this.props.Messages.loading) {
            return <div>loading</div>
        }
        return (
            <React.Fragment>
                <Row>
                    <Col xs="4" className="mt-1">
                        <Card body className="text-center" outline color="success">
                            <CardHeader>Users Numbers</CardHeader>
                            <CardText className="text-primary"><CountUp start={0} end={users.length} duration={5} /></CardText>

                        </Card>
                    </Col>
                    <Col xs="4" className="mt-1">
                        <Card body className="text-center" outline color="success">
                            <CardHeader>Posts Numbers</CardHeader>
                            <CardText className="text-primary"><CountUp start={0} end={items.length} duration={5} /></CardText>

                        </Card>
                    </Col>
                    <Col xs="4" className="mt-1">
                        <Card body className="text-center" outline color="success">
                            <CardHeader>Comments Numbers</CardHeader>
                            <CardText className="text-primary"><CountUp start={0} end={comments.length} duration={5} /></CardText>

                        </Card>
                    </Col>
                    <Col xs="6" className="mt-3">
                        <Card body className="text-center" outline color="success">
                            <CardHeader>Messages Numbers</CardHeader>
                            <CardText className="text-primary"><CountUp start={0} end={messages.length} duration={5} /></CardText>

                        </Card>
                    </Col>
                    <Col xs="6" className="mt-3">
                        <Card body className="text-center" outline color="success">
                            <CardHeader>News Numbers</CardHeader>
                            <CardText className="text-primary"><CountUp start={0} end={news.length} duration={5} /></CardText>

                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
    blognews: state.blognews,
    comments: state.comments,
    Messages: state.Messages,
    item: state.item,

});

export default connect(mapStateToProps, { getUsers, getBlognewss, getComments, getMessages, getItems })(Status);
