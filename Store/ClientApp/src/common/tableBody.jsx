import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class TableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data })
    }
    render() {
        return (
            <Table.Body>
                {this.state.data.length > 0 ? this.state.data.map(item => {
                    return <Table.Row key={item.id}>
                        <Table.Cell >{item.name}</Table.Cell>
                        <Table.Cell >{item.address}</Table.Cell>
                        <Table.Cell>
                            <button className={'btn btn-primary'} onClick={() => this.props.configureEditCustomer(item)}>
                                <i name='edit'></i>
                                Edit
                            </button>
                        </Table.Cell>
                        <Table.Cell>
                            <button className={'btn btn-danger'} onClick={() => this.props.handleDelete(item)}>
                                <i name='delete'></i>
                                Delete
                            </button>
                        </Table.Cell>
                    </Table.Row>
                }) : null}
            </Table.Body>)
    }
}

export default TableBody