import React, { Component } from 'react';
import { Container, Spinner, Col, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { getBlognewss, getBlognews } from '../actions/blognewsActions';
import propTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Moment from 'react-moment';

class BlogNewsPage extends Component {

    constructor() {
        super();
        this.state = {
        };
    }
    static propTypes = {
        getBlognewss: propTypes.func.isRequired,
        isAuthenticated: propTypes.bool,
        getBlognews: propTypes.func.isRequired,
        auth: propTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getBlognewss();
        this.props.getBlognews(this.props.match.params.slug)
    }
    render() {
        const { title, news, date, img } = this.props.blognews.news;
        const poststyle = {
            fontSize: "1.25rem",
            lineHeight: "1.8",
            margin: "10px",
        }
        const text = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            zIndex: 2,
            color: "white",
            textAlign: "center"
        }
        const overlay = {
            position: "absolute",
            width: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            color: "#f1f1f1",
            height: "300px",
            zIndex: 1
        }
        const imgStyle = {
            display: "block",
            width: "100%",
            height: "300px",
            zIndex: 0
        }
        return (
            <Container>
                {news ?
                    <Row >
                        <div style={{ position: "relative", width: "100%", }}>
                            <div style={overlay}></div>
                            <h3 style={text}>{title} </h3>
                            <img src={"/" + img} alt="none" width="100%" height="500" style={imgStyle} />
                        </div>
                        <Col xs="2"></Col>
                        <Col xs="12" sm="12" lg="8">
                            <div className="text-center">
                                <div>
                                    admin : <Moment format="MM/DD hh:mm a" className="text-muted" style={{ fontSize: "14px" }}>{date}</Moment>
                                </div>
                                <div className="text-center" style={poststyle}>
                                    {news}
                                </div>
                            </div>
                            <hr />
                        </Col>
                        <Col xs="2"></Col>
                    </Row>
                    : <div className="d-flex justify-content-center" > <Spinner size="lg" color="secondary" /></div>
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    blognews: state.blognews,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})
export default connect(mapStateToProps, { getBlognews, getBlognewss })(BlogNewsPage);