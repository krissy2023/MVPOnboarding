import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'



export class DeleteCustomer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            fullname: props.fullname,
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
            fullname: event.target.value

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

       const response = await fetch('/api/Customers/' + `${this.state.id}`, {
            method: 'DELETE',
           body: JSON.stringify({
                 id:this.state.id,
                 name: this.state.fullname,
                 address: this.state.address
             })
            
        })
        
        this.closeModal();


    }

    render() {
        const fullname = this.props.fullname;
        const address = this.props.address;
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
                    Delete Customer

                </Header>
                <Form onSubmit={this.handleSubmit}>

                    <label>Name</label>
                    <input type='text' value={fullname} readOnly/>
                    <label>Address</label>
                    <input type='text' value={address}  readOnly/>

                    <Button basic color='red' onClick={this.closeModal}>
                        <Icon name='remove' /> Cancel
                    </Button>

                    <input type='submit' value='submit' />


                </Form>



            </Modal>

        );
    }

}