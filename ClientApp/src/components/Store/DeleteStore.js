import React, { Component } from 'react';
import { Button, Message, Modal, Form, Icon } from 'semantic-ui-react'



export class DeleteStore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            address: props.address,
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
        event.target.reset();
        try {
            const response = await fetch('/api/Stores/' + `${this.state.id}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    id: this.state.id,
                    name: this.state.name,
                    address: this.state.address
                })

            })
            if (response.status === 500) throw new Error("This customer has a sale record. Unable to delete.");
            this.props.fetchData();
            this.closeModal();
        } catch (error) {
            this.setState({ error: error.message, isError: true });
            setTimeout(() => this.setState({ isError: false }), 3000);
        }

    }

    render() {
        const name = this.props.name;
        const address = this.props.address;
        return (
            <Modal
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='tiny'
                trigger={< Button color="grey"> Delete</Button>}
                className='modal'
            >
               
                <h3> Delete Store </h3> 

               
                <Form error onSubmit={this.handleSubmit}>
                   <Form.Field>
                    <label>Name</label>
                        <input type='text' value={name} readOnly />
                    </Form.Field>
                    <Form.Field>
                    <label>Address</label>
                    <input type='text' value={address} readOnly />
                    </Form.Field>

                    {this.state.isError === true ? <Message error size="tiny"> {this.state.error}</Message> : null}

                    <Button floated="right" inverted color='green' type='submit' value='submit' >
                        <Icon name='checkmark' /> Delete </Button>
                    <Button floated="right" inverted color='red' onClick={this.closeModal}>
                        <Icon name='remove' /> Cancel
                    </Button>

                </Form>

            </Modal>

        );
    }

}