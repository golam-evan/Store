import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react'

class EditStoreModal extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    componentWillReceiveProps(props) {
        this.setState({
            store: {
                id: props.id,
                name: props.name,
                address: props.address
            }
        })
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
            <Modal style={{ marginLeft: '250px', marginBottom: '150px', marginTop: '150px' }} open={this.props.editModalShouldOpen} centered={true}>
                <Modal.Header>Edit Store</Modal.Header>
                <Modal.Content>
                    <label htmlFor='name'> Name</label>
                    <br></br>
                    <input
                        className={'form-control'} id='name' type='text' name='name' defaultValue={this.props.name} onInput={this.handleInputChange}></input>
                    <br></br>
                    <label htmlFor='address'> Address</label>
                    <br></br>
                    <input
                        className={'form-control'} id='address' type='text' name='address' defaultValue={this.props.address} onInput={this.handleInputChange}></input>
                    <br />
                    <button style={{ margin: '5px' }} className={'btn btn-primary'} onClick={() => this.props.handleEditStore(this.state.store)}> Edit Store </button>
                    <button style={{ margin: '5px' }} className={'btn btn-danger'} onClick={this.props.handleEditCancel}>Cancel</button>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditStoreModal;