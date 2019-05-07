import React, { Component } from 'react';
import * as customerService from '../services/customerService';
import * as productService from '../services/productService';
import * as storeService from '../services/storeService';
import * as saleService from '../services/salesService';
import TableHeader from '../common/TableHeader';
import { Modal, Form, Table } from 'semantic-ui-react';
import axios from 'axios'


export class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createShouldOpen: false,
            editShouldOpen: false,
            id: '',
            editProductId: '',
            editCustomerId: '',
            editStoreId:'',
            productId: '',
            storeId: '',
            customerId: '',
            defaultDate:'',
            editDateSold: Date,
            dateSold: Date,
            sales: [],
            customerDropdownList: [],
            productDropdownList: [],
            storesDropdownList: []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditSale = this.handleEditSale.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.configureEditSale = this.configureEditSale.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
        this.handleAddSale = this.handleAddSale.bind(this);
        this.handleAddCancel = this.handleAddCancel.bind(this);
        this.onAddChange = this.onAddChange.bind(this);
    }
    componentDidMount() {
        customerService.getCustomers()
            .then(Response => {
                this.setState({ customerDropdownList: Response.data });
            });
        productService.getProducts()
            .then(Response => {
                this.setState({ productDropdownList: Response.data });
            });
        storeService.getStores()
            .then(Response => {
                this.setState({ storesDropdownList: Response.data });
            });
        axios.all([customerService.getCustomers(), productService.getProducts(), storeService.getStores(), saleService.getSales()])
            .then(axios.spread( (customerResponse, productResponse, storeResponse, saleResponse) => {
                let sales = saleResponse.data;
                let customers = customerResponse.data;
                let products = productResponse.data;
                let stores = storeResponse.data;
                let salesList = [];
                sales.map(sale => {
                    customers.map(customer => {
                        if (sale.customerId == customer.id) {
                            sale.customer = customer.name
                        }
                    })
                    products.map(product => {
                        if (sale.productId == product.id) {
                            sale.product = product.name
                        }
                    })
                    stores.map(store => {
                        if (sale.storeId == store.id) {
                            sale.store = store.name
                        }
                    })
                    salesList.push(sale)
                })
                this.setState({ sales: salesList })
                console.log(this.state.sales)
            }));
    }
    onEditChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onAddChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleDelete(item) {
        saleService.deleteSale(item)
        window.location.reload()
    }
    configureEditSale(item) {
        let date = new Date(item.dateSold)
        let y = date.getFullYear().toString();
        let m = (date.getMonth() + 1).toString();
        let d = date.getDate().toString();
        (d.length == 1) && (d = '0' + d);
        (m.length == 1) && (m = '0' + m);
        let yyyymmdd = y + '-' + m + '-' + d;
        this.setState({
            id: item.id,
            editCustomerId: item.customerId,
            editProductId: item.productId,
            editStoreId: item.storeId,
            editDateSold: item.dateSold,
            defaultDate: yyyymmdd
        })
        this.handleEditCancel()
    }
    handleAddSale() {
        let sale = {
            productId:this.state.productId,
            customerId:this.state.customerId,
            storeId:this.state.storeId,
            dateSold:this.state.dateSold
        }
        saleService.addSale(sale)
        this.handleAddCancel()
        window.location.reload()
    }
    handleEditSale() {
        let sale = {
            id: this.state.id,
            productId: this.state.editProductId,
            customerId: this.state.editCustomerId,
            storeId: this.state.editStoreId,
            dateSold: this.state.editDateSold
        }
        saleService.editSale(sale)
        this.handleEditCancel()
        window.location.reload()
    }
    handleEditCancel() {
        this.setState({ editShouldOpen: !this.state.editShouldOpen });
    }
    handleAddCancel() {
        this.setState({ createShouldOpen: !this.state.createShouldOpen });
    }
    render() {
        let CustomerDataList = [{ id: '', name: 'Select Customer' }].concat(this.state.customerDropdownList)
        let ProductDataList = [{ id: '', name: 'Select Product' }].concat(this.state.productDropdownList)
        let StoreDataList = [{ id: '', name: 'Select Store' }].concat(this.state.storesDropdownList)
        return (           
            <React.Fragment>
                <button className={'btn btn-primary'} onClick={this.handleAddCancel}>Add Sales</button>
                <Table celled>
                    <TableHeader headerNames={['Product Name', 'Customer Name', 'Store Name', 'Date Sold', 'Edit', 'Delete']} >
                    </TableHeader>
                    <Table.Body>
                        {this.state.sales.length > 0 ? this.state.sales.map(item => {
                            return <Table.Row key={item.id}>
                                <Table.Cell >{item.product}</Table.Cell>
                                <Table.Cell >{item.customer}</Table.Cell>
                                <Table.Cell >{item.store}</Table.Cell>
                                <Table.Cell >{new Date(item.dateSold).toDateString()}</Table.Cell>
                                <Table.Cell>
                                    <button className={'btn btn-primary'} onClick={() => this.configureEditSale(item)}>
                                        Edit
                                    </button>
                                </Table.Cell>
                                <Table.Cell>
                                    <button className={'btn btn-danger'} onClick={()=>this.handleDelete(item)} >
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        }) : null}
                    </Table.Body>
                </Table>
                <Modal style={{ marginLeft: '250px', marginBottom: '100px', marginTop:'50px'}} open={this.state.createShouldOpen}>
                    <Modal.Header> Create Sales </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Customer Name</label>
                                <select name="customerId" onChange={this.onAddChange} >
                                    {CustomerDataList.map((Cust) => <option key={Cust.id} value={Cust.id}>{Cust.name}</option>)}
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label>Product Name</label>
                                <select name="productId" onChange={this.onAddChange} >
                                    {ProductDataList.map((Prod) => <option key={Prod.id} value={Prod.id}>{Prod.name}</option>)}
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label>Store Name</label>
                                <select name="storeId" onChange={this.onAddChange} >
                                    {StoreDataList.map((Str) => <option key={Str.id} value={Str.id}>{Str.name}</option>)}
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input type="date" name="dateSold" placeholder='Select Date' onChange={this.onAddChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <button className={'btn btn-primary'} style={{ margin: '5px' }} onClick={this.handleAddSale}>Create
                        </button>
                        <button className={'btn btn-danger'} style={{ margin: '5px' }} onClick={this.handleAddCancel} >Cancel
                        </button>
                    </Modal.Actions>
                </Modal>
                <Modal style={{ marginLeft: '250px', marginBottom: '100px', marginTop: '50px' }} open={this.state.editShouldOpen}>
                    <Modal.Header> Edit Sales </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Customer Name</label>
                                <select name="editCustomerId" onChange={this.onEditChange} defaultValue={this.state.editCustomerId}>
                                    {CustomerDataList.map((Cust) => <option key={Cust.id} value={Cust.id}>{Cust.name}</option>)}
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label>Product Name</label>
                                <select name="editProductId" onChange={this.onEditChange} defaultValue={this.state.editProductId}>
                                    {ProductDataList.map((Prod) => <option key={Prod.id} value={Prod.id}>{Prod.name}</option>)}
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label>Store Name</label>
                                <select name="editStoreId" onChange={this.onEditChange} defaultValue={this.state.editStoreId} >
                                    {StoreDataList.map((Str) => <option key={Str.id} value={Str.id}>{Str.name}</option>)}
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <label>Date Sold</label>
                                <input type="date" name="editDateSold" defaultValue={this.state.defaultDate} onChange={this.onEditChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <button className={'btn btn-primary'} style={{ margin: '5px' }} onClick={this.handleEditSale}>Edit
                        </button>
                        <button className={'btn btn-danger'} style={{ margin: '5px' }} onClick={this.handleEditCancel} >Cancel
                        </button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
            )
    }
}