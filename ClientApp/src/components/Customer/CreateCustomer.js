import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'



export class CreateCustomer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fullname: '',
            address: "",
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

  

  async  handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('/api/Customers', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.fullname,
                address: this.state.address
            })
        })
      const {name, address } = await response.json();
      this.setState({ fullname: name, address: address});
      this.setState({fullname:"", address:""})
      this.closeModal();
    }

 

    render() {
        
        return (
            <Modal
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='small'
                trigger={< Button > New Customer</Button>}
                className='modal'
            >
                <Header>
                    Create New Customer

                </Header>
                <Form id="form-data" onSubmit={this.handleSubmit}>

                    <label>Name</label>
                    <input type='text' value={this.state.fullname} onChange={this.handleChangeName} />
                    <label>Address</label>
                    <input type='text'  value={this.state.address} onChange={this.handleChangeAddress} />

                    <Button basic color='red' onClick={this.closeModal}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <input type='submit' value='submit' />

                </Form>



            </Modal>

        );
    }

}




