import React, { Component } from 'react';
import { Container, Spinner, Col, Row } from 'reactstrap';
import CommentForm from '../components/CommentForm';
import Comments from '../components/CommentsBody';

import { connect } from 'react-redux';
import { getItem, getItems } from '../actions/itemActions';
import propTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Moment from 'react-moment';

class Post extends Component {

    constructor() {
        super();
        this.state = {
        };
    }
    static propTypes = {
        getItems: propTypes.func.isRequired,
        isAuthenticated: propTypes.bool,
        getItem: propTypes.func.isRequired,
        item: propTypes.object.isRequired,
        auth: propTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getItems();
        this.props.getItem(this.props.match.params.slug)
    }
    render() {
        console.log('this.props', this.props)
        const { title, post, author, date, _id } = this.props.item.item;
        const { isAuthenticated } = this.props.auth
        const poststyle = {
            fontSize: "1.25rem",
            lineHeight: "1.8",
            margin: "10px"
        }
        return (
            <Container>
                {post ?
                    <Row >
                        <Col xs="12" sm="12" lg="8">
                            <div className="text-left">
                                <div>
                                    <h3>{title} </h3>
                                    {author} : <Moment format="MM/DD hh:mm a" className="text-muted" style={{ fontSize: "14px" }}>{date}</Moment>
                                </div>
                                <div className="text-center" style={poststyle}>
                                    {post}
                                </div>
                            </div>
                            <hr />
                            <div className="comments">
                                <h3>Comments</h3>
                                <hr />
                                <div className="commentsBody">
                                    {isAuthenticated ? <CommentForm postid={_id} /> : <h3>you need to login to add comment</h3>}
                                </div>
                                <div className="commentsBody">
                                    <Comments postid={_id} />
                                </div>
                            </div>
                        </Col>
                        <Col xs="4"></Col>
                    </Row>
                    : <div className="d-flex justify-content-center" > <Spinner size="lg" color="secondary" /></div>
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})
export default connect(mapStateToProps, { getItem, getItems })(Post);