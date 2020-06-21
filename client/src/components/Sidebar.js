import React, { Component } from 'react';
import {
    Card,
    CardText
} from 'reactstrap';
import { Link } from 'react-router-dom';
//import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { getComments } from '../actions/commentActions';

class Sidebar extends Component {
    async  componentDidMount() {
        await this.props.getComments();
        await this.props.getItems();

    }

    render() {
        if (this.props.items.loading || this.props.comments.loading) {
            return <span>loading</span>
        }
        let comment;
        let item;
        if (this.props.comments.comments) {
            comment = this.props.comments.comments.slice(0, 3)
        }
        if (this.props.items.items) {
            const random = Math.floor(Math.random() * (this.props.items.items.length - 1));
            item = this.props.items.items[random];
        }
        return (
            <div>
                <Card body className="" style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <h4>Random Post</h4>
                    <hr />
                    {item ?
                        <React.Fragment>
                            <span>title: <Link to={`/post/${item.slug}`} style={{ display: "inline" }} >{item.title}</Link></span>
                            <small> by: <Link to={`/user/${item.author}`}>{item.author}</Link> </small>
                            <CardText> {item.post.slice(0, 20)}... </CardText>
                            <Link to={`/post/${item.slug}`} style={{ display: "inline" }} >read more</Link>
                        </React.Fragment>
                        : null
                    }
                </Card>
                <Card body className="">
                    <h4>Latest comments</h4>
                    <hr />
                    {comment && comment.map((comment, i) => (
                        <React.Fragment key={i}>
                            <h5> by: <Link to={`/user/${comment.author}`}>{comment.author}</Link> </h5>
                            <CardText> {comment.body} </CardText>
                            {/* <Link to={`/user/${comment.author}`}><Button>Go somewhere</Button></Link> */}
                            <hr />
                        </React.Fragment>
                    ))
                    }
                </Card>
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
    items: state.item,
    comments: state.comments,
});

export default connect(mapStateToProps, { getItems, getComments })(Sidebar);