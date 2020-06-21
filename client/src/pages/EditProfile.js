import React, { Component } from 'react'
import {
    Container,
    Card,
    Button,
    Row,
    Col,
    Form, FormGroup, Label, Input, FormText

} from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { editProfile, getProfile, getProfiles } from '../actions/userProfileActions'
import moment from 'moment';
const FormData = require('form-data');
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            picture: '',
            profilePicture: '',
            degree: '',
            name: '',
            endDate: '',
            surName: '',
            startDate: '',
            studyDescription: '',
            studyField: '',
            university: '',
            description: '',
            skills: ''

        }

    }

    static propTypes = {
        isAuthenticated: propTypes.bool,
        editProfile: propTypes.func.isRequired,
        getProfile: propTypes.func.isRequired,
        getProfiles: propTypes.func.isRequired,
        auth: propTypes.object.isRequired
    }
    async componentDidMount() {
        await this.props.getProfiles();
        this.props.getProfile(this.props.match.params.name);
        this.get()
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

        });
        console.log('this.state', this.state)
    };
    onImageChange = (e) => {
        console.log('this.state', this.state)
        if (e.target.name === "picture") {
            this.setState({
                picture: e.target.files[0],
                avatar: URL.createObjectURL(e.target.files[0])
            });
        }
        if (e.target.name === "profilePicture") {
            this.setState({
                profilePicture: e.target.files[0],
                profileImg: URL.createObjectURL(e.target.files[0])
            });
        }
        console.log('this.state', this.state)
    };
    onSubmit = async (e) => {
        e.preventDefault();
        const {
            picture,
            profilePicture,
            degree,
            name,
            endDate,
            surName,
            startDate,
            studyDescription,
            studyField,
            university,
            description,
            skills } = this.state
        const { user } = this.props.auth;

        const form = new FormData();
        form.append('avatar', picture);
        form.append('profile', profilePicture);
        const photos = await axios
            .post('http://localhost:5000/api/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => res.data
            ).catch(err => console.log('err', err));

        const updateProfile = {
            username: user.name,
            userid: user._id,
            user: {
                name,
                surname: surName,
                description
            },
            img: {
                avatar: photos.avatar,
                profile: photos.profile
            },
            skills,
            education: {
                university,
                startDate,
                endDate,
                degree,
                field: studyField,
                description: studyDescription
            },
            email: user.email

        }

        this.props.editProfile(this.props.match.params.id, updateProfile);
        this.props.history.push(`/user/${this.props.match.params.name}`)

    }
    get = () => {
        if (this.props.profile.profile) {
            const { profile } = this.props.profile;
            if (profile.img) {
                console.log(profile)

                this.setState({
                    skills: profile.skills,
                    name: profile.user.name,
                    surName: profile.user.surname,
                    description: profile.user.description,
                    studyField: profile.education.field,
                    studyDescription: profile.education.description,
                    startDate: moment(profile.education.startDate).format("YYYY-MM-DD"),
                    endDate: moment(profile.education.endDate).format("YYYY-MM-DD"),
                    university: profile.education.university,
                    degree: profile.education.degree,
                    profilePicture: profile.img.profile,
                    picture: profile.img.avatar
                })
            }
        }
    }
    render() {
        const {
            degree,
            name,
            endDate,
            surName,
            startDate,
            studyDescription,
            studyField,
            university,
            description,
            skills,
            profileImg,
            avatar } = this.state
        return (
            <div>
                <Container >
                    <Row >
                        <Col lg="10">
                            <Card className="p-2">
                                <Container>
                                    <h3>Edit Your Profile</h3>
                                    <hr />
                                    <Form onSubmit={this.onSubmit} encType="multipart/form-data" >
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="profilePicture">Profile Picture</Label>
                                                    <Input type="file" name="profilePicture" id="ProfilePicture" accept="image/*" onChange={this.onImageChange} />
                                                    <FormText color="muted">
                                                        image 1080px x 150px
                                            </FormText>
                                                    {profileImg ? <img src={profileImg} style={{ width: "100px" }} alt="img" /> : null}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="picture">Your Picture</Label>
                                                    <Input type="file" name="picture" id=" Picture" accept="image/*" onChange={this.onImageChange} />
                                                    <FormText color="muted">
                                                        image 100px x 100px
                                                </FormText>
                                                    {avatar ? <img src={avatar} style={{ width: "100px" }} alt="img" /> : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="name">Name</Label>
                                                    <Input type="text" name="name" id="name" placeholder="Name placeholder" onChange={this.onChange} value={name} />
                                                </FormGroup>
                                            </Col>

                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="surName">SurName</Label>
                                                    <Input type="text" name="surName" id="surName" placeholder="SurName placeholder" onChange={this.onChange} value={surName} />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup>
                                            <Label for="description">Add Description</Label>
                                            <Input type="textarea" name="description" id="Description" onChange={this.onChange} value={description} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="skills">Add Skills:</Label>
                                            <FormText color="muted">
                                                css, javascript ....
                                                </FormText>
                                            <Input type="text" name="skills" id="skills" onChange={this.onChange} value={skills} />

                                        </FormGroup>
                                        <h4>Education</h4>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="university">university</Label>
                                                    <Input type="text" name="university" id="university" placeholder="university placeholder" onChange={this.onChange} value={university} />
                                                </FormGroup>
                                            </Col>

                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="startDate">start</Label>
                                                    <Input type="date" name="startDate" id="startDate" min="1960-01-01" onChange={this.onChange} value={startDate} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="endDate">End</Label>
                                                    <Input type="date" name="endDate" id="endDate" onChange={this.onChange} value={endDate} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="degree">Degree</Label>
                                                    <Input type="text" name="degree" id="degree" placeholder="Degree placeholder" onChange={this.onChange} value={degree} />
                                                </FormGroup>
                                            </Col>

                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="studyField">Field of study</Label>
                                                    <Input type="text" name="studyField" id="study" onChange={this.onChange} value={studyField} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label for="studyDescription">study Description</Label>
                                            <Input type="textarea" name="studyDescription" id="studyDescription" onChange={this.onChange} value={studyDescription} />
                                        </FormGroup>
                                        <Button>Submit</Button>
                                    </Form>
                                </ Container>
                            </Card>
                        </Col>
                    </Row>
                </ Container>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile,
    auth: state.auth //<--------- add user proptypes
});

export default connect(mapStateToProps, { editProfile, getProfile, getProfiles })(Profile);