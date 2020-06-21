import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import UserTable from '../components/userstable';
import NewsTable from '../components/NewsTable';
import NewsModal from '../components/NewsModal';
import Status from '../components/Status';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            ActiveTab: "1"
        };
    }

    render() {
        const activeTab = this.state.ActiveTab
        const toggle = (tab) => {
            if (activeTab !== tab) this.setState({ ActiveTab: tab });;
        }
        const tapStyle = {
            cursor: "pointer"
        }
        return (
            <Container>
                <div>
                    <Nav tabs style={tapStyle}>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}>
                                Site Status
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}>
                                News
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}>
                                Users
                        </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col xs="12">
                                    <div>
                                        <h3 className="mt-3" style={{ padding: '15px' }}>Status</h3>
                                    </div>
                                </Col>
                                <Col>
                                    <Status />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <div>
                                <Row>
                                    <Col xs="9">
                                        <h3 className="mt-3" style={{ padding: '15px' }}>News Table</h3>
                                    </Col>
                                    <Col xs="3">
                                        <NewsModal />
                                    </Col>
                                </Row>
                                <NewsTable />
                            </div>



                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <div>
                                        <h3 className="mt-3" style={{ padding: '15px' }}>User Table</h3>
                                    </div>
                                    <div>
                                        <UserTable />
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>

            </Container>
        );
    }
}

export default Dashboard;