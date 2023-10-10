import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'



export class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: "",
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
        const response = await fetch('/api/Products', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                price: this.state.price
            })
        })
        const { name, price } = await response.json();
        this.setState({ name: name, price: price });
        this.setState({ name: "", price: "" })
        this.closeModal();
    }



    render() {

        return (
            <Modal
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='small'
                trigger={< Button > New Product</Button>}
                className='modal'
            >
                <Header>
                    Create New Product

                </Header>
                <Form id="form-data" onSubmit={this.handleSubmit}>

                    <label>Name</label>
                    <input type='text' value={this.state.name} onChange={this.handleChangeName} />
                    <label>Price</label>
                    <input type='text' value={this.state.price} onChange={this.handleChangePrice} />

                    <Button basic color='red' onClick={this.closeModal}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <input type='submit' value='submit' />

                </Form>



            </Modal>

        );
    }

}




