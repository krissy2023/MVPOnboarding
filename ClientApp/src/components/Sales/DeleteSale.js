import React, { Component } from "react";
import { Button, Header, Modal, Form, Icon} from 'semantic-ui-react'






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


        this.props.fetchData();
        this.closeModal();
    }



   

    render() {


        return (

            <Modal
                onClose={this.closeModal}
                onOpen={this.openModal}
                open={this.state.isModalOpen}
                size='tiny'
                trigger={< Button color="grey" > Delete </Button>}
                className='modal'
            >
               
                <h3>  Delete Sale </h3>

                

                <Form id="form-data" onSubmit={this.handleSubmit} >
                   <Form.Field>
                    <label>Customer</label>
                        <input type="text" value={this.state.customerName} readOnly />
                    </Form.Field>
                    <Form.Field>
                    <label>Store</label>
                        <input type="text" value={this.state.storeName} readOnly />
                    </Form.Field>
                    <Form.Field>
                    <label>Product</label>
                    <input type="text" value={this.state.productName} readOnly />
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



