import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'



export class EditStore extends Component {

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
        const response = await fetch(`/api/Stores/ ${this.state.id}`, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
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
       
        return (
            <Modal
                onClose={(e) => this.setState({ isModalOpen: false, name: this.props.name, address: this.props.address })}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='tiny'
                trigger={< Button color="blue"> Edit</Button>}
                className='modal'
            >
               
                <h3> Update Store </h3>

                
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
                    <Button floated="right" inverted color='red' onClick={(e) => this.setState({ isModalOpen: false, name: this.props.name, address: this.props.address })}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    

                </Form>



            </Modal>

        );
    }

}