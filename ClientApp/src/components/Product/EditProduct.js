import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'



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
                size='small'
                trigger={< Button > Edit</Button>}
                className='modal'
            >
                <Header>
                    Update Product

                </Header>
                <Form id="form-data" onSubmit={this.handleSubmit}>

                    <label>Name</label>
                    <input type='text' value={this.state.name} onChange={this.handleChangeName} />
                    <label>Price</label>
                    <input type='text' value={this.state.price} onChange={this.handleChangePrice} />

                    <Button basic color='red' onClick={(e) => this.setState({ isModalOpen: false, name: this.props.name, address: this.props.address })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <input type='submit' value='submit' />

                </Form>



            </Modal>

        );
    }

}