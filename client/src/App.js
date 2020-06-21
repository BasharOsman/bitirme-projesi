import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import ChatStore from './Chatstore';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter as Router,
} from "react-router-dom";


import Routes from './pages/Routes';



class App extends Component {


  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>

            <AppNavbar />
            <ChatStore>
              <Routes />
            </ChatStore>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
