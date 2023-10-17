import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'



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

        const response = await fetch('/api/Stores/' + `${this.state.id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                address: this.state.address
            })

        })
        this.props.fetchData();
        this.closeModal();


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

               
                <Form onSubmit={this.handleSubmit}>
                   <Form.Field>
                    <label>Name</label>
                        <input type='text' value={name} readOnly />
                    </Form.Field>
                    <Form.Field>
                    <label>Address</label>
                    <input type='text' value={address} readOnly />
                    </Form.Field>

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