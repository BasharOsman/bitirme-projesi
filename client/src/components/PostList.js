import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Media } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import propTypes from 'prop-types';
import EditModal from './editItemModal';

import Pagination from '../components/Pagination';


class PostList extends Component {

    //?--------- for pagination 
    constructor() {
        super();
        this.state = {
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    //?--------- for pagination 

    componentDidMount() {
        this.props.getItems();
    }
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    static propTypes = {
        getItems: propTypes.func.isRequired,
        item: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool,

        auth: propTypes.object.isRequired //<--------- add user proptypes
    }


    render() {
        const { items } = this.props.item; //<---------------user for pagination too
        const { user } = this.props.auth; //<--------- add user 
        return (

            < Container >

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {this.state.pageOfItems.map(({ _id, title, post, author, date, slug }) => (

                            <CSSTransition key={_id} timeout={2}>
                                <ListGroupItem>
                                    <Media>
                                        <Media body>
                                            <Media heading>
                                                {title}
                                            </Media>
                                            <Media className="float-right" >
                                                <small className="text-muted"> <Link to={`/user/${author}`}>{author} </Link> : {new Date(date).toDateString()}</small>
                                            </Media>
                                            <div> {post.slice(0, 40)}... <Link to={`/post/${slug}`}>readMore</Link></div>
                                        </Media>
                                        <div className="d-flex">
                                            <div className="ml-auto p-2">{this.props.isAuthenticated && (user.role === "admin" || user.name === author)
                                                ?
                                                <Button
                                                    className="remove-btn"
                                                    color="danger"
                                                    size="sm"
                                                    onClick={this.onDeleteClick.bind(this, _id)}
                                                >&times;</Button>
                                                : null}
                                                {this.props.isAuthenticated && (user.role === "admin" || user.name === author)
                                                    ?
                                                    <EditModal postId={_id} postTitle={title} postBody={post} postAuthor={author} postDate={date} />
                                                    : null}
                                            </div>

                                        </div>
                                    </Media>
                                </ListGroupItem>

                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
                <Pagination items={items} onChangePage={this.onChangePage} />

            </Container >

        )
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,

    auth: state.auth //<--------- add user proptypes
});

export default connect(mapStateToProps, { getItems, deleteItem })(PostList);