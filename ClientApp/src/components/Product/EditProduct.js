﻿import React, { Component } from 'react';
import { Button, Modal, Form, Icon } from 'semantic-ui-react'



export class EditProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            price: props.price,
            isModalOpen: false
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
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
    handleChangePrice(event) {

        this.setState({
            price: event.target.value

        });
    }



    async handleSubmit(event) {
        event.preventDefault();
        event.target.reset();
        const response = await fetch(`/api/Products/ ${this.state.id}`, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                price: this.state.price
            })
        })

        this.props.fetchData();
        this.closeModal();
    }



    render() {

        return (
            <Modal
                onClose={(e) => this.setState({ isModalOpen: false, name: this.props.name, address: this.props.price })}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='tiny'
                trigger={< Button color="blue"> Edit</Button>}
                className='modal'
            >
                
                <h3> Update Product </h3>

                
                <Form id="form-data" onSubmit={this.handleSubmit}>
                   <Form.Field>
                    <label>Name</label>
                        <input type='text' value={this.state.name} onChange={this.handleChangeName} />
                    </Form.Field>
                    <Form.Field>
                    <label>Price</label>
                    <input type='text' value={this.state.price} onChange={this.handleChangePrice} />
                    </Form.Field>
                    
                    <Button floated="right" inverted color='green' type='submit' value='submit' >
                        <Icon name='checkmark' /> Submit </Button>
                    <Button floated="right" inverted color='red' onClick={(e) => this.setState({ isModalOpen: false, name: this.props.name, address: this.props.address })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                </Form>



            </Modal>

        );
    }

}