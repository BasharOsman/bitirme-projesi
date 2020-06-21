import React from 'react';
import { Table, Button, FormGroup, Input } from 'reactstrap';

import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/usersActions';


class DataTable extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            filterInput: '',
            der: true,
            sortdata: null
        };
    }
    onDeletClick = (id) => {
        this.props.deleteUser(id);
    }

    handleFilterChange = (e) => {
        this.setState({
            filterInput: e.target.value
        });
    };
    //<------------------------------------- sort function need work "the setState don't work"
    sort = (datatype, objkey) => {
        console.log(datatype + " " + objkey)
        switch (datatype) {
            case 'num':
                const numData = [...this.props.initialData].sort((a, b) => { return b[objkey] - a[objkey] });
                this.setState({ sortdata: [numData] });
                console.log(numData)
                break;
            case 'str':
                const stringData = [...this.props.initialData].sort((a, b) => {
                    var x = a[objkey].toLowerCase();
                    var y = b[objkey].toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });
                this.setState({ sortdata: [stringData] })

                console.log(stringData)
                break;
            default:
                console.log("not working")
                break;
        }
    }
    render() {
        const filtered = this.props.initialData.filter(
            value => {
                return value.name.toLowerCase().indexOf(this.state.filterInput.toLowerCase()) !== -1
                    || value.email.toLowerCase().indexOf(this.state.filterInput.toLowerCase()) !== -1
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
                                <th key={index}>{title}</th>
                            )}
                        </tr>

                    </thead>
                    <tbody>
                        {filtered.map((data, index) =>
                            <React.Fragment key={index}>
                                <tr >
                                    <th scope="row">{index}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{new Date(data.rigester_date).toLocaleString()}</td>
                                    <td>{data.role}</td>
                                    <td>
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeletClick.bind(this, data._id)}
                                        >&times;</Button></td>
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

export default connect(mapStateToProps, { getUsers, deleteUser })(DataTable);