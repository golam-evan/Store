import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import * as storeService from '../services/storeService';
import EditStoreModal from '../common/editStoreModal';
import StoreModal from '../common/storeModal';
import TableHeader from '../common/TableHeader';
import StoreTableBody from '../common/storeTableBody'


export class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            shouldOpen: false,
            editModalShouldopen: false,
            existingStore: { id: '', name: '', address: '' }

        }
        this.handleAddStore = this.handleAddStore.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.configureEditStore = this.configureEditStore.bind(this)
    }
    handleEditCancel() {
        this.setState({ editModalShouldopen: !this.state.editModalShouldopen })
    }
    configureEditStore(store) {
        this.handleEditCancel()
        this.setState({
            existingStore: store,
        })
    }
    handleDelete(store) {
        storeService.deleteStore(store)
        window.location.reload()

    }
    handleAddStore(store) {
        storeService.addStore(store)
        this.handleCancel()
        window.location.reload()
        //this.setState({ state: this.state })
        //this.forceUpdate()
        //customerService.getCustomers()
        //    .then(Response => {
        //        this.setState({ customers: Response.data });
        //    });
    }
    handleEdit(store) {
        store.id = this.state.existingStore.id
        storeService.editStore(store)
        window.location.reload()
    }
    handleCancel() {
        this.setState({ shouldOpen: !this.state.shouldOpen });
    }
    componentDidMount() {
        storeService.getStores()
            .then(Response => {
                console.log(Response)
                this.setState({ stores: Response.data });
            });

    }
    render() {
        return (
            <React.Fragment>
                <button className={'btn btn-primary'} onClick={this.handleCancel}> Add Store</button>
                <StoreModal
                    name=''
                    address=''
                    shouldOpen={this.state.shouldOpen}
                    handleAddStore={this.handleAddStore}
                    handleCancel={this.handleCancel}
                >
                </StoreModal>
                <EditStoreModal
                    id={this.state.existingStore.id}
                    name={this.state.existingStore.name}
                    address={this.state.existingStore.address}
                    editModalShouldOpen={this.state.editModalShouldopen}
                    handleEditStore={this.handleEdit}
                    handleEditCancel={this.handleEditCancel}
                >
                </EditStoreModal>

                <Table celled>
                    <TableHeader headerNames={['Name', 'Address', 'Edit', 'Delete']} >
                    </TableHeader>
                    <StoreTableBody
                        data={this.state.stores}
                        configureEditStore={this.configureEditStore}
                        handleDelete={this.handleDelete}
                    >
                    </StoreTableBody>
                </Table>
            </React.Fragment>
        );
    }
}
