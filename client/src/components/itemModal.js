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
import { addItem } from '../actions/itemActions';
import ModalBody from 'reactstrap/lib/ModalBody';
import propTypes from 'prop-types';


class ItemModal extends Component {
    state = {
        modal: false,
        title: '',
        post: '',
        author: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: propTypes.bool,

        auth: propTypes.object.isRequired
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
        } else {
            const newItem = {
                title: this.state.name,
                post: this.state.post,
                author: this.props.auth.user.name ///<---------------------add values to database useing name in form
            }
            //Add ıtem via addItem action
            this.props.addItem(newItem);

            //Close Modal
            this.toggle();
        }
    }

    render() {
        const { user } = this.props.auth;
        if (user) { }
        return (

            <div className="mt-3" style={{ padding: '15px' }} >
                {this.props.isAuthenticated ? <Button
                    color="dark"
                    onClick={this.toggle}
                >Add Post</Button> : <h4 className="mb-3 ml-4" > login to add ideas</h4>}


                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to PostList</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit} >
                            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                            <FormGroup>
                                <Label for="item">Title</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Title"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="item">Post</Label>
                                <Input
                                    type="textarea"
                                    name="post"
                                    id="post"
                                    placeholder="add post"
                                    style={{ height: "200px", resize: "none" }}
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Add Post</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})
export default connect(mapStateToProps, { addItem })(ItemModal);