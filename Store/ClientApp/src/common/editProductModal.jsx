import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react'

class EditProductModal extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    componentWillReceiveProps(props) {
        this.setState({
            product: {
                id: props.id,
                name: props.name,
                price: props.price
            }
        })
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
            <Modal style={{ marginLeft: '250px', marginBottom: '150px', marginTop: '150px' }} open={this.props.editModalShouldOpen} centered={true}>
                <Modal.Header>Edit Product</Modal.Header>
                <Modal.Content>
                    <label htmlFor='name'> Name</label>
                    <br></br>
                    <input
                        className={'form-control'} id='name' type='text' name='name' defaultValue={this.props.name} onInput={this.handleInputChange}></input>
                    <br></br>
                    <label htmlFor='price'> Price</label>
                    <br></br>
                    <input
                        className={'form-control'} id='price' type='number' name='price' defaultValue={this.props.price} onInput={this.handleInputChange}></input>
                    <br />
                    <button style={{ margin: '5px' }} className={'btn btn-primary'} onClick={() => this.props.handleEditProduct(this.state.product)}> Edit Product </button>
                    <button style={{ margin: '5px' }} className={'btn btn-danger'} onClick={this.props.handleEditCancel}>Cancel</button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditProductModal;