import React, { Component } from 'react'
import { Media } from 'reactstrap';

import { getComments } from '../actions/commentActions';
import { getUser } from '../actions/usersActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
class Comments extends Component {
    state = {
    }

    componentDidMount() {
        this.props.getComments();
        //this.props.getUser(this.props)
    }

    static propTypes = {
        isAuthenticated: propTypes.bool,
        getComments: propTypes.func.isRequired,
        auth: propTypes.object.isRequired,
        getUser: propTypes.func.isRequired
    }

    render() {
        const imgstyle = {
            padding: "10px",
            margin: "10px",
            width: "64px"
        };
        const border = {
            border: "1px solid #d8d8d8",
            padding: "10px"
        }
        let commentFilter;
        if (this.props.comments.comments) {
            commentFilter = this.props.comments.comments.filter(comment => {
                return comment.postid === this.props.postid;
            })

        }
        console.log('commentFilter', commentFilter)
        return (
            <div style={border}>
                {commentFilter ? commentFilter.length === 0 ? <p>no comments be the first to add comment</p>
                    : commentFilter.map(({ body, author, date }, i) => (
                        <Media className="mb-3 border-bottom border-top p-3" key={i}>
                            <Media left top href="#" className="text-center">
                                <Media style={imgstyle} object src="http://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-4.jpg" alt="Generic placeholder image" />
                            </Media>
                            <Media body>
                                <Media heading>
                                    <p><Link to={`/user/${author}`}>{author} </Link> <span className="text-muted" style={{ fontSize: "10px" }} ><Moment format="MM/DD hh:mm a">{date}</Moment></span ></p>

                                </Media>
                                {body}
                            </Media>
                        </Media>
                    )
                    ) : <p>no comments be the first to add comment</p>}

            </div>
        )
    }
}
const mapStateToProps = state => ({
    comments: state.comments,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})
export default connect(mapStateToProps, { getComments, getUser })(Comments);