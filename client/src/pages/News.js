import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle,
    CardBody, Container, Row, Col, CardDeck,
    Spinner
} from 'reactstrap';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getBlognewss } from '../actions/blognewsActions';
import propTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class News extends Component {
    constructor() {
        super();
        this.state = {

        };

    }

    componentDidMount() {
        this.props.getBlognewss();
    }

    static propTypes = {

        getBlognewss: propTypes.func.isRequired,
    }


    render() {

        const { blognews } = this.props
        const { newss, loading } = blognews
        return (
            <div >
                <Container>
                    <h3 className="text-center">NEWS</h3>
                    {loading ? <div className="d-flex justify-content-center" ><Spinner size="lg" color="secondary" /></div>
                        :
                        <Row>
                            <CardDeck>
                                {newss.map(({ img, title, news, slug }, index) => (
                                    <Col xs="4" className="mb-3" key={index}>
                                        < Card >
                                            <CardImg top width="318px" height="180px" src={img} alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle className="text-center">{title}</CardTitle>


                                                <Link to={`/news/${slug}`}><Button>Read</Button></Link>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </CardDeck>
                        </Row>
                    }



                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    blognews: state.blognews,
});

export default connect(mapStateToProps, { getBlognewss })(News);