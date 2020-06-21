import React, { Component } from 'react';
import NewsDataTable from '../components/NewsDataTable';

import { connect } from 'react-redux';
import { getBlognewss } from '../actions/blognewsActions';
import propTypes from 'prop-types';

import '../App.css';
var columns = [
    { title: 'Title', prop: 'title' },
    { title: 'Image', prop: 'image' },
    { title: 'Date', prop: 'date' },

    { title: 'Delete', prop: 'Delete' },
    { title: 'Update', prop: 'Update' },
];

class NewsTable extends Component {

    async  componentDidMount() {
        await this.props.getBlognewss();
    }

    static propTypes = {
        getBlognewss: propTypes.func.isRequired,
        blognews: propTypes.object.isRequired,
        isAuthenticated: propTypes.bool,

        auth: propTypes.object.isRequired //<--------- add user proptypes
    }

    render() {
        const news = this.props.blognews.newss;

        return (
            <NewsDataTable
                keys="name"
                columns={columns}
                initialData={news}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    blognews: state.blognews,
    isAuthenticated: state.auth.isAuthenticated,

    auth: state.auth //<--------- add user proptypes
});

export default connect(mapStateToProps, { getBlognewss })(NewsTable);
