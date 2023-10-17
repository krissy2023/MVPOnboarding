﻿import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'



export class CreateStore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name:"",
            address:"",
            isModalOpen: false
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    openModal = () => {
        this.setState({ isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    handleChangeName(event) {

        this.setState({
            name: event.target.value

        });
    }
    handleChangeAddress(event) {

        this.setState({
            address: event.target.value

        });
    }



    async handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('/api/Stores', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                address: this.state.address
            })
        })
        const { name, address } = await response.json();
        this.setState({ name: name, address: address });
        this.props.fetchData();
        this.setState({ name: "", address: "" })
        this.closeModal();
    }



    render() {



        return (
            <Modal
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='tiny'
                trigger={< Button color="olive"> New Store</Button>}
                className='modal'
            >
                
                <h3> Create New Store </h3>

                
                <Form id="form-data" onSubmit={this.handleSubmit}>
                   <Form.Field>
                    <label>Name</label>
                        <input type='text' value={this.state.name} onChange={this.handleChangeName} />
                    </Form.Field>
                    <Form.Field>
                    <label>Address</label>
                    <input type='text' value={this.state.address} onChange={this.handleChangeAddress} />
                    </Form.Field>

                    <Button floated="right" inverted color='green' type='submit' value='submit' >
                        <Icon name='checkmark' /> Submit </Button>
                    <Button floated="right" inverted color='red' onClick={this.closeModal}>
                        <Icon name='remove' /> Cancel
                    </Button>
                   


                </Form>



            </Modal>

        );
    }

}




