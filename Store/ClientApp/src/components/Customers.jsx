import React, { Component } from 'react';
import { Table} from 'semantic-ui-react';
import * as customerService from '../services/customerService';
import EditCustomerModal from '../common/editCustomerModal';
import CustomerModal from '../common/customerModal';
import TableHeader from '../common/TableHeader';
import TableBody from '../common/tableBody'


export class Customers extends Component { 
    constructor(props) {
        super(props);
        this.state = {
        customers: [],
        shouldOpen: false,
        editModalShouldopen: false,
        existingCustomer: { id: '', name: '', address: '' }

    }
        this.handleAddCustomer = this.handleAddCustomer.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);  
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.configureEditCustomer = this.configureEditCustomer.bind(this)
    }
    handleEditCancel() {
        this.setState({ editModalShouldopen: !this.state.editModalShouldopen })
    }
    configureEditCustomer(customer) {
        this.handleEditCancel()
        this.setState({
            existingCustomer: customer,
        })
    }
    handleDelete(customer) {
        customerService.deleteCustomer(customer)
        window.location.reload()

    }
    handleAddCustomer(customer) {
        customerService.addCustomer(customer)
        this.handleCancel()
        window.location.reload()
        //this.setState({ state: this.state })
        //this.forceUpdate()
        //customerService.getCustomers()
        //    .then(Response => {
        //        this.setState({ customers: Response.data });
        //    });
    }
    handleEdit(customer) {
        customer.id = this.state.existingCustomer.id
        customerService.editCustomer(customer)
        window.location.reload()
    }
    handleCancel() {
        this.setState({shouldOpen: !this.state.shouldOpen});
    }
    componentDidMount() {
        customerService.getCustomers()
            .then(Response => {               
                this.setState({ customers: Response.data });
            });
        
    }
    render() {
        return (
            <React.Fragment>
                <button className={'btn btn-primary'} onClick={this.handleCancel}> Add Customer</button>
                <CustomerModal
                    name=''
                    address=''
                    shouldOpen={this.state.shouldOpen}
                    handleAddCustomer={this.handleAddCustomer}
                    handleCancel={this.handleCancel}                  
                >
                </CustomerModal>
                <EditCustomerModal
                    id={this.state.existingCustomer.id}
                    name={this.state.existingCustomer.name}
                    address={this.state.existingCustomer.address}
                    editModalShouldOpen={this.state.editModalShouldopen}
                    handleEditCustomer={this.handleEdit}
                    handleEditCancel={this.handleEditCancel}
                >
                </EditCustomerModal>
               
                <Table celled>
                    <TableHeader  headerNames={['Name', 'Address', 'Edit', 'Delete']} >
                    </TableHeader>
                    <TableBody
                        data={this.state.customers}
                        configureEditCustomer={this.configureEditCustomer}
                        handleDelete={this.handleDelete}
                    >
                    </TableBody> 
                </Table>
            </React.Fragment>
        );
    }
}
