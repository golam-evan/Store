import { Table } from 'semantic-ui-react';
import React, { Component} from 'react';


class TableHeader extends Component {

    render() {
        return (<Table.Header >
            <Table.Row  >
                {this.props.headerNames.map(item => {
                    return <Table.HeaderCell key={item} >{item}</Table.HeaderCell>
                    })
                }
            </Table.Row>
        </Table.Header >)
    }

}

export default TableHeader;