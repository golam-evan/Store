import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

class ProductModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: this.props.name,
                address: this.props.price
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === 'name') {
            this.setState(state => {
                state.product.name = value
            });
        }
        else {
            this.setState(state => {
                state.product.price = value
            });
        }
    }
    render() {
        return (
            <Modal style={{ marginLeft: '250px', marginBottom: '150px', marginTop: '150px' }} open={this.props.shouldOpen}>
                <Modal.Header>Add Product</Modal.Header>
                <Modal.Content>
                    <label htmlFor='name'> Name</label>
                    <br></br>
                    <input
                        className={'form-control'} id='name' type='text' name='name' defaultValue={this.state.product.name} onInput={this.handleInputChange}></input>
                    <br></br>
                    <label htmlFor='price'> Price</label>
                    <br></br>
                    <input
                        className={'form-control'} id='price' type='number' name='price' defaultValue={this.state.product.price} onInput={this.handleInputChange}></input>
                    <br />
                    <button style={{ margin: '5px' }} className={'btn btn-primary'} onClick={() => this.props.handleAddProduct(this.state.product)}> Add Product </button>
                    <button style={{ margin: '5px' }} className={'btn btn-danger'} onClick={this.props.handleCancel}>Cancel</button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default ProductModal;