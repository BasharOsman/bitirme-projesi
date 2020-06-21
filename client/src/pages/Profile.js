import React, { Component } from 'react'
import {
    Container,
    Card,
    CardText,
    CardBody,
    CardTitle,
    Button,
    Row,
    Col,
    CardGroup,
    CardSubtitle,
    ListGroup,
    ListGroupItem,
    Tooltip
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getProfile, getProfiles, } from '../actions/userProfileActions';
import { getItems, deleteItem } from '../actions/itemActions';

import Moment from 'react-moment';
import { Spinner } from 'reactstrap'
import EditModal from '../components/editItemModal';

import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            tooltip: false
        };

    }
    componentDidMount() {
        this.props.getProfiles();
        this.props.getItems();
        this.props.getProfile(this.props.match.params.name);
    }

    toggle = () => {
        this.setState(
            { tooltip: !this.state.tooltip }
        );
    }
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }
    static propTypes = {
        getProfile: propTypes.func.isRequired,
        getProfiles: propTypes.func.isRequired,
        deleteItem: propTypes.func.isRequired,
        getItems: propTypes.func.isRequired,
        isAuthenticated: propTypes.bool,

        auth: propTypes.object.isRequired
    }
    render() {
        if (this.props.profile.loading) {
            return <div className="d-flex justify-content-center mt-5"> <Spinner size="lg" color="secondary" /></div>

        }
        if (!this.props.profile.profile) {
            return <span>user has been removed</span>
        }
        const { isAuthenticated, auth, item } = this.props;
        const { items } = item
        let filteredItems;
        if (items) {
            filteredItems = items.filter(item => { return item.author === this.props.match.params.name })
        }
        const { username, user, img, skills, education, date, _id } = this.props.profile.profile;
        const avatarStyle = {
            height: "100px",
            width: "100px",
            margin: "auto",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#F1F1F1",
            border: " 3px solid #FFFFFF",
            borderRadius: "100%",
            boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
            position: "absolute",
            top: "100px",
            left: "70px",
            overflow: "hidden",
        }
        let imgStyle;
        if (img) {
            imgStyle = {
                backgroundImage: `url(${"/" + img.profile})`,
                backgroundSize: "cover",
                width: "100%",
                height: "150px",
                marginBottom: "25px",
            }
        } else {
            imgStyle = {
                backgroundImage: `url(http://picsum.photos/1000/150.jpg)`,
                backgroundSize: "cover",
                width: "100%",
                height: "150px",
                marginBottom: "25px",
            }
        }
        return (

            <div>
                <Container >
                    <Row>
                        <Col lg="10">
                            <Card>
                                <div style={imgStyle} alt="Card image cap" />
                                <div style={avatarStyle}>{img ? <img src={"/" + img.avatar} width="100" height="100" alt="" /> : <img src="http://picsum.photos/150/150.jpg" width="100" height="100" alt="" />}</div>
                                <Row className=" align-items-center mt-4">
                                    <Col lg="1" ></Col>
                                    <Col lg="8" >{user ? <span>{user.name} {user.surname}</span> : <span>{username}</span>} <i className="fas fa-info-circle text-primary" id="Tooltip"></i>

                                        <Tooltip placement="right" isOpen={this.state.tooltip} target="Tooltip" toggle={this.toggle}>
                                            register at: <Moment format="YYYY/MM/DD">{date}</Moment>
                                        </Tooltip>
                                    </Col>
                                    <Col lg="2" className="mr-3">
                                        {isAuthenticated && auth.user.name !== this.props.match.params.name ? <Link to={`/user/${auth.user.name}/message?to=${this.props.match.params.name}`}><Button color="primary">Send Message</Button></Link>
                                            : auth.user ? <Link to={`/user/${auth.user.name}/message`}><Button color="primary">MY Messages</Button></Link> : null}
                                    </Col>

                                </Row>

                                <CardBody className="">
                                    <Container>
                                        <CardSubtitle><strong>user description</strong></CardSubtitle>
                                        <CardText>{user && user.description}</CardText>
                                        <hr />
                                        {skills ?
                                            <div className="text-center">
                                                <h3>Skill Set</h3>
                                                <div className="skilles">
                                                    {skills.split(", ").map((skill, key) => (
                                                        <span className="p-1" key={key}>
                                                            <i className="fas fa-check"></i> {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div> : <span>user didn't add skills yet</span>
                                        }

                                        <hr />
                                    </ Container>
                                </CardBody>
                                {education && education.degree ?
                                    <CardGroup className="rounded-0">
                                        <Card body className="rounded-0">
                                            <CardTitle><h2>Education</h2></CardTitle>

                                            <div>
                                                <h4>{education.university}</h4>

                                                <CardText><Moment format="MMM Do YYYY">{education.startDate}</Moment> - <Moment format="MMM Do YYYY">{education.endDate}</Moment></CardText>
                                                <CardText>
                                                    <strong>Degree:   </strong> {education.degree}

                                                </CardText>
                                                <CardText>
                                                    <strong>Field of studey: </strong> {education.field}</CardText>
                                                <CardText>
                                                    <strong>Description: </strong>
                                                    {education.description}</CardText>
                                            </div>

                                        </Card>
                                    </CardGroup> : <span className="m-5">user didn't add Education yet</span>
                                }

                            </Card>
                            <div className="my-3">
                                {auth.user ? <Link to={`/user/${auth.user.name}/profile/edit/${_id}`}> <Button block className="p-3">Edit Profile</Button></Link> : null}


                            </div>
                            <div className="mb-5">
                                <h1>Posts</h1>

                                <ListGroup>
                                    {filteredItems.length !== 0 ? filteredItems.map(({ _id, title, slug, author, post, date }, key) => (
                                        <ListGroupItem key={key}>
                                            <div className="media">
                                                <div className="media-body">
                                                    <h4 className="media-heading"><a href={"/post/" + slug} className="text-reset">{title}</a></h4>
                                                </div>
                                                {auth.user && (auth.user.role === "admin" || auth.user.name === author) ?
                                                    <div className="d-flex">
                                                        <div className="ml-auto p-2">
                                                            <Button
                                                                className="remove-btn d-inline"
                                                                color="danger"
                                                                size="sm"
                                                                onClick={this.onDeleteClick.bind(this, _id)}
                                                            >&times;</Button>
                                                            <EditModal postId={_id} postTitle={title} postBody={post} postAuthor={author} postDate={date} className="d-inline" />
                                                        </div>
                                                    </div> : null}
                                            </div>
                                        </ListGroupItem>
                                    )) : <div className="text-center">user didn't add any post's</div>}
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                </ Container>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    item: state.item,
    profile: state.profile,
    auth: state.auth //<--------- add user proptypes
});

export default connect(mapStateToProps, { getProfile, getProfiles, getItems, deleteItem })(Profile);