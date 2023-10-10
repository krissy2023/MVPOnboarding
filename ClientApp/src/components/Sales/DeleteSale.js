import React, { Component } from "react";
import { Button, Header, Modal, Form} from 'semantic-ui-react'






export class DeleteSale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
            customerName: props.customerName,
            productName: props.productName,
            storeName: props.storeName,
            
            id: props.id,
            isModalOpen: false,



        }

       
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    openModal = () => {
        this.setState({ isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    

    async handleSubmit(event) {
        event.preventDefault();

         await fetch(`/api/Sales/ ${this.state.id}`, {
            method: 'DELETE'
           
        })



        this.closeModal();
    }



   

    render() {


        return (

            <Modal
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='small'
                trigger={< Button > Delete </Button>}
                className='modal'
            >
                <Header>
                    Delete Sale

                </Header>

                <Form id="form-data" onSubmit={this.handleSubmit} >


                    <input type="text" value={this.state.customerName} readOnly />
                    <input type="text" value={this.state.storeName} readOnly />
                    <input type="text" value={this.state.productName} readOnly />

                    <input type='submit' value='submit' />
                </Form>

            </Modal>

        );
    }

   



}



