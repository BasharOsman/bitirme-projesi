import React from 'react';
import { Table, Button, FormGroup, Input } from 'reactstrap';

import { connect } from 'react-redux';
import { deleteBlognews } from '../actions/blognewsActions';
import NewsEditModal from '../components/NewsEditModal';

class NewsDataTable extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            filterInput: '',
            der: true
        };
    }
    onDeletClick = (id) => {
        this.props.deleteBlognews(id);
    }

    handleFilterChange = (e) => {
        this.setState({
            filterInput: e.target.value
        });
    };

    render() {
        const filtered = this.props.initialData.filter(
            value => {
                return value.title.toLowerCase().indexOf(this.state.filterInput.toLowerCase()) !== -1
                    || value.rigester_date.toLowerCase().indexOf(this.state.filterInput.toLowerCase()) !== -1;
            }
        );
        return (
            <React.Fragment>
                <FormGroup>
                    <Input
                        placeholder="Search"
                        onChange={this.handleFilterChange.bind(this)}
                        value={this.state.filterInput}
                    />
                </FormGroup>
                <Table className="order-table">

                    <thead>

                        <tr>
                            <th>#</th>
                            {this.props.columns.map(({ title }, index) =>
                                <th key={index} >{title}</th>
                            )}
                        </tr>

                    </thead>
                    <tbody>
                        {filtered.map((data, index) =>
                            <React.Fragment key={index}>
                                <tr >
                                    <th scope="row">{index}</th>
                                    <td>{data.title}</td>
                                    <td><img src={data.img} alt="none" width="200px" height="100px" /></td>
                                    <td>{new Date(data.date).toLocaleString()}</td>
                                    <td>
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeletClick.bind(this, data._id)}
                                        >&times;</Button></td>
                                    <td>
                                        <NewsEditModal img={data.img} date={data.date} title={data.title} id={data._id} body={data.news} />
                                    </td>
                                </tr>
                            </React.Fragment>
                        )}

                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { deleteBlognews })(NewsDataTable);