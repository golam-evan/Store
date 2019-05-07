import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import * as productService from '../services/productService';
import EditProductModal from '../common/editProductModal';
import ProductModal from '../common/productModal';
import TableHeader from '../common/TableHeader';
import ProductTableBody from '../common/productTableBody'


export class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            shouldOpen: false,
            editModalShouldopen: false,
            existingProduct: { id: '', name: '', price: '' }

        }
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.configureEditProduct = this.configureEditProduct.bind(this)
    }
    handleEditCancel() {
        this.setState({ editModalShouldopen: !this.state.editModalShouldopen })
    }
    configureEditProduct(product) {
        this.handleEditCancel()
        this.setState({
            existingProduct: product,
        })
    }
    handleDelete(product) {
        productService.deleteProduct(product)
        window.location.reload()

    }
    handleAddProduct(product) {
        productService.addProduct(product)
        this.handleCancel()
        window.location.reload()
    }
    handleEdit(product) {
        product.id = this.state.existingProduct.id
        productService.editProduct(product)
        window.location.reload()
    }
    handleCancel() {
        this.setState({ shouldOpen: !this.state.shouldOpen });
    }
    componentDidMount() {
        productService.getProducts()
            .then(Response => {
                this.setState({ products: Response.data });
            });

    }
    render() {
        return (
            <React.Fragment>
                <button className={'btn btn-primary'} onClick={this.handleCancel}> Add Product</button>
                <ProductModal
                    name=''
                    price=''
                    shouldOpen={this.state.shouldOpen}
                    handleAddProduct={this.handleAddProduct}
                    handleCancel={this.handleCancel}
                >
                </ProductModal>
                <EditProductModal
                    id={this.state.existingProduct.id}
                    name={this.state.existingProduct.name}
                    price={this.state.existingProduct.price}
                    editModalShouldOpen={this.state.editModalShouldopen}
                    handleEditProduct={this.handleEdit}
                    handleEditCancel={this.handleEditCancel}
                >
                </EditProductModal>

                <Table celled>
                    <TableHeader headerNames={['Name', 'Price', 'Edit', 'Delete']} >
                    </TableHeader>
                    <ProductTableBody
                        data={this.state.products}
                        configureEditProduct={this.configureEditProduct}
                        handleDelete={this.handleDelete}
                    >
                    </ProductTableBody>
                </Table>
            </React.Fragment>
        );
    }
}
