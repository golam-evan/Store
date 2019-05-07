import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

class StoreModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            store: {
                name: this.props.name,
                address: this.props.address
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
                state.store.name = value
            });
        }
        else {
            this.setState(state => {
                state.store.address = value
            });
        }
    }
    render() {
        return (
            <Modal style={{ marginLeft: '250px', marginBottom: '150px', marginTop: '150px' }} open={this.props.shouldOpen}>
                <Modal.Header>Add Store</Modal.Header>
                <Modal.Content>
                    <label htmlFor='name'> Name</label>
                    <br></br>
                    <input
                        className={'form-control'} id='name' type='text' name='name' defaultValue={this.state.store.name} onInput={this.handleInputChange}></input>
                    <br></br>
                    <label htmlFor='address'> Address</label>
                    <br></br>
                    <input
                        className={'form-control'} id='address' type='text' name='address' defaultValue={this.state.store.address} onInput={this.handleInputChange}></input>
                    <br />
                    <button style={{ margin: '5px' }} className={'btn btn-primary'} onClick={() => this.props.handleAddStore(this.state.store)}> Add Store </button>
                    <button style={{ margin: '5px' }} className={'btn btn-danger'} onClick={this.props.handleCancel}>Cancel</button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default StoreModal;