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
import { editBlognews } from '../actions/blognewsActions';
import ModalBody from 'reactstrap/lib/ModalBody';
import propTypes from 'prop-types';
import axios from 'axios';

class NewsEditModal extends Component {
    state = {
        modal: false,
        title: this.props.title,
        news: this.props.body,
        img: '',
        msg: null,
        image: "",
        imageDisplay: ""
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
    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.title === '' || this.state.news === '' || this.state.image === '') {

            this.setState({
                msg: 'all filled required'
            });
        } else {
            const form = new FormData();
            form.append('newsImage', this.state.image);
            const photo = await axios
                .post('http://localhost:5000/api/newsUpload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(res => res.data
                ).catch(err => console.log('err', err));

            const newItem = {
                title: this.state.title,
                news: this.state.news,
                img: photo.newsImage
            }
            console.log('newItem', newItem)

            this.props.editBlognews(this.props.id, newItem);

            //Close Modal
            this.toggle();
        }
        console.log('this.state', this.state)
    }

    onImageChange = (e) => {
        this.setState({
            image: e.target.files[0],
            imageDisplay: URL.createObjectURL(e.target.files[0])
        });
    };
    render() {
        const { title, news } = this.state
        return (

            <div >
                {this.props.isAuthenticated ? <Button
                    color="dark"
                    size="sm"
                    onClick={this.toggle}
                ><i className="far fa-edit"></i></Button> : <h4 className="mb-3 ml-4" > login to add news</h4>}


                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit News</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                            <FormGroup>
                                <Label for="image">Image</Label>
                                <Input
                                    type="file"
                                    name="Image"
                                    id="item"

                                    placeholder="Title"
                                    onChange={this.onImageChange}
                                />
                            </FormGroup>
                            {this.state.imageDisplay ?
                                <FormGroup>
                                    <img src={this.state.imageDisplay} alt="none" width="100%" height="100" />
                                </FormGroup> : <img src={this.props.img} alt="none" width="100%" height="100" />}
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="item"
                                    value={title}
                                    placeholder="Title"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="News">News</Label>
                                <Input
                                    type="textarea"
                                    name="news"
                                    id="news"
                                    value={news}
                                    placeholder="add News"
                                    style={{ height: "200px", resize: "none" }}
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Update</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})
export default connect(mapStateToProps, { editBlognews })(NewsEditModal);