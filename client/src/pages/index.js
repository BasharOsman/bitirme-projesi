import React, { Component } from 'react';
import PostList from '../components/PostList';
import ItemModal from '../components/itemModal';
import Slider from '../components/Slider';
import Sidebar from '../components/Sidebar';

import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';

import { Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Home extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Container>

                        <Row>
                            <Col lg="8">
                                <Slider />
                                <ItemModal />
                                <PostList />
                            </Col>
                            <Col lg="3">
                                <Sidebar />
                            </Col>
                        </Row>
                    </Container>

                </div>
            </Provider >
        );
    }
}

export default Home;
