import React, { Component } from 'react'
import {
    FormGroup,
    Label,
    Input,
    Button,
    Form
} from 'reactstrap';

import { addComment } from '../actions/commentActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
class CommentForm extends Component {
    state = {
    }

    static propTypes = {
        isAuthenticated: propTypes.bool,
        auth: propTypes.object.isRequired
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.body === '') {
            this.setState({
                msg: 'all filled required'
            });
        } else {
            const newComment = {
                body: this.state.comment,
                author: this.props.auth.user.name,
                userid: this.props.auth.user._id,
                postid: this.props.postid
            }

            this.props.addComment(newComment);
            this.setState({
                body: ''
            });
        }
    }

    render() {
        const inputStyle = {
            resize: "none",
            height: "150px"
        }
        return (
            <div>
                <Form className="my-3" onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="exampleText">Add Comment</Label>
                        <Input style={inputStyle} type="textarea" name="comment" id="exampleText" onChange={this.onChange} value={this.state.body} />
                    </FormGroup>
                    <Button>Send new comment</Button>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})
export default connect(mapStateToProps, { addComment })(CommentForm);