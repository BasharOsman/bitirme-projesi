import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { getItem, editItem } from '../actions/itemActions';
import ModalBody from 'reactstrap/lib/ModalBody';
import propTypes from 'prop-types';

class Updatepost extends Component {
    state = {
        modal: false,
        title: this.props.postTitle,
        post: this.props.postBody,
        author: this.props.postAuthor,
        date: this.props.postDate,
        msg: null
    }

    static propTypes = {
        isAuthenticated: propTypes.bool,
        getItem: propTypes.func.isRequired,
        item: propTypes.object.isRequired,
        auth: propTypes.object.isRequired
    }
    componentDidMount() {
        /* this.setState({
            title: this.props.postTitle,
            post: this.props.postBody,
            author: this.props.postAuthor,
        }); */
    }
    onClick = async () => {
        /* console.log(this.props.getItem(this.props.postId))
        console.log(this.props) */
        /* console.log(this.props.postId)
        console.log(this.props.postTitle)
        console.log(this.props.postBody)
        console.log(this.props.postAuthor) */
        this.toggle();
    }
    toggle = () => {

        this.setState({
            msg: null
        });
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.post === '') {
            this.setState({
                msg: 'all filled required'
            });
            // console.log(this.props.postId)
        } else {
            const neweditItem = {
                title: this.state.title,
                post: this.state.post,
                author: this.state.author,
                date: this.state.date
            }
            //Add ıtem via addItem action
            this.props.editItem(this.props.postId, neweditItem);

            //Close Modal
            this.toggle();
        }
    }

    render() {
        const { user } = this.props.auth;
        const { title, post } = this.state;
        if (user) { }
        return (

            < React.Fragment >
                {
                    this.props.isAuthenticated ? <Button
                        color="dark"
                        className="btn-sm "
                        style={{ marginBottom: '0rem' }}
                        onClick={this.onClick}
                    ><i className="far fa-edit"></i></Button> : null
                }


                < Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit Post</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit} >
                            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="edititem"
                                    value={title}
                                    placeholder="Edit Title"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="post">Post</Label>
                                <Input
                                    type="textarea"
                                    name="post"
                                    id="editpost"
                                    value={post}
                                    placeholder="edit post"
                                    style={{ height: "100px", resize: "none" }}
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Update Post</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal >
            </React.Fragment >
        )
    }
}
const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})
export default connect(mapStateToProps, { getItem, editItem })(Updatepost);