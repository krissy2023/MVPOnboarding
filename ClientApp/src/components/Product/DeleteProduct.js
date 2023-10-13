﻿import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'



export class DeleteProduct extends Component {

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

        const response = await fetch('/api/Products/' + `${this.state.id}`, {
            method: 'DELETE',
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
        const name = this.props.name;
        const price = this.props.price;
        return (
            <Modal
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='small'
                trigger={< Button > Delete</Button>}
                className='modal'
            >
                <Header>
                    Delete Product

                </Header>
                <Form onSubmit={this.handleSubmit}>

                    <label>Name</label>
                    <input type='text' value={name} readOnly />
                    <label>Price</label>
                    <input type='text' value={price} readOnly />

                    <Button basic color='red' onClick={this.closeModal}>
                        <Icon name='remove' /> Cancel
                    </Button>

                    <input type='submit' value='submit' />


                </Form>



            </Modal>

        );
    }

}